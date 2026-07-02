import type { LeadType } from "@/lib/leads";

export type ServicePage = {
  slug: string;
  name: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  headline: string;
  intro: string;
  leadType: LeadType;
  cta: string;
  symptoms: { title: string; items: string[] };
  included: Array<{ title: string; body: string }>;
  firstStep: string;
  faqs: Array<{ question: string; answer: string }>;
};

export const SERVICE_PAGES: ServicePage[] = [
  {
    slug: "website-rescue",
    name: "Website Rescue & Security Cleanup",
    metaTitle: "Website Rescue & Security Cleanup",
    metaDescription:
      "Hands-on rescue for broken, hacked, redirected, or unstable websites. Stabilize the site, clean up the obvious issues, and get a practical hardening plan.",
    eyebrow: "Entry offer / rescue",
    headline: "Rescue for broken, suspicious, or unstable websites.",
    intro:
      "When a site is redirecting somewhere strange, throwing errors, flagged by Google, or just behaving unpredictably, the first job is to stabilize it. This offer focuses on finding what is actually wrong, fixing the highest-risk issues, and leaving you with a clear hardening plan — without fear-based claims.",
    leadType: "Website Rescue",
    cta: "Request rescue help",
    symptoms: {
      title: "This is the right starting point if",
      items: [
        "The site redirects visitors somewhere it should not",
        "Pages error out, load half-broken, or changed without anyone touching them",
        "Google or the browser is flagging the site as unsafe",
        "A plugin, update, or unknown change broke something critical",
        "Forms stopped delivering and nobody knows when it started",
      ],
    },
    included: [
      {
        title: "Issue map",
        body: "A clear picture of what is broken, suspicious, or fragile, ranked by business risk rather than technical noise.",
      },
      {
        title: "Priority fixes",
        body: "The highest-risk issues stabilized first: redirects, broken pages, compromised code, failing forms.",
      },
      {
        title: "Hardening plan",
        body: "A practical list of what should change to reduce the chance this happens again, and what needs deeper specialist attention.",
      },
    ],
    firstStep: "Usually starts with a focused triage pass on the live site.",
    faqs: [
      {
        question: "Can you guarantee the site is fully secure afterward?",
        answer:
          "No one should promise absolute security from a quick review. The goal is to reduce obvious risk, stabilize the site, clean up practical issues, and identify what needs deeper specialist attention.",
      },
      {
        question: "Do I need to rebuild the site?",
        answer:
          "Not always. The triage pass shows whether cleanup is enough or whether the platform itself is the problem. Sometimes the right move is cleanup first, rebuild later.",
      },
    ],
  },
  {
    slug: "speed-cleanup",
    name: "Website Speed & Performance Cleanup",
    metaTitle: "Website Speed & Performance Cleanup",
    metaDescription:
      "Speed cleanup for slow websites: heavy media, poor mobile load, caching basics, and the visible performance issues that cost trust and leads.",
    eyebrow: "Entry offer / speed",
    headline: "Make the slow site fast enough to stop costing you leads.",
    intro:
      "Slow pages lose visitors before they read a word. This offer reviews what is actually making the site slow — oversized images, bloated scripts, missing caching, sluggish mobile rendering — then fixes the visible problems that cost trust and conversions.",
    leadType: "Speed Cleanup",
    cta: "Request a speed review",
    symptoms: {
      title: "This is the right starting point if",
      items: [
        "The site feels fine on your desktop but slow on phones",
        "Pages take seconds before anything appears",
        "Google PageSpeed or Core Web Vitals scores are in the red",
        "Images and videos were uploaded straight from a camera or designer",
        "Visitors bounce before the page finishes loading",
      ],
    },
    included: [
      {
        title: "Performance findings",
        body: "Where the load time actually goes: media weight, scripts, fonts, hosting, caching, and render behavior on real devices.",
      },
      {
        title: "Quick wins",
        body: "The fixes with the best effort-to-impact ratio, applied first — usually image weight, caching basics, and script cleanup.",
      },
      {
        title: "Next-step cleanup plan",
        body: "A prioritized plan for the remaining issues, so deeper work happens only where it pays off.",
      },
    ],
    firstStep: "Usually starts with a speed and mobile UX review of the live site.",
    faqs: [
      {
        question: "How much faster will the site get?",
        answer:
          "It depends on what is causing the slowness. The review identifies realistic gains before any work is scoped, so you know what to expect up front.",
      },
      {
        question: "Will this change how the site looks?",
        answer:
          "No. Performance cleanup targets weight and delivery, not design. Anything that would visibly change the site gets flagged before it happens.",
      },
    ],
  },
  {
    slug: "website-design-development",
    name: "Website Design & Development",
    metaTitle: "Website Design & Development",
    metaDescription:
      "Design and development of clean, fast, credible websites and rebuilds that support sales conversations and can grow into custom systems later.",
    eyebrow: "Entry offer / build",
    headline: "A sharper front door for the business.",
    intro:
      "The website is usually the first thing a prospect checks. This offer designs and builds clean, fast, credible sites — new builds or rebuilds — scoped around the smallest useful launch path, with room to grow into custom systems later.",
    leadType: "Custom Website / Web App",
    cta: "Talk through a website",
    symptoms: {
      title: "This is the right starting point if",
      items: [
        "The current site undersells the actual quality of the business",
        "You are starting something new and need a credible front door fast",
        "The site is hard to update, fragile, or held together by plugins",
        "Sales conversations keep having to apologize for the website",
        "You want a site that can later grow into portals, dashboards, or automation",
      ],
    },
    included: [
      {
        title: "Page strategy",
        body: "What pages exist, what each one has to accomplish, and what visitors need to see to take the next step.",
      },
      {
        title: "Build plan",
        body: "A clear scope with the smallest useful launch defined first, so the site ships instead of stalling in revisions.",
      },
      {
        title: "Launch-ready site or rebuild scope",
        body: "A fast, credible, maintainable site — or a precise rebuild scope if the current platform is worth keeping.",
      },
    ],
    firstStep: "Scoped around the smallest useful launch path.",
    faqs: [
      {
        question: "Do you use templates or build custom?",
        answer:
          "Whatever serves the outcome. Some businesses need a fast, clean templated launch; others need custom work. The recommendation comes after understanding the goal, not before.",
      },
      {
        question: "Can the site grow into something bigger later?",
        answer:
          "Yes — that is the point of the build approach. The same builder can extend the site into forms, CRM handoffs, automations, dashboards, portals, and custom apps.",
      },
    ],
  },
  {
    slug: "technical-audit",
    name: "Technical Website Audit",
    metaTitle: "Technical Website Audit",
    metaDescription:
      "A practical technical audit of site health, performance, forms, analytics, security posture, SEO basics, and conversion paths — clear answers before you spend on fixes.",
    eyebrow: "Entry offer / audit",
    headline: "Clear answers before you spend money on fixes.",
    intro:
      "Before committing to a rebuild, cleanup, or bigger system, it pays to know what is actually working. This audit reviews site health, performance, forms, analytics, security posture, SEO basics, accessibility basics, and conversion paths — and turns it into an action roadmap.",
    leadType: "Technical Audit",
    cta: "Request an audit",
    symptoms: {
      title: "This is the right starting point if",
      items: [
        "You suspect something is wrong but cannot pin down what",
        "An agency quoted a rebuild and you want a second opinion",
        "Leads dropped and nobody can explain why",
        "You inherited a site and need to know what you are standing on",
        "You want a prioritized list instead of vague recommendations",
      ],
    },
    included: [
      {
        title: "Health report",
        body: "The real state of the site: what works, what is fragile, and what is quietly costing trust or leads.",
      },
      {
        title: "Risk list",
        body: "Security posture, single points of failure, and upkeep debt, ranked by likelihood and business impact.",
      },
      {
        title: "Action roadmap",
        body: "What to fix, build, automate, or ignore — in order, with a clear first move.",
      },
    ],
    firstStep: "Useful before a rebuild, cleanup, or larger system plan.",
    faqs: [
      {
        question: "Is this a sales pitch dressed up as an audit?",
        answer:
          "No. The roadmap includes 'ignore' as a valid recommendation. The value is clarity — you can take the roadmap to anyone, including another builder.",
      },
      {
        question: "What do you need from me to start?",
        answer:
          "The site URL and a short description of what feels wrong or what decision you are trying to make. Access credentials come later, only if deeper review is needed.",
      },
    ],
  },
];

export function getServicePage(slug: string): ServicePage | undefined {
  return SERVICE_PAGES.find((service) => service.slug === slug);
}
