"use client";

import { useState, type PointerEvent } from "react";

type EntryOffer = {
  name: string;
  tag: string;
  description: string;
  cta: string;
  leadType: string;
};

type OfferDeckProps = {
  offers: EntryOffer[];
};

function dispatchLeadType(leadType: string) {
  window.dispatchEvent(new CustomEvent("hazzlee:leadType", { detail: leadType }));
}

export default function OfferDeck({ offers }: OfferDeckProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = offers[activeIndex];

  function handlePointerMove(event: PointerEvent<HTMLElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty("--my", `${event.clientY - rect.top}px`);
  }

  return (
    <section id="offers" className="section-shell mx-auto max-w-7xl px-6 py-24 sm:px-8 lg:px-10">
      <div className="grid gap-10 lg:grid-cols-[0.74fr_1.26fr]">
        <div className="motion-reveal">
          <p className="brand-eyebrow">Entry offers</p>
          <h2 className="font-display mt-4 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
            Start with the website. Grow into the system.
          </h2>
          <p className="mt-5 text-lg leading-8 text-slate-300">
            Hazzlee Labs is not only a web design brand, but websites are the clearest first step for most businesses. These entry offers are practical, easy to understand, and built to open the door to larger software, automation, and maintenance work.
          </p>
          <div className="mt-8 hidden rounded-3xl border border-white/10 bg-white/[0.025] p-5 sm:block">
            <p className="brand-eyebrow">Selected module</p>
            <h3 className="font-display mt-3 text-2xl font-semibold text-white">{active.name}</h3>
            <p className="mt-3 text-sm leading-6 text-slate-300">{active.tag}</p>
            <a
              href="#contact"
              onClick={() => dispatchLeadType(active.leadType)}
              className="magnetic-button mt-5 inline-flex rounded-xl px-5 py-3 text-sm font-bold text-white"
            >
              <span>{active.cta}</span>
            </a>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {offers.map((offer, index) => (
            <article
              key={offer.name}
              className={`interactive-card motion-card ${activeIndex === index ? "is-active" : ""}`}
              onMouseEnter={() => setActiveIndex(index)}
              onFocus={() => setActiveIndex(index)}
              onPointerMove={handlePointerMove}
              tabIndex={0}
            >
              <div className="interactive-card__glow" aria-hidden="true" />
              <div className="relative z-10">
                <div className="flex items-center justify-between gap-4">
                  <p className="code-label">0{index + 1} / entry</p>
                  <span className="module-state">ready</span>
                </div>
                <p className="mt-6 text-sm font-semibold text-[var(--brand-blue-soft)]">{offer.tag}</p>
                <h3 className="font-display mt-3 text-2xl font-semibold tracking-tight text-white">{offer.name}</h3>
                <p className="mt-4 leading-7 text-slate-300">{offer.description}</p>
                <a
                  href="#contact"
                  onClick={() => dispatchLeadType(offer.leadType)}
                  className="module-link mt-6 inline-flex text-sm font-bold text-[var(--brand-blue-soft)] hover:text-white"
                >
                  {offer.cta} <span aria-hidden="true">→</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
