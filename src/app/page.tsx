import HeroCodeRain from "@/components/HeroCodeRain";

const entryOffers = [
  {
    name: "Website Rescue & Security Cleanup",
    tag: "For broken, suspicious, redirected, or unstable websites",
    description:
      "Stabilize the site, clean up obvious issues, reduce risk, and create a practical hardening plan without fear-based claims.",
    cta: "Request rescue help",
  },
  {
    name: "Website Speed & Performance Cleanup",
    tag: "For slow sites, poor mobile load, heavy media, and sluggish UX",
    description:
      "Improve speed, caching basics, image weight, mobile experience, and the visible performance issues that cost trust and leads.",
    cta: "Request a speed review",
  },
  {
    name: "Website Design & Development",
    tag: "For sharper websites, custom rebuilds, and better front doors",
    description:
      "Design and build clean, fast, credible websites that support sales conversations and can grow into custom systems later.",
    cta: "Talk through a website",
  },
  {
    name: "Technical Website Audit",
    tag: "For owners who need clear answers before rebuilding or fixing",
    description:
      "Review site health, performance, forms, analytics, security posture, SEO basics, accessibility basics, and conversion paths.",
    cta: "Request an audit",
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

const attributes = [
  "Intelligent",
  "Practical",
  "Modern",
  "Precise",
  "Future-forward",
  "Builder-led",
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

export default function Home() {
  return (
    <main className="brand-shell min-h-screen text-white">
      <section className="relative overflow-hidden border-b border-[rgba(24,224,255,0.18)]">
        <div className="brand-grid absolute inset-0 opacity-70" />
        <HeroCodeRain />
        <div aria-hidden="true" className="hero-rain-vignette absolute inset-0" />

        <div className="relative z-10 mx-auto flex max-w-7xl flex-col gap-16 px-6 py-8 sm:px-8 lg:px-10">
          <header className="flex items-center justify-between gap-6">
            <a href="#top" className="group inline-flex items-center gap-4">
              <span className="brand-mark">HL</span>
              <span className="flex flex-col leading-none">
                <span className="font-display text-sm font-semibold uppercase tracking-[0.32em] text-white">
                  Hazzlee
                </span>
                <span className="mt-1 text-[0.62rem] font-bold uppercase tracking-[0.38em] text-[var(--brand-electric-blue)]">
                  Labs
                </span>
              </span>
            </a>
            <nav className="hidden items-center gap-7 text-sm font-medium text-slate-300 md:flex">
              <a className="transition hover:text-[var(--brand-cyan)]" href="#offers">Entry Offers</a>
              <a className="transition hover:text-[var(--brand-cyan)]" href="#process">Process</a>
              <a className="transition hover:text-[var(--brand-cyan)]" href="#contact">Contact</a>
            </nav>
            <a
              href="#contact"
              className="rounded-xl border border-[rgba(24,224,255,0.45)] px-4 py-2 text-sm font-semibold text-white transition hover:border-[var(--brand-cyan)] hover:bg-[rgba(0,102,255,0.28)]"
            >
              Start a build
            </a>
          </header>

          <div id="top" className="grid items-center gap-12 py-12 lg:grid-cols-[1.05fr_0.95fr] lg:py-20">
            <div>
              <p className="brand-eyebrow mb-5 inline-flex rounded-full border border-[rgba(24,224,255,0.22)] bg-[rgba(10,17,32,0.72)] px-4 py-2">
                Software. Automation. Engineering.
              </p>
              <h1 className="font-display max-w-4xl text-5xl font-semibold tracking-[-0.055em] text-white sm:text-6xl lg:text-7xl">
                Intelligent systems for practical business outcomes.
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
                Hazzlee Labs builds intelligent software, automation, websites, and engineering systems. The easiest way to start is usually a practical website fix, cleanup, audit, or rebuild.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#contact"
                  className="rounded-xl bg-[var(--brand-electric-blue)] px-6 py-3 text-center text-sm font-bold text-white shadow-[0_0_40px_rgba(0,102,255,0.34)] transition hover:bg-[var(--brand-cyan)] hover:text-[var(--brand-near-black)]"
                >
                  Request a website checkup
                </a>
                <a
                  href="#offers"
                  className="rounded-xl border border-white/15 px-6 py-3 text-center text-sm font-bold text-white transition hover:border-[var(--brand-cyan)] hover:bg-white/10"
                >
                  See entry offers
                </a>
              </div>
              <div className="mt-8 grid max-w-3xl gap-3 text-sm text-slate-300 sm:grid-cols-3">
                <div className="rounded-2xl border border-[rgba(24,224,255,0.16)] bg-[rgba(10,17,32,0.6)] p-4">Builder-led</div>
                <div className="rounded-2xl border border-[rgba(24,224,255,0.16)] bg-[rgba(10,17,32,0.6)] p-4">Systems-minded</div>
                <div className="rounded-2xl border border-[rgba(24,224,255,0.16)] bg-[rgba(10,17,32,0.6)] p-4">Built to ship</div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-[rgba(24,224,255,0.22)] bg-[rgba(5,10,20,0.78)] p-6 shadow-2xl shadow-blue-950/40 backdrop-blur">
              <div className="rounded-[1.5rem] border border-[rgba(0,102,255,0.32)] bg-[rgba(10,17,32,0.82)] p-6">
                <p className="brand-eyebrow">Start here</p>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {capabilities.map((capability) => (
                    <div key={capability} className="rounded-2xl border border-white/10 bg-white/[0.035] p-4 text-sm font-semibold text-slate-200">
                      <span className="mr-2 text-[var(--brand-cyan)]">▹</span>
                      {capability}
                    </div>
                  ))}
                </div>
                <div className="mt-6 rounded-2xl bg-[var(--brand-electric-blue)] p-5 text-white">
                  <p className="text-sm font-black uppercase tracking-[0.22em]">Primary CTA</p>
                  <p className="font-display mt-2 text-2xl font-semibold tracking-tight">Request a Website Checkup</p>
                  <p className="mt-2 text-sm leading-6 text-blue-50">
                    Fast entry offer. Useful for rescue, speed, design, development, audits, and the bigger systems work that can follow.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="offers" className="mx-auto max-w-7xl px-6 py-24 sm:px-8 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr]">
          <div>
            <p className="brand-eyebrow">Entry offers</p>
            <h2 className="font-display mt-4 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
              Start with the website. Grow into the system.
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-300">
              Hazzlee Labs is not only a web design brand, but websites are the clearest first step for most businesses. These entry offers are practical, easy to understand, and built to open the door to larger software, automation, and maintenance work.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {entryOffers.map((offer) => (
              <article key={offer.name} className="rounded-[1.5rem] border border-[rgba(24,224,255,0.14)] bg-[rgba(10,17,32,0.66)] p-7 transition hover:border-[rgba(24,224,255,0.55)] hover:bg-[rgba(10,17,32,0.9)]">
                <p className="text-sm font-semibold text-[var(--brand-cyan)]">{offer.tag}</p>
                <h3 className="font-display mt-3 text-2xl font-semibold tracking-tight">{offer.name}</h3>
                <p className="mt-4 leading-7 text-slate-300">{offer.description}</p>
                <a href="#contact" className="mt-6 inline-flex text-sm font-bold text-[var(--brand-cyan)] hover:text-white">
                  {offer.cta} →
                </a>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-16 rounded-[2rem] border border-[rgba(24,224,255,0.16)] bg-[rgba(5,10,20,0.48)] p-6 sm:p-8">
          <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr]">
            <div>
              <p className="brand-eyebrow">Then expand</p>
              <h3 className="font-display mt-4 text-3xl font-semibold tracking-[-0.035em] text-white">
                The same builder can handle what comes after the website.
              </h3>
              <p className="mt-4 leading-7 text-slate-300">
                Once the front door is stable, the work can move into custom apps, automations, AI workflows, integrations, dashboards, portals, and launch engineering.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {studioOffers.map((offer) => (
                <article key={offer.name} className="rounded-2xl border border-white/10 bg-white/[0.035] p-5">
                  <p className="text-sm font-semibold text-[var(--brand-cyan)]">{offer.tag}</p>
                  <h4 className="font-display mt-3 text-xl font-semibold text-white">{offer.name}</h4>
                  <p className="mt-3 text-sm leading-6 text-slate-300">{offer.description}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[rgba(24,224,255,0.16)] bg-[rgba(5,10,20,0.62)]">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-10">
          <p className="brand-eyebrow text-center">Brand attributes</p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
            {attributes.map((attribute) => (
              <div key={attribute} className="rounded-2xl border border-[rgba(0,102,255,0.25)] bg-[rgba(10,17,32,0.78)] px-4 py-5 text-center">
                <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-[var(--brand-electric-blue)] shadow-[0_0_18px_rgba(24,224,255,0.5)]" />
                <p className="font-display text-sm font-semibold text-white">{attribute}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="process" className="mx-auto grid max-w-7xl gap-12 px-6 py-24 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:px-10">
        <div>
          <p className="brand-eyebrow">How work starts</p>
          <h2 className="font-display mt-4 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
            Clear over clever. Practical over theoretical.
          </h2>
          <p className="mt-5 text-lg leading-8 text-slate-300">
            Hazzlee Labs should feel technical without being alien. The work starts by making the complex thing understandable, then building the useful version.
          </p>
        </div>
        <div className="grid gap-4">
          {processSteps.map((step, index) => (
            <div key={step.title} className="flex gap-5 rounded-3xl border border-[rgba(24,224,255,0.16)] bg-[rgba(10,17,32,0.68)] p-6">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--brand-electric-blue)] font-display text-sm font-bold text-white">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="font-display text-xl font-semibold text-white">{step.title}</h3>
                <p className="mt-2 leading-7 text-slate-300">{step.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="contact" className="mx-auto grid max-w-7xl gap-12 px-6 py-24 sm:px-8 lg:grid-cols-[0.92fr_1.08fr] lg:px-10">
        <div>
          <p className="brand-eyebrow">Start the conversation</p>
          <h2 className="font-display mt-4 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
            Bring the messy idea, broken workflow, fragile site, or system problem.
          </h2>
          <p className="mt-5 text-lg leading-8 text-slate-300">
            Use this for software builds, automation systems, technical audits, AI workflow ideas, website rescue, speed cleanup, launch help, or ongoing technical support.
          </p>
          <div className="mt-8 rounded-3xl border border-[rgba(24,224,255,0.18)] bg-[rgba(10,17,32,0.68)] p-6 text-sm leading-7 text-slate-300">
            <p className="font-display font-semibold text-white">Tagline</p>
            <p className="mt-2 uppercase tracking-[0.22em] text-[var(--brand-cyan)]">Software. Automation. Engineering.</p>
            <p className="font-display mt-5 font-semibold text-white">Mission</p>
            <p className="mt-2">Hazzlee Labs builds intelligent software, automation, and engineering systems that help people and businesses turn complex ideas into practical, working solutions.</p>
          </div>
        </div>

        <form action="/api/website-checkup" method="post" className="rounded-[2rem] border border-[rgba(24,224,255,0.18)] bg-[rgba(5,10,20,0.74)] p-6 shadow-2xl shadow-blue-950/30">
          <div className="hidden">
            <label htmlFor="company">Company</label>
            <input id="company" name="company" tabIndex={-1} autoComplete="off" />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm font-semibold text-slate-200">Name</span>
              <input required name="name" className="mt-2 w-full rounded-xl border border-white/10 bg-[var(--brand-deep-navy)] px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-[var(--brand-cyan)]" placeholder="Your name" />
            </label>
            <label className="block">
              <span className="text-sm font-semibold text-slate-200">Email</span>
              <input required type="email" name="email" className="mt-2 w-full rounded-xl border border-white/10 bg-[var(--brand-deep-navy)] px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-[var(--brand-cyan)]" placeholder="you@example.com" />
            </label>
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm font-semibold text-slate-200">Business or project</span>
              <input name="businessName" className="mt-2 w-full rounded-xl border border-white/10 bg-[var(--brand-deep-navy)] px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-[var(--brand-cyan)]" placeholder="Business or project" />
            </label>
            <label className="block">
              <span className="text-sm font-semibold text-slate-200">Website URL</span>
              <input name="websiteUrl" type="url" className="mt-2 w-full rounded-xl border border-white/10 bg-[var(--brand-deep-navy)] px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-[var(--brand-cyan)]" placeholder="https://example.com" />
            </label>
          </div>
          <label className="mt-4 block">
            <span className="text-sm font-semibold text-slate-200">What do you need help with?</span>
            <select name="leadType" defaultValue="Health Check" className="mt-2 w-full rounded-xl border border-white/10 bg-[var(--brand-deep-navy)] px-4 py-3 text-white outline-none transition focus:border-[var(--brand-cyan)]">
              <option>Health Check</option>
              <option>Website Rescue</option>
              <option>Speed Cleanup</option>
              <option>Technical Audit</option>
              <option>Custom Website / Web App</option>
              <option>Automation</option>
              <option>Maintenance</option>
            </select>
          </label>
          <label className="mt-4 block">
            <span className="text-sm font-semibold text-slate-200">Short version of the problem</span>
            <textarea required name="message" rows={5} className="mt-2 w-full rounded-xl border border-white/10 bg-[var(--brand-deep-navy)] px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-[var(--brand-cyan)]" placeholder="Tell me what you want to build, fix, automate, audit, or launch." />
          </label>
          <button className="mt-6 w-full rounded-xl bg-[var(--brand-electric-blue)] px-6 py-4 text-sm font-black text-white transition hover:bg-[var(--brand-cyan)] hover:text-[var(--brand-near-black)]" type="submit">
            Send request
          </button>
          <p className="mt-4 text-center text-xs leading-6 text-slate-500">
            Clear, practical, technical help. No fake urgency and no buzzword soup.
          </p>
        </form>
      </section>
    </main>
  );
}
