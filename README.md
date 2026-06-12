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
3. Technical Audit
4. Automation & Custom Software

## Local setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

The form posts to `/api/website-checkup` and creates a new record in the Airtable `Leads` table.

Required environment variable:

```bash
AIRTABLE_API_KEY=pat_...
```

Optional variables:

```bash
AIRTABLE_BASE_ID=appdN76UEgwvhMptL
AIRTABLE_LEADS_TABLE=Leads
```

## Launch path

1. Push this repo to GitHub.
2. Import the repo into Vercel.
3. Add `AIRTABLE_API_KEY` as a Vercel environment variable.
4. Deploy.
5. Submit a test form.
6. Confirm the test lead appears in Airtable.
7. Point the Hazzlee Labs domain at Vercel.

## Improvement loop

Use real conversations to update:

- Hero headline
- Primary CTA wording
- Offer order
- Contact form fields
- Proof and case studies
- Maintenance plan positioning
