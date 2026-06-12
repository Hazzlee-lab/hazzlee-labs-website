const offers = [
  {
    name: "Website Rescue & Security Cleanup",
    tag: "For broken, hacked, redirected, or unstable sites",
    description:
      "Stabilize the site, clean up obvious issues, reduce risk, and create a practical hardening plan. Best when the website is hurting trust or blocking business.",
    cta: "Request rescue help",
  },
  {
    name: "Website Speed & Performance Cleanup",
    tag: "For slow sites that lose visitors and leads",
    description:
      "Improve load time, mobile experience, media weight, caching basics, and the visible performance issues that make a business look less reliable.",
    cta: "Request a speed review",
  },
  {
    name: "Technical Audit",
    tag: "For owners who need a clear technical map",
    description:
      "A focused review of website health, forms, analytics, hosting, performance, security posture, integrations, accessibility basics, and conversion paths.",
    cta: "Request an audit",
  },
  {
    name: "Automation & Custom Software",
    tag: "For messy workflows and half-finished ideas",
    description:
      "Build practical automations, internal tools, client portals, dashboards, and web apps that remove bottlenecks and help teams move faster.",
    cta: "Talk through a build",
  },
];

const processSteps = [
  "Quick triage call or async review",
  "Clear recommendation with next best action",
  "Focused cleanup, audit, build, or launch sprint",
  "Maintenance, monitoring, and improvement plan if it makes sense",
];

const matrixColumns = [
  "010010 1101 001011 1010 011001 1001 0011",
  "function rescue() { stabilize(); harden(); ship(); }",
  "101101 0010 111000 0101 100110 0110 1101",
  "audit.speed.cache.forms.security.uptime.workflow",
  "001101 1110 010010 1001 011100 1010 0010",
  "const nextStep = practical + useful + fast;",
  "110010 0111 100101 0011 010110 1110 1000",
  "deploy.monitor.maintain.automate.rebuild.launch",
  "011011 1001 001110 1110 010001 1011 0110",
  "if (site.broken) { rescue(site); }",
  "100110 0101 111001 0010 101100 0111 0001",
  "leads.forms.analytics.performance.security.systems",
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#06080d] text-white">
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.22),_transparent_34%),radial-gradient(circle_at_80%_20%,_rgba(34,197,94,0.14),_transparent_28%)]" />
        <div aria-hidden="true" className="matrix-rain absolute inset-0 overflow-hidden">
          <div className="matrix-rain__veil" />
          <div className="matrix-rain__columns">
            {matrixColumns.map((column, index) => (
              <span
                key={`${column}-${index}`}
                className="matrix-rain__column"
                style={{
                  animationDelay: `${index * -1.6}s`,
                  animationDuration: `${18 + (index % 5) * 3}s`,
                  left: `${index * 8.8}%`,
                }}
              >
                {column}
              </span>
            ))}
          </div>
        </div>
        <div className="relative mx-auto flex max-w-7xl flex-col gap-20 px-6 py-8 sm:px-8 lg:px-10">
          <header className="flex items-center justify-between gap-6">
            <a href="#top" className="group inline-flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-300/40 bg-cyan-300/10 text-sm font-black text-cyan-200 shadow-[0_0_30px_rgba(34,211,238,0.16)]">
                HL
              </span>
              <span className="text-sm font-semibold uppercase tracking-[0.35em] text-zinc-300">
                Hazzlee Labs
              </span>
            </a>
            <nav className="hidden items-center gap-7 text-sm text-zinc-300 md:flex">
              <a className="transition hover:text-white" href="#offers">Offers</a>
              <a className="transition hover:text-white" href="#process">Process</a>
              <a className="transition hover:text-white" href="#contact">Contact</a>
            </nav>
            <a
              href="#contact"
              className="rounded-full border border-cyan-300/40 px-4 py-2 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-300 hover:text-slate-950"
            >
              Request a checkup
            </a>
          </header>

          <div id="top" className="grid items-center gap-12 py-12 lg:grid-cols-[1.08fr_0.92fr] lg:py-20">
            <div>
              <p className="mb-5 inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-cyan-100">
                Website rescue, performance cleanup, automation, and practical engineering.
              </p>
              <h1 className="max-w-4xl text-5xl font-black tracking-[-0.05em] text-white sm:text-6xl lg:text-7xl">
                Technical help for websites and software that need to work better now.
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-zinc-300 sm:text-xl">
                Hazzlee Labs helps businesses clean up fragile websites, improve speed, fix broken technical workflows, and turn complex ideas into practical working systems.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#contact"
                  className="rounded-full bg-cyan-300 px-6 py-3 text-center text-sm font-bold text-slate-950 shadow-[0_0_40px_rgba(34,211,238,0.28)] transition hover:bg-cyan-200"
                >
                  Request a website checkup
                </a>
                <a
                  href="#offers"
                  className="rounded-full border border-white/15 px-6 py-3 text-center text-sm font-bold text-white transition hover:border-white/40 hover:bg-white/10"
                >
                  See what we fix
                </a>
              </div>
              <div className="mt-8 grid max-w-2xl gap-3 text-sm text-zinc-400 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">Fast triage</div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">Clear next steps</div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">Builds that ship</div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-cyan-950/40 backdrop-blur">
              <div className="rounded-[1.5rem] border border-cyan-300/20 bg-slate-950/80 p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-200">First response offers</p>
                <div className="mt-6 space-y-4">
                  {offers.slice(0, 3).map((offer) => (
                    <div key={offer.name} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                      <h3 className="font-bold text-white">{offer.name}</h3>
                      <p className="mt-1 text-sm leading-6 text-zinc-400">{offer.tag}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-6 rounded-2xl bg-cyan-300 p-5 text-slate-950">
                  <p className="text-sm font-black uppercase tracking-[0.25em]">Primary CTA</p>
                  <p className="mt-2 text-2xl font-black tracking-tight">Request a Website Checkup</p>
                  <p className="mt-2 text-sm leading-6 text-slate-800">
                    Simple, useful, and low-pressure. It opens the door to rescue work, speed cleanup, audits, maintenance, and custom builds.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="offers" className="mx-auto max-w-7xl px-6 py-24 sm:px-8 lg:px-10">
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.35em] text-cyan-200">Exact offers</p>
          <h2 className="mt-4 text-4xl font-black tracking-[-0.04em] sm:text-5xl">Start with the technical problem closest to revenue.</h2>
          <p className="mt-5 text-lg leading-8 text-zinc-300">
            The front door is intentionally simple: check the site, fix the urgent problem, then decide whether deeper work or ongoing support makes sense.
          </p>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {offers.map((offer) => (
            <article key={offer.name} className="rounded-[1.75rem] border border-white/10 bg-white/[0.035] p-7 transition hover:border-cyan-300/35 hover:bg-white/[0.055]">
              <p className="text-sm font-semibold text-cyan-200">{offer.tag}</p>
              <h3 className="mt-3 text-2xl font-black tracking-tight">{offer.name}</h3>
              <p className="mt-4 leading-7 text-zinc-300">{offer.description}</p>
              <a href="#contact" className="mt-6 inline-flex text-sm font-bold text-cyan-200 hover:text-cyan-100">
                {offer.cta} →
              </a>
            </article>
          ))}
        </div>
      </section>

      <section id="process" className="border-y border-white/10 bg-white/[0.025]">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-24 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:px-10">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.35em] text-cyan-200">How work starts</p>
            <h2 className="mt-4 text-4xl font-black tracking-[-0.04em] sm:text-5xl">Small first step. Useful answer fast.</h2>
            <p className="mt-5 text-lg leading-8 text-zinc-300">
              You do not need a huge scope document to start. Send the website or describe the workflow, and Hazzlee Labs will recommend the next practical move.
            </p>
          </div>
          <div className="grid gap-4">
            {processSteps.map((step, index) => (
              <div key={step} className="flex gap-5 rounded-3xl border border-white/10 bg-slate-950/60 p-6">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cyan-300 text-sm font-black text-slate-950">
                  {index + 1}
                </span>
                <p className="pt-2 text-lg font-semibold text-zinc-100">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="mx-auto grid max-w-7xl gap-12 px-6 py-24 sm:px-8 lg:grid-cols-[0.92fr_1.08fr] lg:px-10">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.35em] text-cyan-200">Request a checkup</p>
          <h2 className="mt-4 text-4xl font-black tracking-[-0.04em] sm:text-5xl">Send the site. Get a clear next step.</h2>
          <p className="mt-5 text-lg leading-8 text-zinc-300">
            Use this if your website is slow, broken, outdated, unstable, hard to maintain, or if you need a technical partner to help finish and launch something.
          </p>
          <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.035] p-6 text-sm leading-7 text-zinc-300">
            <p className="font-bold text-white">Best initial CTA:</p>
            <p className="mt-2">Request a Website Checkup</p>
            <p className="mt-4 font-bold text-white">Secondary CTAs:</p>
            <p className="mt-2">Request rescue help, request a speed review, request an audit, talk through a build.</p>
          </div>
        </div>

        <form action="/api/website-checkup" method="post" className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-cyan-950/30">
          <div className="hidden">
            <label htmlFor="company">Company</label>
            <input id="company" name="company" tabIndex={-1} autoComplete="off" />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm font-semibold text-zinc-200">Name</span>
              <input required name="name" className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-zinc-600 focus:border-cyan-300" placeholder="Your name" />
            </label>
            <label className="block">
              <span className="text-sm font-semibold text-zinc-200">Email</span>
              <input required type="email" name="email" className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-zinc-600 focus:border-cyan-300" placeholder="you@example.com" />
            </label>
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm font-semibold text-zinc-200">Business name</span>
              <input name="businessName" className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-zinc-600 focus:border-cyan-300" placeholder="Business or project" />
            </label>
            <label className="block">
              <span className="text-sm font-semibold text-zinc-200">Website URL</span>
              <input name="websiteUrl" type="url" className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-zinc-600 focus:border-cyan-300" placeholder="https://example.com" />
            </label>
          </div>
          <label className="mt-4 block">
            <span className="text-sm font-semibold text-zinc-200">What do you need help with?</span>
            <select name="leadType" defaultValue="Health Check" className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-cyan-300">
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
            <span className="text-sm font-semibold text-zinc-200">Short version of the problem</span>
            <textarea required name="message" rows={5} className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-zinc-600 focus:border-cyan-300" placeholder="Tell me what is broken, slow, messy, or ready to build." />
          </label>
          <button className="mt-6 w-full rounded-full bg-cyan-300 px-6 py-4 text-sm font-black text-slate-950 transition hover:bg-cyan-200" type="submit">
            Send checkup request
          </button>
          <p className="mt-4 text-center text-xs leading-6 text-zinc-500">
            No scare tactics. No fake urgency. Just a practical first look and a recommended next step.
          </p>
        </form>
      </section>
    </main>
  );
}
