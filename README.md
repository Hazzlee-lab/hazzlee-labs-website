# Hazzlee Labs Website

Fast-launch website for Hazzlee Labs.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Airtable CRM form endpoint
- Recommended deployment: Vercel

## Primary CTA

Request a Website Checkup

## Front-door offers

1. Website Rescue & Security Cleanup
2. Website Speed & Performance Cleanup
3. Website Design & Development
4. Technical Website Audit

## Local setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

The form posts to `/api/website-checkup` and creates a new record in the Airtable `Leads` table.

Required environment variables:

```bash
AIRTABLE_API_KEY=pat_...
AIRTABLE_BASE_ID=appdN76UEgwvhMptL
AIRTABLE_LEADS_TABLE=Leads
SITE_URL=https://hazzleelabs.com
```

The API requires the Airtable base and table values in production so the CRM target is explicit.

## Launch path

1. Push this repo to GitHub.
2. Import the repo into Vercel.
3. Add `AIRTABLE_API_KEY` as a Vercel environment variable.
4. Add `AIRTABLE_BASE_ID`, `AIRTABLE_LEADS_TABLE`, and `SITE_URL`.
5. Deploy.
6. Submit a test form.
7. Confirm the test lead appears in Airtable.
8. Verify `/robots.txt`, `/sitemap.xml`, `/privacy`, `/opengraph-image`, and `/thanks`.
9. Point the Hazzlee Labs domain at Vercel.

## Improvement loop

Use real conversations to update:

- Hero headline
- Primary CTA wording
- Offer order
- Contact form fields
- Proof and case studies
- Maintenance plan positioning
- FAQ and offer detail sections
- CTA, form-start, form-success, and form-error analytics events
