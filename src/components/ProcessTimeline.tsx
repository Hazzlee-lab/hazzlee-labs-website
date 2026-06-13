"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type ProcessStep = {
  title: string;
  body: string;
};

type ProcessTimelineProps = {
  steps: ProcessStep[];
};

function reduceMotion() {
  if (typeof window === "undefined") return true;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export default function ProcessTimeline({ steps }: ProcessTimelineProps) {
  const scope = useRef<HTMLElement | null>(null);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      if (reduceMotion()) return;

      gsap.fromTo(
        ".process-progress-fill",
        { scaleY: 0, transformOrigin: "top" },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: scope.current,
            start: "top 62%",
            end: "bottom 55%",
            scrub: true,
          },
        },
      );

      gsap.utils.toArray<HTMLElement>(".process-step", scope.current).forEach((element, index) => {
        ScrollTrigger.create({
          trigger: element,
          start: "top 62%",
          end: "bottom 52%",
          onEnter: () => setActive(index),
          onEnterBack: () => setActive(index),
        });
      });
    },
    { scope },
  );

  return (
    <section id="process" ref={scope} className="section-shell mx-auto grid max-w-7xl gap-12 px-6 py-24 sm:px-8 lg:grid-cols-[0.88fr_1.12fr] lg:px-10">
      <div className="motion-reveal lg:sticky lg:top-24 lg:h-fit">
        <p className="brand-eyebrow">How work starts</p>
        <h2 className="font-display mt-4 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
          Clear over clever. Practical over theoretical.
        </h2>
        <p className="mt-5 text-lg leading-8 text-slate-300">
          Hazzlee Labs should feel technical without being alien. The work starts by making the complex thing understandable, then building the useful version.
        </p>
        <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.025] p-5">
          <p className="code-label">current phase</p>
          <p className="font-display mt-2 text-2xl font-semibold text-white">{steps[active]?.title}</p>
        </div>
      </div>

      <div className="relative">
        <div className="absolute bottom-8 left-5 top-8 hidden w-px bg-white/10 sm:block">
          <div className="process-progress-fill h-full w-px bg-[var(--brand-blue)] shadow-[0_0_20px_rgba(37,99,235,0.85)]" />
        </div>
        <div className="grid gap-5 sm:pl-16">
          {steps.map((step, index) => (
            <article key={step.title} className={`process-step motion-card ${active === index ? "is-active" : ""}`}>
              <span className="process-step__number">{String(index + 1).padStart(2, "0")}</span>
              <div>
                <p className="code-label">phase / {step.title.toLowerCase()}</p>
                <h3 className="font-display mt-2 text-2xl font-semibold text-white">{step.title}</h3>
                <p className="mt-3 leading-7 text-slate-300">{step.body}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
