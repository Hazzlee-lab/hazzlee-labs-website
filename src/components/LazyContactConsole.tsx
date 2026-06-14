"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { isLeadType, type LeadType } from "@/lib/leads";

const ContactConsole = dynamic(() => import("./ContactConsole"), {
  ssr: false,
});

export default function LazyContactConsole() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [initialLeadType, setInitialLeadType] = useState<LeadType | undefined>();

  useEffect(() => {
    const element = ref.current;
    if (!element || !("IntersectionObserver" in window)) {
      setShouldLoad(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setShouldLoad(true);
        observer.disconnect();
      },
      { rootMargin: "1100px 0px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    function handleLeadType(event: Event) {
      const detail = (event as CustomEvent<string>).detail;
      if (!detail || !isLeadType(detail)) return;

      setInitialLeadType(detail);
      setShouldLoad(true);
    }

    window.addEventListener("hazzlee:leadType", handleLeadType);
    return () => window.removeEventListener("hazzlee:leadType", handleLeadType);
  }, []);

  if (shouldLoad) {
    return <ContactConsole initialLeadType={initialLeadType} />;
  }

  return <div id="contact" ref={ref} className="lazy-section-placeholder lazy-section-placeholder--contact" aria-hidden="true" />;
}
