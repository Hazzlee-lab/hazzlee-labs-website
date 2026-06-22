"use client";

import { useEffect, useState, type ComponentType } from "react";
import { useDeferredMount } from "@/lib/use-deferred-mount";
import { ContactEmailLink } from "./ContactEmail";
import { LEAD_TYPES, type LeadType } from "@/lib/leads";

const leadTypeValues = new Set<string>(LEAD_TYPES);

export default function LazyContactConsole() {
  const { ref, shouldLoad, triggerLoad } = useDeferredMount<HTMLElement>();
  const [initialLeadType, setInitialLeadType] = useState<LeadType | undefined>();
  const [ContactConsole, setContactConsole] = useState<ComponentType<{ initialLeadType?: LeadType }> | null>(null);

  useEffect(() => {
    function handleLeadType(event: Event) {
      const detail = (event as CustomEvent<string>).detail;
      if (!detail || !leadTypeValues.has(detail)) return;

      setInitialLeadType(detail as LeadType);
      triggerLoad();
    }

    window.addEventListener("hazzlee:leadType", handleLeadType);
    return () => window.removeEventListener("hazzlee:leadType", handleLeadType);
  }, [triggerLoad]);

  useEffect(() => {
    if (!shouldLoad || ContactConsole) return;

    let mounted = true;
    import("./ContactConsole").then((module) => {
      if (mounted) {
        setContactConsole(() => module.default);
      }
    });

    return () => {
      mounted = false;
    };
  }, [ContactConsole, shouldLoad]);

  if (ContactConsole) {
    return <ContactConsole initialLeadType={initialLeadType} />;
  }

  return (
    <section
      id="contact"
      ref={ref}
      className="lazy-contact-placeholder lazy-section-preview section-shell mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-10"
      aria-label="Contact options"
    >
      <div className="lazy-section-preview__panel lazy-section-preview__panel--contact">
        <div>
          <p className="brand-eyebrow">Start the conversation</p>
          <h2 className="font-display mt-4 text-3xl font-semibold tracking-[-0.045em] text-white sm:text-4xl">
            Start with the short version.
          </h2>
          <p className="mt-4 max-w-2xl leading-7 text-slate-300">
            Use the request form when it appears, or email what you need to build, fix, automate, audit, or launch.
          </p>
        </div>
        <div className="lazy-section-preview__contact-card">
          <p className="code-label">fallback</p>
          <ContactEmailLink className="mt-4 inline-flex rounded-xl border border-[rgba(147,197,253,0.22)] bg-white/[0.035] px-5 py-3 text-sm font-bold text-white transition hover:border-[rgba(147,197,253,0.5)] hover:bg-[rgba(37,99,235,0.12)]" />
        </div>
      </div>
    </section>
  );
}
