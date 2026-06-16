import AnalyticsDelegate from "@/components/AnalyticsDelegate";
import BrandLogo from "@/components/BrandLogo";
import FounderPortrait from "@/components/FounderPortrait";
import HeroExperience from "@/components/HeroExperience";
import LazyContactConsole from "@/components/LazyContactConsole";
import LazyProcessTimeline from "@/components/LazyProcessTimeline";
import LazySystemMap from "@/components/LazySystemMap";
import MotionScene from "@/components/MotionScene";
import OfferDeck from "@/components/OfferDeck";
import SiteFooter from "@/components/SiteFooter";
import TrackedLink from "@/components/TrackedLink";
import { ContactEmailText } from "@/components/ContactEmail";

const entryOffers = [
  {
    name: "Website Rescue & Security Cleanup",
    tag: "For broken, suspicious, redirected, or unstable websites",
    description:
      "Stabilize the site, clean up obvious issues, reduce risk, and create a practical hardening plan without fear-based claims.",
    cta: "Request rescue help",
    leadType: "Website Rescue",
    timeline: "Usually starts with a focused triage pass.",
    deliverables: ["Issue map", "Priority fixes", "Hardening plan"],
  },
  {
    name: "Website Speed & Performance Cleanup",
    tag: "For slow sites, poor mobile load, heavy media, and sluggish UX",
    description:
      "Improve speed, caching basics, image weight, mobile experience, and the visible performance issues that cost trust and leads.",
    cta: "Request a speed review",
    leadType: "Speed Cleanup",
    timeline: "Usually starts with a speed and UX review.",
    deliverables: ["Performance findings", "Quick wins", "Next-step cleanup plan"],
  },
  {
    name: "Website Design & Development",
    tag: "For sharper websites, custom rebuilds, and better front doors",
    description:
      "Design and build clean, fast, credible websites that support sales conversations and can grow into custom systems later.",
    cta: "Talk through a website",
    leadType: "Custom Website / Web App",
    timeline: "Scoped around the smallest useful launch path.",
    deliverables: ["Page strategy", "Build plan", "Launch-ready site or rebuild scope"],
  },
  {
    name: "Technical Website Audit",
    tag: "For owners who need clear answers before rebuilding or fixing",
    description:
      "Review site health, performance, forms, analytics, security posture, SEO basics, accessibility basics, and conversion paths.",
    cta: "Request an audit",
    leadType: "Technical Audit",
    timeline: "Useful before a rebuild, cleanup, or larger system plan.",
    deliverables: ["Health report", "Risk list", "Action roadmap"],
  },
];

const studioOffers = [
  {
    name: "Software Systems",
    tag: "Custom web apps, portals, dashboards, and internal tools",
    description:
      "Practical software for businesses that need a working system instead of another spreadsheet, manual handoff, or half-finished idea.",
  },
  {
    name: "Automation Workflows",
    tag: "Operations, AI workflows, APIs, forms, and CRM handoffs",
    description:
      "Connect the tools, reduce repetitive work, and build reliable workflows that move information where it needs to go.",
  },
  {
    name: "Product & Launch Engineering",
    tag: "Finish, ship, and improve technical projects",
    description:
      "Help turn complex product ideas, integrations, and stuck software projects into usable, launched systems.",
  },
];

const capabilities = [
  "Full-stack web apps",
  "Business automation",
  "AI workflow systems",
  "Technical audits",
  "Website rescue",
  "Performance cleanup",
  "API integrations",
  "Launch support",
];

const processSteps = [
  {
    title: "Clarify",
    body: "Define the real technical problem, business outcome, users, constraints, and fastest useful first move.",
  },
  {
    title: "Design",
    body: "Turn the messy idea into a buildable system plan with clear scope, interfaces, and delivery path.",
  },
  {
    title: "Build",
    body: "Ship the software, automation, cleanup, or audit with practical engineering and direct communication.",
  },
  {
    title: "Improve",
    body: "Use real usage, sales conversations, and operational feedback to harden the system and choose what comes next.",
  },
];

const credibilityPoints = [
  {
    title: "Builder-led work",
    body: "You talk to the person thinking through the system, not a pass-through sales layer.",
  },
  {
    title: "Practical scope",
    body: "The first move is designed to be useful quickly, then expanded only when the next step is clear.",
  },
  {
    title: "Security-minded defaults",
    body: "Forms, data handling, third-party tools, and launch basics are treated as part of the build, not an afterthought.",
  },
];

const founderSignals = [
  "Direct conversations with Andrew, not a handoff maze or faceless agency layer.",
  "The same person mapping the problem is the person shaping the build.",
  "Websites, automations, and systems are kept practical, secure-minded, and launch-focused.",
];

const faqs = [
  {
    question: "Do I need a full rebuild?",
    answer:
      "Not always. The first pass is to understand what is actually broken, slow, unclear, or risky. Sometimes the right move is cleanup before a rebuild.",
  },
  {
    question: "Can you help beyond the website?",
    answer:
      "Yes. The website is often the first visible surface, but the work can expand into forms, CRM handoffs, automations, dashboards, portals, AI workflows, and custom apps.",
  },
  {
    question: "Do you guarantee security cleanup?",
    answer:
      "No one should promise absolute security from a quick review. The goal is to reduce obvious risk, stabilize the site, clean up practical issues, and identify what needs deeper specialist attention.",
  },
  {
    question: "What happens after I submit the form?",
    answer:
      "Your request goes into the Hazzlee Labs lead workflow. The next step is a practical review and a clear recommendation on what to build, fix, automate, audit, or ignore.",
  },
  {
    question: "What if the form does not work?",
    answer: (
      <>
        Email <ContactEmailText /> directly with the short version of what you need help with.
      </>
    ),
  },
];

function CredibilitySection() {
  return (
    <section id="proof" data-section-label="Proof" className="section-shell mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-10">
      <div className="motion-reveal max-w-3xl">
        <p className="brand-eyebrow">Why Hazzlee Labs</p>
        <h2 className="font-display mt-4 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
          Technical enough to solve the hard part. Practical enough to ship.
        </h2>
      </div>
      <div className="mt-10 grid gap-5 lg:grid-cols-3">
        {credibilityPoints.map((point) => (
          <article key={point.title} className="motion-card rounded-3xl border border-white/10 bg-white/[0.025] p-6">
            <p className="brand-eyebrow">Why it works</p>
            <h2 className="font-display mt-4 text-3xl font-semibold tracking-[-0.04em] text-white">
              {point.title}
            </h2>
            <p className="mt-4 leading-7 text-slate-300">{point.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function FounderSection() {
  return (
    <section id="founder" data-section-label="Founder" className="section-shell mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-10">
      <div className="grid gap-8 rounded-[2rem] border border-[rgba(37,99,235,0.2)] bg-[rgba(5,13,26,0.74)] p-6 sm:p-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
        <div className="motion-reveal">
          <p className="brand-eyebrow">Founder-led</p>
          <h2 className="font-display mt-4 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
            I&apos;m Andrew Hazzlee, the person behind the work.
          </h2>
          <p className="mt-5 text-lg leading-8 text-slate-300">
            Hazzlee Labs is intentionally small and hands-on. I work directly with clients to clarify the messy thing, choose the useful first move, and design, build, fix, or automate the parts that need a real technical owner.
          </p>
          <p className="mt-4 text-lg leading-8 text-slate-300">
            No pass-through sales layer, no mystery production team. You are talking with the person doing the systems thinking and the build work.
          </p>
          <div className="mt-7 grid gap-3">
            {founderSignals.map((signal) => (
              <p key={signal} className="rounded-2xl border border-white/10 bg-white/[0.025] px-4 py-3 text-sm font-semibold leading-6 text-slate-300">
                {signal}
              </p>
            ))}
          </div>
        </div>

        <div className="motion-card rounded-[2rem] border border-[rgba(37,99,235,0.22)] bg-[rgba(10,17,32,0.78)] p-5">
          <div className="rounded-[1.5rem] border border-white/10 bg-[rgba(5,13,26,0.8)] p-5">
            <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-5">
              <div className="flex items-center gap-4">
                <div className="grid h-16 w-16 place-items-center rounded-2xl border border-cyan-300/20 bg-cyan-400/10">
                  <BrandLogo variant="icon" decorative className="h-11 w-auto" />
                </div>
                <div>
                  <p className="code-label">builder profile</p>
                  <h3 className="font-display mt-1 text-2xl font-semibold text-white">Andrew Hazzlee</h3>
                  <p className="mt-1 text-sm font-semibold text-slate-400">Founder / Builder</p>
                </div>
              </div>
              <span className="status-dot">available</span>
            </div>
            <div className="mt-5 rounded-[1.35rem] border border-cyan-300/10 bg-white/[0.02] p-1">
              <FounderPortrait />
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {["clarify", "build", "ship"].map((item, index) => (
                <div key={item} className="rounded-2xl border border-[rgba(37,99,235,0.18)] bg-[rgba(37,99,235,0.08)] p-4">
                  <p className="code-label">0{index + 1}</p>
                  <p className="font-display mt-2 text-xl font-semibold text-white">{item}</p>
                </div>
              ))}
            </div>
            <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.025] p-4">
              <p className="text-sm leading-7 text-slate-300">
                One technical thread from first conversation to shipped improvement, led by Andrew Hazzlee.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MidPageCta({ label, title, body }: { label: string; title: string; body: string }) {
  return (
    <section className="section-shell mx-auto max-w-7xl px-6 py-14 sm:px-8 lg:px-10">
      <div className="motion-reveal rounded-[2rem] border border-[rgba(37,99,235,0.22)] bg-[rgba(5,13,26,0.78)] p-6 text-center sm:p-8">
        <p className="brand-eyebrow">{label}</p>
        <h2 className="font-display mx-auto mt-4 max-w-3xl text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl">
          {title}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-300">{body}</p>
        <TrackedLink
          href="#contact"
          analyticsLabel="Open a work request"
          analyticsLocation={label}
          className="magnetic-button mt-7 inline-flex rounded-xl px-6 py-3 text-sm font-bold text-white"
        >
          <span>Open a work request</span>
        </TrackedLink>
      </div>
    </section>
  );
}

function FaqSection() {
  return (
    <section id="faq" data-section-label="FAQ" className="section-shell mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-10">
      <div className="motion-reveal max-w-3xl">
        <p className="brand-eyebrow">FAQ</p>
        <h2 className="font-display mt-4 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
          Practical answers before you reach out.
        </h2>
      </div>
      <div className="mt-10 grid gap-5 lg:grid-cols-[0.82fr_1.18fr]">
        <aside className="faq-support-card motion-card">
          <div>
            <p className="code-label">support console</p>
            <h3 className="font-display mt-4 text-3xl font-semibold tracking-[-0.04em] text-white">
              Still sorting out what to ask?
            </h3>
            <p className="mt-4 leading-7 text-slate-300">
              Send the messy version. The first useful step is usually clarifying whether this needs a fix, audit, rebuild, automation, or nothing at all.
            </p>
          </div>
          <div className="mt-8 grid gap-3">
            {["clear next step", "practical scope", "builder-led reply"].map((signal) => (
              <p key={signal} className="faq-support-card__signal">
                {signal}
              </p>
            ))}
          </div>
          <TrackedLink
            href="#contact"
            analyticsLabel="Ask a different FAQ question"
            analyticsLocation="FAQ"
            className="ghost-button mt-8 inline-flex rounded-xl px-5 py-3 text-sm font-bold text-white"
          >
            <span>Ask a different question</span>
          </TrackedLink>
        </aside>

        <div className="faq-list motion-card">
          {faqs.map((faq, index) => (
            <details key={faq.question} name="faq-support" className="faq-item" open={index === 0}>
              <summary className="faq-item__summary">
                <span className="faq-item__number">{String(index + 1).padStart(2, "0")}</span>
                <span className="font-display text-xl font-semibold tracking-[-0.02em] text-white sm:text-2xl">
                  {faq.question}
                </span>
                <span className="faq-item__toggle" aria-hidden="true" />
              </summary>
              <div className="faq-item__answer">
                <p>{faq.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <main id="content" className="brand-shell min-h-screen text-white">
      <AnalyticsDelegate />
      <MotionScene />
      <HeroExperience capabilities={capabilities} />
      <OfferDeck offers={entryOffers} />
      <LazySystemMap offers={studioOffers} />

      <div className="section-bridge border-y border-[rgba(37,99,235,0.16)] bg-[rgba(5,13,26,0.68)]">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-7 px-6 py-14 sm:px-8 lg:px-10">
          <BrandLogo variant="wordmark" className="h-5 w-auto opacity-90 sm:h-6" />
          <p className="section-bridge__line motion-reveal text-center text-lg leading-8 text-slate-300 sm:text-xl">
            The system can expand — but the work always starts with clarity.
          </p>
        </div>
      </div>

      <LazyProcessTimeline steps={processSteps} />
      <FounderSection />
      <CredibilitySection />
      <MidPageCta
        label="Ready when you are"
        title="Bring the rough version. The job is to make it clear enough to act on."
        body="Send the short version of what you need to build, fix, automate, audit, or launch."
      />
      <FaqSection />
      <LazyContactConsole />
      <SiteFooter />
    </main>
  );
}
