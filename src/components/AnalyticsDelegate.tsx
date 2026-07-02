"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

// One document-level click listener replaces per-link client islands. It reads
// the analytics metadata that server-rendered anchors carry as data attributes.
export default function AnalyticsDelegate() {
  useEffect(() => {
    function handleClick(event: MouseEvent) {
      const target = event.target as HTMLElement | null;
      const link = target?.closest<HTMLAnchorElement>("a[data-lead-type], a[data-analytics-label]");
      if (!link) return;

      const leadType = link.getAttribute("data-lead-type");
      if (leadType) {
        window.dispatchEvent(new CustomEvent("hazzlee:leadType", { detail: leadType }));
        trackEvent("Offer Selected", {
          leadType,
          source: link.getAttribute("data-analytics-location") ?? "offer_deck",
        });
        return;
      }

      const label = link.getAttribute("data-analytics-label");
      if (label) {
        trackEvent("CTA Clicked", {
          label,
          location: link.getAttribute("data-analytics-location") ?? "",
        });
      }
    }

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return null;
}
