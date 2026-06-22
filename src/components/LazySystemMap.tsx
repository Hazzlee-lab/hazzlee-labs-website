"use client";

import { useEffect, useState, type ComponentType } from "react";
import { useDeferredMount } from "@/lib/use-deferred-mount";

type StudioOffer = {
  name: string;
  tag: string;
  description: string;
};

type LazySystemMapProps = {
  offers: StudioOffer[];
};

export default function LazySystemMap({ offers }: LazySystemMapProps) {
  const { ref, shouldLoad } = useDeferredMount<HTMLElement>();
  const [SystemMap, setSystemMap] = useState<ComponentType<LazySystemMapProps> | null>(null);

  useEffect(() => {
    if (!shouldLoad || SystemMap) return;

    let mounted = true;
    import("./SystemMap").then((module) => {
      if (mounted) {
        setSystemMap(() => module.default);
      }
    });

    return () => {
      mounted = false;
    };
  }, [SystemMap, shouldLoad]);

  if (SystemMap) {
    return <SystemMap offers={offers} />;
  }

  return (
    <section
      id="systems"
      ref={ref}
      className="lazy-system-placeholder lazy-section-preview section-shell mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-10"
      aria-label="Systems section preview"
    >
      <div className="lazy-section-preview__panel">
        <div>
          <p className="brand-eyebrow">Then expand</p>
          <h2 className="font-display mt-4 text-3xl font-semibold tracking-[-0.045em] text-white sm:text-4xl">
            The same builder can handle what comes after the website.
          </h2>
          <p className="mt-4 max-w-2xl leading-7 text-slate-300">
            A simple step-by-step path from website stability into workflows, AI, and operating views.
          </p>
        </div>
        <div className="lazy-section-preview__cards" aria-hidden="true">
          {offers.map((offer, index) => (
            <span key={offer.name}>
              <i>0{index + 1}</i>
              <b>{offer.name}</b>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
