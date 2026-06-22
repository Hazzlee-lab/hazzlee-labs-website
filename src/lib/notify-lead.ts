import { Resend } from "resend";
import type { LeadType } from "@/lib/leads";
import { CONTACT_EMAIL, SITE_NAME } from "@/lib/site";

export type LeadNotification = {
  name: string;
  email: string;
  businessName: string;
  websiteUrl: string;
  leadType: LeadType;
  message: string;
};

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function formatLeadEmail(lead: LeadNotification) {
  const business = lead.businessName || lead.name;
  const subject = `New ${lead.leadType} request from ${lead.name}`;
  const rows: Array<[string, string]> = [
    ["Name", lead.name],
    ["Email", lead.email],
    ["Business", business],
    ["Request type", lead.leadType],
    ["Message", lead.message],
  ];

  if (lead.websiteUrl) {
    rows.splice(3, 0, ["Website", lead.websiteUrl]);
  }

  const text = rows.map(([label, value]) => `${label}: ${value}`).join("\n");
  const htmlRows = rows
    .map(
      ([label, value]) =>
        `<tr><th align="left" style="padding:8px 12px 8px 0;vertical-align:top;">${escapeHtml(label)}</th><td style="padding:8px 0;white-space:pre-wrap;">${escapeHtml(value)}</td></tr>`,
    )
    .join("");

  const html = `
    <p>A new request arrived from the ${escapeHtml(SITE_NAME)} website.</p>
    <table role="presentation" cellpadding="0" cellspacing="0">${htmlRows}</table>
  `.trim();

  return { subject, html, text };
}

export async function sendLeadNotification(
  lead: LeadNotification,
): Promise<{ ok: true } | { ok: false; error: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return { ok: false, error: "RESEND_API_KEY is not configured" };
  }

  const from = process.env.RESEND_FROM ?? `${SITE_NAME} <notifications@hazzleelabs.com>`;
  const { subject, html, text } = formatLeadEmail(lead);
  const resend = new Resend(apiKey);

  const { error } = await resend.emails.send({
    from,
    to: [CONTACT_EMAIL],
    replyTo: lead.email,
    subject,
    html,
    text,
  });

  if (error) {
    return { ok: false, error: error.message };
  }

  return { ok: true };
}
