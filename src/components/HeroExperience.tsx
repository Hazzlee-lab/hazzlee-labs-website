import BrandLogo, { BrandHeaderLogo, BrandLambdaMark } from "./BrandLogo";
import HeroCodeRain from "./HeroCodeRain";
import MobileNav from "./MobileNav";
import OfferLeadLink from "./OfferLeadLink";
import TrackedLink from "./TrackedLink";
import type { LeadType } from "@/lib/leads";

type HeroCapability = {
  label: string;
  leadType: LeadType;
};

type HeroExperienceProps = {
  capabilities: HeroCapability[];
};

const navLinks = [
  { href: "#offers", label: "Entry Offers" },
  { href: "#systems", label: "Systems" },
  { href: "#process", label: "Process" },
  { href: "#contact", label: "Contact" },
];

const cornerTags = [
  { className: "left-5 top-5", label: "[ sys.init ]" },
  { className: "right-5 top-5", label: "v2.6.0 // stable" },
  { className: "bottom-5 left-5", label: "0x00 → 0xFF" },
  { className: "bottom-5 right-5", label: "{ runtime: active }" },
];

export default function HeroExperience({ capabilities }: HeroExperienceProps) {
  return (
    <section
      id="top"
      data-section-label="Hero"
      className="hero-experience relative overflow-hidden border-b border-[rgba(37,99,235,0.18)]"
    >
      <div aria-hidden="true" className="hero-ambient-glow" />
      <div aria-hidden="true" className="brand-grid absolute inset-0 opacity-55" />

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col gap-8 px-5 py-5 sm:gap-12 sm:px-8 sm:py-8 lg:px-10">
        <header className="site-header flex flex-wrap items-center justify-between gap-3 sm:gap-5">
          <a href="#top" className="group inline-flex shrink-0 items-center" aria-label="Hazzlee Labs home">
            <BrandHeaderLogo />
          </a>
          <nav className="order-3 hidden w-full items-center justify-center gap-4 text-xs font-medium text-slate-300 sm:flex sm:text-sm md:order-none md:w-auto md:gap-7">
            {navLinks.map((link) => (
              <a key={link.href} className="nav-link" href={link.href}>{link.label}</a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <TrackedLink
              href="#contact"
              analyticsLocation="header"
              analyticsLabel="Start a build"
              className="magnetic-button inline-flex rounded-lg px-3 py-2 text-xs font-semibold text-white sm:rounded-xl sm:px-4 sm:text-sm"
            >
              <span>Start a build</span>
            </TrackedLink>
            <MobileNav links={navLinks} />
          </div>
        </header>

        <div className="hero-stage relative overflow-hidden rounded-[2rem] border border-[rgba(37,99,235,0.22)] bg-[rgba(5,13,26,0.6)] px-4 py-8 shadow-[0_0_80px_rgba(0,0,0,0.45)] sm:px-8 sm:py-10 lg:px-10 lg:py-16">
          <HeroCodeRain />
          <div aria-hidden="true" className="hero-rain-vignette absolute inset-0" />
          <BrandLogo variant="icon" decorative className="hero-watermark" />
          {cornerTags.map((tag) => (
            <span key={tag.label} className={`corner-tag absolute ${tag.className}`}>{tag.label}</span>
          ))}
          <div aria-hidden="true" className="hero-scanline" />

          <div className="grid items-center gap-8 sm:gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="relative z-10">
              <p className="hero-kicker brand-eyebrow mb-4 inline-flex rounded-full border border-[rgba(37,99,235,0.32)] bg-[rgba(5,13,26,0.74)] px-3 py-2 sm:mb-5 sm:px-4">
                Software. Automation. Engineering.
              </p>
              <h1 className="font-display max-w-4xl overflow-hidden text-[2.55rem] font-semibold leading-[0.96] tracking-[-0.06em] text-white sm:text-6xl lg:text-7xl">
                <span className="hero-title-line block">Intelligent systems</span>
                <span className="hero-title-line block">for practical business</span>
                <span className="hero-title-line block text-gradient-blue">outcomes.</span>
              </h1>
              <p className="hero-copy mt-5 max-w-2xl text-base leading-7 text-slate-300 sm:mt-7 sm:text-xl sm:leading-8">
                Hazzlee Labs builds intelligent software, automation, websites, and engineering systems. The easiest way to start is usually a practical website fix, cleanup, audit, or rebuild.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:mt-9 sm:flex-row">
                <TrackedLink
                  href="#contact"
                  analyticsLocation="hero"
                  analyticsLabel="Request a website checkup"
                  className="hero-action magnetic-button rounded-xl px-6 py-3 text-center text-sm font-bold text-white"
                >
                  <span>Request a website checkup</span>
                </TrackedLink>
                <TrackedLink
                  href="#offers"
                  analyticsLocation="hero"
                  analyticsLabel="See entry offers"
                  className="hero-action ghost-button rounded-xl px-6 py-3 text-center text-sm font-bold text-white"
                >
                  See entry offers
                </TrackedLink>
              </div>
              <div className="mt-6 grid max-w-3xl grid-cols-3 gap-2 text-xs text-slate-300 sm:mt-8 sm:gap-3 sm:text-sm">
                {[
                  "Builder-led",
                  "Systems-minded",
                  "Built to ship",
                ].map((item) => (
                  <div key={item} className="hero-chip signal-pill">{item}</div>
                ))}
              </div>
            </div>

            <div className="hero-module relative z-10 rounded-[1.5rem] border border-[rgba(37,99,235,0.26)] bg-[rgba(5,13,26,0.82)] p-3 shadow-2xl shadow-blue-950/40 backdrop-blur-xl sm:rounded-[2rem] sm:p-6">
              <div className="rounded-[1.2rem] border border-[rgba(37,99,235,0.34)] bg-[rgba(10,17,32,0.72)] p-4 sm:rounded-[1.5rem] sm:p-5">
                <div className="flex items-center justify-between gap-4">
                  <span className="inline-flex items-center gap-2.5">
                    <BrandLogo variant="icon" decorative className="h-6 w-6 shrink-0" />
                    <p className="brand-eyebrow">Start here</p>
                  </span>
                  <span className="status-dot hidden sm:inline-flex">runtime active</span>
                </div>
                <div className="mt-4 grid gap-2 sm:mt-6 sm:grid-cols-2 sm:gap-3">
                  {capabilities.map((capability, index) => (
                    <OfferLeadLink
                      key={capability.label}
                      href="#contact"
                      leadType={capability.leadType}
                      data-analytics-location="hero_capability"
                      className={`capability-tile items-center gap-2 ${index > 3 ? "hidden sm:flex" : "flex"}`}
                    >
                      <BrandLambdaMark className="h-3.5 w-3.5 shrink-0" />
                      <span>{capability.label}</span>
                    </OfferLeadLink>
                  ))}
                </div>
                <TrackedLink
                  href="#contact"
                  analyticsLocation="hero_module"
                  analyticsLabel="Request a Website Checkup"
                  className="mt-4 block rounded-2xl bg-[var(--brand-blue)] p-4 text-white transition hover:bg-[#3b82f6] sm:mt-6 sm:p-5"
                >
                  <p className="text-sm font-black uppercase tracking-[0.22em]">Primary CTA</p>
                  <p className="font-display mt-2 text-xl font-semibold tracking-tight sm:text-2xl">Request a Website Checkup</p>
                  <p className="mt-2 text-sm leading-6 text-blue-50">
                    Fast entry offer. Useful for rescue, speed, design, development, audits, and the bigger systems work that can follow.
                  </p>
                </TrackedLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
