"use client";

import { useEffect, useState, type ComponentType } from "react";
import { useDeferredMount } from "@/lib/use-deferred-mount";
import { ContactEmailLink } from "./ContactEmail";
import { isLeadType, type LeadType } from "@/lib/leads";

// Service pages link to /?lead=<type>#contact so the form opens preselected.
function leadTypeFromQuery(): LeadType | undefined {
  if (typeof window === "undefined") return undefined;
  const lead = new URLSearchParams(window.location.search).get("lead");
  return lead && isLeadType(lead) ? lead : undefined;
}

export default function LazyContactConsole() {
  const { ref, shouldLoad, triggerLoad } = useDeferredMount<HTMLElement>();
  const [initialLeadType, setInitialLeadType] = useState<LeadType | undefined>(leadTypeFromQuery);
  const [ContactConsole, setContactConsole] = useState<ComponentType<{ initialLeadType?: LeadType }> | null>(null);

  useEffect(() => {
    function handleLeadType(event: Event) {
      const detail = (event as CustomEvent<string>).detail;
      if (!detail || !isLeadType(detail)) return;

      setInitialLeadType(detail);
      triggerLoad();
    }

    window.addEventListener("hazzlee:leadType", handleLeadType);
    return () => window.removeEventListener("hazzlee:leadType", handleLeadType);
  }, [triggerLoad]);

  useEffect(() => {
    if (initialLeadType) triggerLoad();
  }, [initialLeadType, triggerLoad]);

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
