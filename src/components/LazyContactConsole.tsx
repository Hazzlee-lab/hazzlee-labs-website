"use client";

import { useEffect, useRef, useState, type ComponentType } from "react";
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
  const ref = useRef<HTMLDivElement | null>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [initialLeadType, setInitialLeadType] = useState<LeadType | undefined>();
  const [ContactConsole, setContactConsole] = useState<ComponentType<{ initialLeadType?: LeadType }> | null>(null);

  useEffect(() => {
    function handleLeadType(event: Event) {
      const detail = (event as CustomEvent<string>).detail;
      if (!detail || !leadTypeValues.has(detail)) return;

      setInitialLeadType(detail as LeadType);
      setShouldLoad(true);
    }

    window.addEventListener("hazzlee:leadType", handleLeadType);
    return () => window.removeEventListener("hazzlee:leadType", handleLeadType);
  }, []);

  useEffect(() => {
    const element = ref.current;
    if (!element || shouldLoad) return;

    if (!("IntersectionObserver" in window)) {
      setShouldLoad(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setShouldLoad(true);
        observer.disconnect();
      },
      { rootMargin: "900px 0px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [shouldLoad]);

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
