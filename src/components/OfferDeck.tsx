"use client";

import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from "react";
import { BrandLambdaMark } from "./BrandLogo";
import { trackEvent } from "@/lib/analytics";

type EntryOffer = {
  name: string;
  tag: string;
  description: string;
  cta: string;
  leadType: string;
  timeline?: string;
  deliverables?: string[];
};

type OfferDeckProps = {
  offers: EntryOffer[];
};

function dispatchLeadType(leadType: string) {
  window.dispatchEvent(new CustomEvent("hazzlee:leadType", { detail: leadType }));
  trackEvent("Offer Selected", { leadType, source: "offer_deck" });
}

function OfferCardVisual({ leadType }: { leadType: string }) {
  if (leadType === "Website Rescue") {
    return (
      <div className="offer-card-visual offer-card-visual--rescue" aria-hidden="true">
        <div className="flex items-center justify-between">
          <span className="code-label">rescue scan</span>
          <span className="rounded-full border border-red-300/30 bg-red-500/10 px-2 py-1 text-[0.62rem] font-black uppercase tracking-[0.16em] text-red-100">
            unstable
          </span>
        </div>
        <div className="mt-4 grid gap-2">
          {["redirect loop", "plugin drift", "form risk"].map((item, index) => (
            <span key={item} className="offer-rescue-row flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.035] px-3 py-2 text-xs text-slate-300">
              {item}
              <i className={index === 2 ? "text-cyan-200" : "text-red-200"}>{index === 2 ? "queue" : "fix"}</i>
            </span>
          ))}
        </div>
      </div>
    );
  }

  if (leadType === "Speed Cleanup") {
    return (
      <div className="offer-card-visual offer-card-visual--speed" aria-hidden="true">
        <div className="flex items-center justify-between">
          <span className="code-label">speed path</span>
          <span className="text-xs font-black text-cyan-100">mobile first</span>
        </div>
        <div className="mt-5 flex items-end gap-2">
          {[38, 54, 72, 90].map((height, index) => (
            <span key={height} className="offer-speed-bar flex-1 rounded-t-xl bg-[rgba(37,99,235,0.22)]" style={{ height: `${height}px` }}>
              <i className={`block h-full rounded-t-xl ${index === 3 ? "bg-[rgba(24,224,255,0.65)]" : "bg-[rgba(147,197,253,0.28)]"}`} />
            </span>
          ))}
        </div>
      </div>
    );
  }

  if (leadType === "Custom Website / Web App") {
    return (
      <div className="offer-card-visual offer-card-visual--build" aria-hidden="true">
        <div className="flex items-center justify-between">
          <span className="code-label">front door</span>
          <BrandLambdaMark className="h-4 w-4" />
        </div>
        <div className="mt-4 rounded-2xl border border-white/10 bg-[rgba(5,13,26,0.72)] p-3">
          <span className="offer-build-line block h-3 w-2/3 rounded-full bg-cyan-200/50" />
          <div className="mt-3 grid grid-cols-3 gap-2">
            <span className="offer-build-block h-12 rounded-xl bg-white/10" />
            <span className="offer-build-block h-12 rounded-xl bg-blue-400/20" />
            <span className="offer-build-block h-12 rounded-xl bg-white/10" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="offer-card-visual offer-card-visual--audit" aria-hidden="true">
      <div className="flex items-center justify-between">
        <span className="code-label">audit report</span>
        <span className="text-xs font-black text-blue-100">5 checks</span>
      </div>
      <div className="mt-4 grid gap-2">
        {["SEO", "forms", "security", "speed"].map((item) => (
          <span key={item} className="grid grid-cols-[5rem_1fr] items-center gap-3 text-xs uppercase tracking-[0.12em] text-slate-300">
            {item}
            <i className="offer-audit-line h-2 rounded-full bg-gradient-to-r from-blue-600/70 to-cyan-300/80" />
          </span>
        ))}
      </div>
    </div>
  );
}

export default function OfferDeck({ offers }: OfferDeckProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [hasEnteredView, setHasEnteredView] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (!("IntersectionObserver" in window)) {
      const timer = globalThis.setTimeout(() => setHasEnteredView(true), 0);
      return () => globalThis.clearTimeout(timer);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setHasEnteredView(entry.isIntersecting);
      },
      { rootMargin: "0px 0px -18% 0px", threshold: 0.28 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [hasEnteredView]);

  function handlePointerMove(event: PointerEvent<HTMLElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty("--my", `${event.clientY - rect.top}px`);
  }

  return (
    <section
      ref={sectionRef}
      id="offers"
      data-section-label="Entry Offers"
      className={`offers-section section-shell mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-10 ${hasEnteredView ? "is-visible" : ""}`}
    >
      <div className="motion-reveal flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          <p className="brand-eyebrow">Entry offers</p>
          <h2 className="font-display mt-4 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
            Choose the clearest first move.
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
            Pick the front-door problem that feels most urgent. The first move stays focused, then expands only when the next step is obvious.
          </p>
        </div>
        <div className="rounded-2xl border border-[rgba(147,197,253,0.16)] bg-white/[0.025] px-4 py-3">
          <p className="code-label">path</p>
          <p className="mt-1 text-sm font-semibold text-slate-300">check → fix → expand</p>
        </div>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {offers.map((offer, index) => (
          <article
            key={offer.name}
            className="interactive-card motion-card"
            style={{ "--offer-stagger": `${index * 110}ms` } as CSSProperties}
            onPointerMove={handlePointerMove}
          >
            <div className="interactive-card__glow" aria-hidden="true" />
            <div className="relative z-10 flex h-full flex-col">
              <OfferCardVisual leadType={offer.leadType} />
              <div className="flex items-center justify-between gap-4">
                <p className="code-label">0{index + 1} / entry</p>
                <span className="module-state">ready</span>
              </div>
              <p className="mt-6 flex items-start gap-2 text-sm font-semibold text-[var(--brand-blue-soft)]">
                <BrandLambdaMark className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                <span>{offer.tag}</span>
              </p>
              <h3 className="font-display mt-3 text-2xl font-semibold tracking-tight text-white">{offer.name}</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {(offer.deliverables ?? []).map((deliverable) => (
                  <span key={deliverable} className="rounded-full border border-white/10 bg-white/[0.035] px-3 py-1.5 text-xs font-semibold text-slate-300">
                    {deliverable}
                  </span>
                ))}
              </div>
              <a
                href="#contact"
                onClick={() => dispatchLeadType(offer.leadType)}
                className="module-link mt-auto inline-flex pt-6 text-sm font-bold text-[var(--brand-blue-soft)] hover:text-white"
              >
                {offer.cta} <span aria-hidden="true">→</span>
              </a>
            </div>
          </article>
        ))}
      </div>

      <div className="offer-flow-strip motion-reveal mt-6 rounded-[2rem] border border-[rgba(37,99,235,0.18)] bg-[rgba(5,13,26,0.72)] p-4">
        {["Check the front door", "Fix the first issue", "Expand into systems"].map((step, index) => (
          <span key={step}>
            <i>0{index + 1}</i>
            <b>{step}</b>
          </span>
        ))}
      </div>
    </section>
  );
}
