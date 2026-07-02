"use client";

import { track } from "@vercel/analytics";

type AnalyticsEventName =
  | "CTA Clicked"
  | "Offer Selected"
  | "Form Started"
  | "Form Submitted"
  | "Form Submission Failed";

type AnalyticsProperties = Record<string, string | number | boolean | undefined>;

export function trackEvent(event: AnalyticsEventName, properties: AnalyticsProperties = {}) {
  if (typeof window === "undefined") return;

  const cleanProperties: Record<string, string | number | boolean> = {};
  for (const [key, value] of Object.entries(properties)) {
    if (value !== undefined) cleanProperties[key] = value;
  }

  track(event, cleanProperties);
}
