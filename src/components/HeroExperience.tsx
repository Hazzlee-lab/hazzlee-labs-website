"use client";

import { useEffect, useRef, type PointerEvent } from "react";
import BrandLogo, { BrandHeaderLogo, BrandLambdaMark } from "./BrandLogo";
import HeroCodeRain from "./HeroCodeRain";
import { trackEvent } from "@/lib/analytics";
import { deferAfterPaint, prefersReducedMotion } from "@/lib/motion";

type HeroExperienceProps = {
  capabilities: string[];
};

const cornerTags = [
  { className: "left-5 top-5", label: "[ sys.init ]" },
  { className: "right-5 top-5", label: "v2.6.0 // stable" },
  { className: "bottom-5 left-5", label: "0x00 → 0xFF" },
  { className: "bottom-5 right-5", label: "{ runtime: active }" },
];

function reduceMotion() {
  return prefersReducedMotion();
}

export default function HeroExperience({ capabilities }: HeroExperienceProps) {
  const scope = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const root = scope.current;
    if (!root || reduceMotion()) return;

    const animations: Animation[] = [];
    const animate = (
      selector: string,
      keyframes: Keyframe[],
      options: KeyframeAnimationOptions,
      stagger = 0,
    ) => {
      root.querySelectorAll<HTMLElement>(selector).forEach((element, index) => {
        animations.push(
          element.animate(keyframes, {
            duration: 650,
            easing: "cubic-bezier(0.16, 1, 0.3, 1)",
            fill: "both",
            ...options,
            delay: (options.delay ?? 0) + index * stagger,
          }),
        );
      });
    };

    deferAfterPaint(() => {
      animate(".hero-module", [{ transform: "translateX(18px) rotateY(-4deg)" }, { transform: "translateX(0) rotateY(0)" }], {
        delay: 240,
        duration: 700,
      });
      animate(".hero-chip", [{ transform: "translateY(8px)" }, { transform: "translateY(0)" }], {
        delay: 520,
        duration: 420,
      }, 35);
    });

    return () => {
      animations.forEach((animation) => animation.cancel());
    };
  }, []);

  function handlePointerMove(event: PointerEvent<HTMLElement>) {
    event.currentTarget.style.setProperty("--spotlight-x", `${event.nativeEvent.offsetX}px`);
    event.currentTarget.style.setProperty("--spotlight-y", `${event.nativeEvent.offsetY}px`);
  }

  return (
    <section
      id="top"
      ref={scope}
      data-section-label="Hero"
      className="hero-experience relative overflow-hidden border-b border-[rgba(37,99,235,0.18)]"
      onPointerMove={handlePointerMove}
    >
      <div aria-hidden="true" className="hero-ambient-glow" />
      <div aria-hidden="true" className="brand-grid absolute inset-0 opacity-55" />

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col gap-12 px-6 py-8 sm:px-8 lg:px-10">
        <header className="site-header flex flex-wrap items-center justify-between gap-5">
          <a href="#top" className="group inline-flex shrink-0 items-center" aria-label="Hazzlee Labs home">
            <BrandHeaderLogo />
          </a>
          <nav className="order-3 flex w-full items-center justify-center gap-4 text-xs font-medium text-slate-300 sm:text-sm md:order-none md:w-auto md:gap-7">
            <a className="nav-link" href="#offers">Entry Offers</a>
            <a className="nav-link" href="#systems">Systems</a>
            <a className="nav-link" href="#process">Process</a>
            <a className="nav-link" href="#contact">Contact</a>
          </nav>
          <a
            href="#contact"
            onClick={() => trackEvent("CTA Clicked", { location: "header", label: "Start a build" })}
            className="magnetic-button inline-flex rounded-xl px-4 py-2 text-sm font-semibold text-white"
          >
            <span>Start a build</span>
          </a>
        </header>

        <div className="hero-stage relative overflow-hidden rounded-[2rem] border border-[rgba(37,99,235,0.22)] bg-[rgba(5,13,26,0.6)] px-5 py-10 shadow-[0_0_80px_rgba(0,0,0,0.45)] sm:px-8 lg:px-10 lg:py-16">
          <HeroCodeRain />
          <div aria-hidden="true" className="hero-rain-vignette absolute inset-0" />
          <BrandLogo variant="icon" decorative className="hero-watermark" />
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
                <a
                  href="#contact"
                  onClick={() => trackEvent("CTA Clicked", { location: "hero", label: "Request a website checkup" })}
                  className="hero-action magnetic-button rounded-xl px-6 py-3 text-center text-sm font-bold text-white"
                >
                  <span>Request a website checkup</span>
                </a>
                <a
                  href="#offers"
                  onClick={() => trackEvent("CTA Clicked", { location: "hero", label: "See entry offers" })}
                  className="hero-action ghost-button rounded-xl px-6 py-3 text-center text-sm font-bold text-white"
                >
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
                  <span className="inline-flex items-center gap-2.5">
                    <BrandLogo variant="icon" decorative className="h-6 w-6 shrink-0" />
                    <p className="brand-eyebrow">Start here</p>
                  </span>
                  <span className="status-dot">runtime active</span>
                </div>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {capabilities.map((capability) => (
                    <a
                      key={capability}
                      href="#offers"
                      onClick={() => trackEvent("CTA Clicked", { location: "hero_capability", label: capability })}
                      className="capability-tile flex items-center gap-2"
                    >
                      <BrandLambdaMark className="h-3.5 w-3.5 shrink-0" />
                      <span>{capability}</span>
                    </a>
                  ))}
                </div>
                <a
                  href="#contact"
                  onClick={() => trackEvent("CTA Clicked", { location: "hero_module", label: "Request a Website Checkup" })}
                  className="mt-6 block rounded-2xl bg-[var(--brand-blue)] p-5 text-white transition hover:bg-[#3b82f6]"
                >
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
