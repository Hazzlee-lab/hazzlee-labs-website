import { NextResponse } from "next/server";
import { isLeadType, type LeadType } from "@/lib/leads";
import { CONTACT_EMAIL, SITE_URL } from "@/lib/site";

const MAX_CONTENT_LENGTH = 12_000;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const DEFAULT_LEAD_TYPE: LeadType = "Health Check";

const FIELD_LIMITS = {
  name: 100,
  email: 254,
  businessName: 120,
  websiteUrl: 2048,
  leadType: 80,
  message: 2_000,
  company: 120,
};

type RateLimitBucket = {
  count: number;
  resetAt: number;
};

const rateLimitBuckets = new Map<string, RateLimitBucket>();

type CheckupPayload = {
  name: string;
  email: string;
  businessName: string;
  websiteUrl: string;
  leadType: LeadType;
  message: string;
  company?: string;
};

type ParseResult =
  | { ok: true; payload: CheckupPayload }
  | { ok: false; error: string; status: number };

function clean(value: FormDataEntryValue | null): string {
  return typeof value === "string" ? value.trim() : "";
}

function trimToLimit(value: string, limit: number): string {
  return value.trim().slice(0, limit);
}

function cleanString(value: unknown, limit: number): string {
  return trimToLimit(typeof value === "string" ? value : "", limit);
}

function normalizeUrl(rawUrl: string): string {
  const trimmed = trimToLimit(rawUrl, FIELD_LIMITS.websiteUrl);
  if (!trimmed) return "";

  const withProtocol = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  const parsed = new URL(withProtocol);

  if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
    throw new Error("Unsupported URL scheme");
  }

  if (!parsed.hostname || !parsed.hostname.includes(".")) {
    throw new Error("Invalid URL host");
  }

  parsed.hash = "";
  return parsed.toString();
}

function isValidEmail(email: string): boolean {
  return email.length <= FIELD_LIMITS.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function normalizeLeadType(value: string): LeadType | null {
  if (!value) return DEFAULT_LEAD_TYPE;
  return isLeadType(value) ? value : null;
}

function validatePayload(payload: CheckupPayload): ParseResult {
  if (payload.company) {
    return { ok: true, payload };
  }

  if (payload.name.length < 2) {
    return { ok: false, error: "Please enter your name.", status: 400 };
  }

  if (!isValidEmail(payload.email)) {
    return { ok: false, error: "Please enter a valid email address.", status: 400 };
  }

  if (payload.message.length < 10) {
    return { ok: false, error: "Please share a little more detail about the request.", status: 400 };
  }

  return { ok: true, payload };
}

async function parsePayload(request: Request): Promise<ParseResult> {
  const contentLength = Number(request.headers.get("content-length") ?? "0");
  if (contentLength > MAX_CONTENT_LENGTH) {
    return { ok: false, error: "The request is too large. Please shorten the message.", status: 413 };
  }

  const contentType = request.headers.get("content-type") ?? "";
  let payload: CheckupPayload;

  if (contentType.includes("application/json")) {
    let body: Partial<Record<keyof CheckupPayload, unknown>>;
    try {
      body = (await request.json()) as Partial<Record<keyof CheckupPayload, unknown>>;
    } catch {
      return { ok: false, error: "The request body is not valid JSON.", status: 400 };
    }

    const leadType = normalizeLeadType(cleanString(body.leadType, FIELD_LIMITS.leadType));
    if (!leadType) {
      return { ok: false, error: "Please choose a valid request type.", status: 400 };
    }

    try {
      payload = {
        name: cleanString(body.name, FIELD_LIMITS.name),
        email: cleanString(body.email, FIELD_LIMITS.email).toLowerCase(),
        businessName: cleanString(body.businessName, FIELD_LIMITS.businessName),
        websiteUrl: normalizeUrl(cleanString(body.websiteUrl, FIELD_LIMITS.websiteUrl)),
        leadType,
        message: cleanString(body.message, FIELD_LIMITS.message),
        company: cleanString(body.company, FIELD_LIMITS.company),
      };
    } catch {
      return { ok: false, error: "Please enter a valid website URL.", status: 400 };
    }

    return validatePayload(payload);
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return { ok: false, error: "The form submission could not be read.", status: 400 };
  }

  const leadType = normalizeLeadType(trimToLimit(clean(form.get("leadType")), FIELD_LIMITS.leadType));
  if (!leadType) {
    return { ok: false, error: "Please choose a valid request type.", status: 400 };
  }

  try {
    payload = {
      name: trimToLimit(clean(form.get("name")), FIELD_LIMITS.name),
      email: trimToLimit(clean(form.get("email")), FIELD_LIMITS.email).toLowerCase(),
      businessName: trimToLimit(clean(form.get("businessName")), FIELD_LIMITS.businessName),
      websiteUrl: normalizeUrl(clean(form.get("websiteUrl"))),
      leadType,
      message: trimToLimit(clean(form.get("message")), FIELD_LIMITS.message),
      company: trimToLimit(clean(form.get("company")), FIELD_LIMITS.company),
    };
  } catch {
    return { ok: false, error: "Please enter a valid website URL.", status: 400 };
  }

  return validatePayload(payload);
}

function wantsJson(request: Request): boolean {
  const contentType = request.headers.get("content-type") ?? "";
  const accept = request.headers.get("accept") ?? "";
  return contentType.includes("application/json") || accept.includes("application/json");
}

function redirectTo(pathname: string): NextResponse {
  const origin = process.env.SITE_URL ?? SITE_URL;
  const url = new URL(pathname, origin);
  if (pathname === "/") {
    url.searchParams.set("form", "error");
    url.hash = "contact";
  }

  return NextResponse.redirect(url, 303);
}

function errorResponse(request: Request, error: string, status = 400) {
  if (wantsJson(request)) {
    return NextResponse.json({ ok: false, error }, { status });
  }

  return redirectTo("/");
}

function successResponse(request: Request) {
  if (wantsJson(request)) {
    return NextResponse.json({ ok: true, redirectTo: "/thanks" });
  }

  return redirectTo("/thanks");
}

function getClientKey(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || request.headers.get("x-real-ip") || "unknown";
}

function checkRateLimit(request: Request): boolean {
  const key = getClientKey(request);
  const now = Date.now();
  const bucket = rateLimitBuckets.get(key);

  if (!bucket || bucket.resetAt <= now) {
    rateLimitBuckets.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }

  if (bucket.count >= RATE_LIMIT_MAX) {
    return false;
  }

  bucket.count += 1;
  return true;
}

export async function POST(request: Request) {
  if (!checkRateLimit(request)) {
    return errorResponse(
      request,
      "Too many requests from this connection. Please wait a few minutes and try again.",
      429,
    );
  }

  const parsed = await parsePayload(request);
  if (!parsed.ok) {
    return errorResponse(request, parsed.error, parsed.status);
  }

  const payload = parsed.payload;

  if (payload.company) {
    return successResponse(request);
  }

  const airtableApiKey = process.env.AIRTABLE_API_KEY;
  const airtableBaseId = process.env.AIRTABLE_BASE_ID;
  const airtableTableName = process.env.AIRTABLE_LEADS_TABLE;

  if (!airtableApiKey || !airtableBaseId || !airtableTableName) {
    return errorResponse(
      request,
      `The request form is not configured yet. Please email ${CONTACT_EMAIL} instead.`,
      503,
    );
  }

  const fields: Record<string, string> = {
    "Business Name": payload.businessName || payload.name,
    "Contact Name": payload.name,
    Email: payload.email,
    Source: "Hazzlee Labs website",
    "Lead Type": payload.leadType,
    Status: "New",
    "Next Action": "Review website checkup request and reply",
    Notes: payload.message,
  };

  if (payload.websiteUrl) fields["Website URL"] = payload.websiteUrl;

  let airtableResponse: Response;
  try {
    airtableResponse = await fetch(
      `https://api.airtable.com/v0/${airtableBaseId}/${encodeURIComponent(airtableTableName)}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${airtableApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fields, typecast: true }),
      },
    );
  } catch {
    return errorResponse(
      request,
      `The request could not be sent right now. Please try again or email ${CONTACT_EMAIL}.`,
      502,
    );
  }

  if (!airtableResponse.ok) {
    return errorResponse(
      request,
      `The request could not be sent right now. Please try again or email ${CONTACT_EMAIL}.`,
      502,
    );
  }

  return successResponse(request);
}
