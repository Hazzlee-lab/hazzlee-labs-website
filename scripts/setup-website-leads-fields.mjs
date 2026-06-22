/**
 * Ensures the Website Leads Airtable table has the fields the website form writes.
 * Requires AIRTABLE_API_KEY with schema.bases:write scope.
 */

const apiKey = process.env.AIRTABLE_API_KEY;
const baseId = process.env.AIRTABLE_BASE_ID ?? "appdN76UEgwvhMptL";
const tableName = process.env.AIRTABLE_WEBSITE_LEADS_TABLE ?? "Website Leads";

const LEAD_TYPES = [
  "Workflow Blueprint Interview (Complimentary; $499 Value)",
  "Performance & Conversion Audit ($299)",
  "Storyboard & Brand Script Pack ($350)",
  "Custom Software Build / System Architecture",
];

const REQUIRED_FIELDS = [
  { name: "Business Name", type: "singleLineText" },
  { name: "Contact Name", type: "singleLineText" },
  { name: "Email", type: "email" },
  { name: "Source", type: "singleLineText" },
  {
    name: "Lead Type",
    type: "singleSelect",
    options: {
      choices: LEAD_TYPES.map((name) => ({ name })),
    },
  },
  {
    name: "Status",
    type: "singleSelect",
    options: {
      choices: [{ name: "New", color: "greenBright" }],
    },
  },
  { name: "Next Action", type: "singleLineText" },
  { name: "Notes", type: "multilineText" },
  { name: "Website URL", type: "url" },
];

if (!apiKey) {
  console.error("Missing AIRTABLE_API_KEY.");
  process.exit(1);
}

const headers = {
  Authorization: `Bearer ${apiKey}`,
  "Content-Type": "application/json",
};

async function airtable(path, init = {}) {
  const response = await fetch(`https://api.airtable.com/v0/meta/bases/${baseId}${path}`, {
    ...init,
    headers: { ...headers, ...(init.headers ?? {}) },
  });

  const body = await response.json().catch(() => null);
  if (!response.ok) {
    throw new Error(body?.error?.message ?? body?.error?.type ?? response.statusText);
  }

  return body;
}

async function main() {
  const schema = await airtable("/tables");
  const table = schema.tables.find((entry) => entry.name === tableName);

  if (!table) {
    const names = schema.tables.map((entry) => entry.name).join(", ");
    throw new Error(`Table "${tableName}" not found. Available tables: ${names}`);
  }

  const existing = new Set(table.fields.map((field) => field.name));
  const missing = REQUIRED_FIELDS.filter((field) => !existing.has(field.name));

  if (missing.length === 0) {
    console.log(`All required fields already exist on "${tableName}".`);
    return;
  }

  console.log(`Adding ${missing.length} field(s) to "${tableName}"...`);

  for (const field of missing) {
    const created = await airtable(`/tables/${table.id}/fields`, {
      method: "POST",
      body: JSON.stringify(field),
    });
    console.log(`Created: ${created.name} (${created.type})`);
  }

  console.log("Done.");
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
