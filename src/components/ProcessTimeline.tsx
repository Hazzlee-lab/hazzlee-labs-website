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
  const activeIndexRef = useRef(0);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root) return;

      const total = steps.length;

      if (reduceMotion()) {
        setActive(0);
        return;
      }

      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const pin = root.querySelector<HTMLElement>(".process-timeline-pin");
        if (!pin) return undefined;

        const progressTrack = root.querySelector<HTMLElement>(".process-progress-track");

        const setActiveStep = (progress: number) => {
          const clamped = Math.max(0, Math.min(1, progress));
          const index = Math.min(total - 1, Math.floor(clamped * total));

          if (index !== activeIndexRef.current) {
            activeIndexRef.current = index;
            setActive(index);
          }

          progressTrack?.style.setProperty("--scroll-progress", clamped.toFixed(5));
        };

        const st = ScrollTrigger.create({
          trigger: pin,
          pin,
          start: "top top",
          end: `+=${total * 110}%`,
          scrub: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => setActiveStep(self.progress),
          onRefresh: (self) => setActiveStep(self.progress),
        });

        setActiveStep(st.progress);

        return () => st.kill();
      });

      mm.add("(max-width: 1023px)", () => {
        activeIndexRef.current = 0;
        setActive(0);

        const progressTrack = root.querySelector<HTMLElement>(".process-progress-track");

        ScrollTrigger.create({
          trigger: root,
          start: "top 62%",
          end: "bottom 55%",
          scrub: true,
          onUpdate: (self) => {
            progressTrack?.style.setProperty("--scroll-progress", self.progress.toFixed(5));
          },
          onRefresh: (self) => {
            progressTrack?.style.setProperty("--scroll-progress", self.progress.toFixed(5));
          },
        });

        gsap.utils.toArray<HTMLElement>(".process-step", root).forEach((element, index) => {
          ScrollTrigger.create({
            trigger: element,
            start: "top 62%",
            end: "bottom 52%",
            onEnter: () => setActive(index),
            onEnterBack: () => setActive(index),
          });
        });

        return undefined;
      });

      return () => mm.revert();
    },
    { scope, dependencies: [steps.length] },
  );

  return (
    <section id="process" ref={scope} data-section-label="Process" className="section-shell process-timeline">
      <div className="process-timeline-pin mx-auto grid max-w-7xl gap-12 px-6 py-24 sm:px-8 lg:grid-cols-[0.88fr_1.12fr] lg:items-center lg:px-10 lg:py-0">
        <div className="motion-reveal">
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
          <div className="process-progress-track absolute bottom-8 left-5 top-8 hidden sm:block" aria-hidden="true">
            <span className="process-progress-line" />
            <span className="process-progress-fill" />
            <span className="process-progress-head" />
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
      </div>
    </section>
  );
}
