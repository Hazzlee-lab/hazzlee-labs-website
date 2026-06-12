import { NextResponse } from "next/server";

const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID ?? "appdN76UEgwvhMptL";
const AIRTABLE_TABLE_NAME = process.env.AIRTABLE_LEADS_TABLE ?? "Leads";

type CheckupPayload = {
  name: string;
  email: string;
  businessName: string;
  websiteUrl: string;
  leadType: string;
  message: string;
  company?: string;
};

function clean(value: FormDataEntryValue | null): string {
  return typeof value === "string" ? value.trim() : "";
}

function normalizeUrl(url: string): string {
  if (!url) return "";
  if (/^https?:\/\//i.test(url)) return url;
  return `https://${url}`;
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

async function parsePayload(request: Request): Promise<CheckupPayload> {
  const contentType = request.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    const body = (await request.json()) as Partial<CheckupPayload>;
    return {
      name: String(body.name ?? "").trim(),
      email: String(body.email ?? "").trim(),
      businessName: String(body.businessName ?? "").trim(),
      websiteUrl: normalizeUrl(String(body.websiteUrl ?? "").trim()),
      leadType: String(body.leadType ?? "Health Check").trim(),
      message: String(body.message ?? "").trim(),
      company: String(body.company ?? "").trim(),
    };
  }

  const form = await request.formData();
  return {
    name: clean(form.get("name")),
    email: clean(form.get("email")),
    businessName: clean(form.get("businessName")),
    websiteUrl: normalizeUrl(clean(form.get("websiteUrl"))),
    leadType: clean(form.get("leadType")) || "Health Check",
    message: clean(form.get("message")),
    company: clean(form.get("company")),
  };
}

export async function POST(request: Request) {
  const payload = await parsePayload(request);

  if (payload.company) {
    return NextResponse.redirect(new URL("/thanks", request.url), 303);
  }

  if (!payload.name || !payload.email || !payload.message || !isValidEmail(payload.email)) {
    return NextResponse.json(
      { ok: false, error: "Name, valid email, and message are required." },
      { status: 400 },
    );
  }

  if (!process.env.AIRTABLE_API_KEY) {
    return NextResponse.json(
      { ok: false, error: "AIRTABLE_API_KEY is not configured." },
      { status: 500 },
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

  const airtableResponse = await fetch(
    `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(AIRTABLE_TABLE_NAME)}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fields, typecast: true }),
    },
  );

  if (!airtableResponse.ok) {
    const details = await airtableResponse.text();
    return NextResponse.json(
      { ok: false, error: "Airtable submission failed.", details },
      { status: 502 },
    );
  }

  return NextResponse.redirect(new URL("/thanks", request.url), 303);
}
