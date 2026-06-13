"use client";

import { useRef, type PointerEvent } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import HeroCodeRain from "./HeroCodeRain";

gsap.registerPlugin(useGSAP);

type HeroExperienceProps = {
  capabilities: string[];
};

const cornerTags = [
  { className: "left-5 top-5", label: "[ sys.init ]" },
  { className: "right-5 top-5", label: "v2.6.0 // stable" },
  { className: "bottom-5 left-5", label: "0x00 → 0xFF" },
  { className: "bottom-5 right-5", label: "{ runtime: active }" },
];

const rainColumns = [
  "fn\n01\ntry\n{}\n=>\nnew\n00\nfor\nλ\n10\nint\n//",
  "0x\nvar\n11\n&&\ndef\n░\n01\nset\n{}\ntry\n∞",
  "git\n=>\n10\nlet\n⊕\nif\n00\nnew\n//\n01\nfn",
  "01\n10\n11\n00\nfn\ntry\nfor\nnew\napi\ncrm",
  "def\n{}\n&&\nvar\n0x\n01\nAI\nops\nrun\nsys",
  "new\nlet\n=>\n//\n10\n11\nbuild\nship\nfix",
];

function reduceMotion() {
  if (typeof window === "undefined") return true;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export default function HeroExperience({ capabilities }: HeroExperienceProps) {
  const scope = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      if (reduceMotion()) return;

      const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });
      timeline
        .fromTo(".hero-kicker", { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.55 })
        .fromTo(
          ".hero-title-line",
          { yPercent: 100, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.78, stagger: 0.1 },
          "-=0.2",
        )
        .fromTo(".hero-copy", { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.65 }, "-=0.35")
        .fromTo(".hero-action", { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.55, stagger: 0.08 }, "-=0.2")
        .fromTo(".hero-module", { x: 34, opacity: 0, rotateY: -8 }, { x: 0, opacity: 1, rotateY: 0, duration: 0.85 }, "-=0.5")
        .fromTo(".hero-chip", { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, stagger: 0.04 }, "-=0.45");
    },
    { scope },
  );

  function handlePointerMove(event: PointerEvent<HTMLElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--spotlight-x", `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty("--spotlight-y", `${event.clientY - rect.top}px`);
  }

  return (
    <section
      ref={scope}
      className="hero-experience relative overflow-hidden border-b border-[rgba(37,99,235,0.18)]"
      onPointerMove={handlePointerMove}
    >
      <div aria-hidden="true" className="hero-ambient-glow" />
      <div aria-hidden="true" className="brand-grid absolute inset-0 opacity-55" />

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col gap-12 px-6 py-8 sm:px-8 lg:px-10">
        <header className="site-header flex items-center justify-between gap-6">
          <a href="#top" className="group inline-flex items-center gap-4" aria-label="Hazzlee Labs home">
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
            <a className="nav-link" href="#offers">Entry Offers</a>
            <a className="nav-link" href="#process">Process</a>
            <a className="nav-link" href="#contact">Contact</a>
          </nav>
          <a href="#contact" className="magnetic-button hidden rounded-xl px-4 py-2 text-sm font-semibold text-white sm:inline-flex">
            <span>Start a build</span>
          </a>
        </header>

        <div id="top" className="hero-stage relative overflow-hidden rounded-[2rem] border border-[rgba(37,99,235,0.22)] bg-[rgba(5,13,26,0.6)] px-5 py-10 shadow-[0_0_80px_rgba(0,0,0,0.45)] sm:px-8 lg:px-10 lg:py-16">
          <HeroCodeRain />
          <div aria-hidden="true" className="css-code-rain-layer">
            {Array.from({ length: 24 }, (_, index) => (
              <span
                key={index}
                className="css-code-rain-column"
                style={{
                  left: `${index * 4.35}%`,
                  animationDelay: `${index * -0.72}s`,
                  animationDuration: `${11 + (index % 7) * 1.8}s`,
                }}
              >
                {rainColumns[index % rainColumns.length]}
              </span>
            ))}
          </div>
          <div aria-hidden="true" className="hero-rain-vignette absolute inset-0" />
          {cornerTags.map((tag) => (
            <span key={tag.label} className={`corner-tag absolute ${tag.className}`}>{tag.label}</span>
          ))}
          <div aria-hidden="true" className="hero-scanline" />

          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="relative z-10">
              <p className="hero-kicker brand-eyebrow mb-5 inline-flex rounded-full border border-[rgba(37,99,235,0.32)] bg-[rgba(5,13,26,0.74)] px-4 py-2">
                Software. Automation. Engineering.
              </p>
              <h1 className="font-display max-w-4xl overflow-hidden text-5xl font-semibold tracking-[-0.06em] text-white sm:text-6xl lg:text-7xl">
                <span className="hero-title-line block">Intelligent systems</span>
                <span className="hero-title-line block">for practical business</span>
                <span className="hero-title-line block text-gradient-blue">outcomes.</span>
              </h1>
              <p className="hero-copy mt-7 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
                Hazzlee Labs builds intelligent software, automation, websites, and engineering systems. The easiest way to start is usually a practical website fix, cleanup, audit, or rebuild.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a href="#contact" className="hero-action magnetic-button rounded-xl px-6 py-3 text-center text-sm font-bold text-white">
                  <span>Request a website checkup</span>
                </a>
                <a href="#offers" className="hero-action ghost-button rounded-xl px-6 py-3 text-center text-sm font-bold text-white">
                  See entry offers
                </a>
              </div>
              <div className="mt-8 grid max-w-3xl gap-3 text-sm text-slate-300 sm:grid-cols-3">
                {[
                  "Builder-led",
                  "Systems-minded",
                  "Built to ship",
                ].map((item) => (
                  <div key={item} className="hero-chip signal-pill">{item}</div>
                ))}
              </div>
            </div>

            <div className="hero-module relative z-10 rounded-[2rem] border border-[rgba(37,99,235,0.26)] bg-[rgba(5,13,26,0.82)] p-4 shadow-2xl shadow-blue-950/40 backdrop-blur-xl sm:p-6">
              <div className="rounded-[1.5rem] border border-[rgba(37,99,235,0.34)] bg-[rgba(10,17,32,0.72)] p-5">
                <div className="flex items-center justify-between gap-4">
                  <p className="brand-eyebrow">Start here</p>
                  <span className="status-dot">runtime active</span>
                </div>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {capabilities.map((capability) => (
                    <a key={capability} href="#offers" className="capability-tile">
                      <span className="mr-2 text-[var(--brand-blue)]">▹</span>
                      {capability}
                    </a>
                  ))}
                </div>
                <a href="#contact" className="mt-6 block rounded-2xl bg-[var(--brand-blue)] p-5 text-white transition hover:bg-[#3b82f6]">
                  <p className="text-sm font-black uppercase tracking-[0.22em]">Primary CTA</p>
                  <p className="font-display mt-2 text-2xl font-semibold tracking-tight">Request a Website Checkup</p>
                  <p className="mt-2 text-sm leading-6 text-blue-50">
                    Fast entry offer. Useful for rescue, speed, design, development, audits, and the bigger systems work that can follow.
                  </p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
