"use client";

import { useEffect, useState, type ComponentType } from "react";
import { useDeferredMount } from "@/lib/use-deferred-mount";
import type { LeadType } from "@/lib/leads";

const leadTypeValues = new Set<string>([
  "Health Check",
  "Website Rescue",
  "Speed Cleanup",
  "Technical Audit",
  "Custom Website / Web App",
  "Automation",
  "Maintenance",
]);

export default function LazyContactConsole() {
  const { ref, shouldLoad, triggerLoad } = useDeferredMount<HTMLDivElement>();
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

  return <div id="contact" ref={ref} className="lazy-contact-placeholder" aria-hidden="true" />;
}
