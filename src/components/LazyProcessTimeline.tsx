"use client";

import { useEffect, useState, type ComponentType } from "react";
import { useDeferredMount } from "@/lib/use-deferred-mount";

type ProcessStep = {
  title: string;
  body: string;
};

type LazyProcessTimelineProps = {
  steps: ProcessStep[];
};

export default function LazyProcessTimeline({ steps }: LazyProcessTimelineProps) {
  const { ref, shouldLoad } = useDeferredMount<HTMLElement>();
  const [ProcessTimeline, setProcessTimeline] = useState<ComponentType<LazyProcessTimelineProps> | null>(null);

  useEffect(() => {
    if (!shouldLoad || ProcessTimeline) return;

    let mounted = true;
    import("./ProcessTimeline").then((module) => {
      if (mounted) {
        setProcessTimeline(() => module.default);
      }
    });

    return () => {
      mounted = false;
    };
  }, [ProcessTimeline, shouldLoad]);

  if (ProcessTimeline) {
    return <ProcessTimeline steps={steps} />;
  }

  return (
    <section
      ref={ref}
      className="lazy-process-placeholder lazy-section-preview section-shell mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-10"
      aria-label="Process section preview"
    >
      <div className="lazy-section-preview__panel">
        <div>
          <p className="brand-eyebrow">How work starts</p>
          <h2 className="font-display mt-4 text-3xl font-semibold tracking-[-0.045em] text-white sm:text-4xl">
            Clear over clever. Practical over theoretical.
          </h2>
          <p className="mt-4 max-w-2xl leading-7 text-slate-300">
            The mobile version keeps each phase stacked, direct, and easy to scan.
          </p>
        </div>
        <div className="lazy-section-preview__cards" aria-hidden="true">
          {steps.map((step, index) => (
            <span key={step.title}>
              <i>0{index + 1}</i>
              <b>{step.title}</b>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
