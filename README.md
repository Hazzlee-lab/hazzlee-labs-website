# Hazzlee Labs Website

Fast-launch website for Hazzlee Labs.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Resend email delivery for new leads (system of record is the inbox)
- Vercel Web Analytics for conversion events, Cloudflare Web Analytics for pageviews
- Recommended deployment: Vercel

## Primary CTA

Request a Website Checkup

## Front-door offers

Each offer has a dedicated landing page under `/services/`:

1. Website Rescue & Security Cleanup — `/services/website-rescue`
2. Website Speed & Performance Cleanup — `/services/speed-cleanup`
3. Website Design & Development — `/services/website-design-development`
4. Technical Website Audit — `/services/technical-audit`

## Local setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

The form posts to `/api/website-checkup` and sends a notification email to `andrew@hazzleelabs.com` via Resend. If delivery fails, the visitor is told to retry or email directly, so no lead is silently dropped.

Required environment variables:

```bash
RESEND_API_KEY=re_...
RESEND_FROM=Hazzlee Labs <notifications@hazzleelabs.com>
SITE_URL=https://hazzleelabs.com
CLOUDFLARE_WEB_ANALYTICS_TOKEN=... # optional, pageview analytics
```

For Resend, verify the `hazzleelabs.com` domain and use a sender address on that domain for `RESEND_FROM`. The lead's email is set as `replyTo` so you can reply directly from your inbox.

## Analytics

Custom events (CTA clicks, offer selection, form start/submit/fail) are sent through `src/lib/analytics.ts` to Vercel Web Analytics. Enable **Web Analytics** for the project in the Vercel dashboard, otherwise events are dropped. Events are visible under the project's Analytics tab.

## Launch path

1. Push this repo to GitHub.
2. Import the repo into Vercel.
3. Add `RESEND_API_KEY`, `RESEND_FROM`, and `SITE_URL` as Vercel environment variables.
4. Enable Web Analytics in the Vercel project settings.
5. Deploy.
6. Submit a test form and confirm the notification email arrives at `andrew@hazzleelabs.com`.
7. Verify `/robots.txt`, `/sitemap.xml`, `/privacy`, `/opengraph-image`, `/thanks`, and the `/services/*` pages.
8. Point the Hazzlee Labs domain at Vercel.

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
