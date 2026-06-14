"use client";

type AnalyticsEventName =
  | "CTA Clicked"
  | "Offer Selected"
  | "Form Started"
  | "Form Submitted"
  | "Form Submission Failed";

type AnalyticsProperties = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    hazzleeAnalyticsQueue?: Array<{
      event: AnalyticsEventName;
      properties: AnalyticsProperties;
      timestamp: string;
    }>;
  }
}

export function trackEvent(event: AnalyticsEventName, properties: AnalyticsProperties = {}) {
  if (typeof window === "undefined") return;

  const payload = {
    event,
    properties,
    timestamp: new Date().toISOString(),
  };

  window.hazzleeAnalyticsQueue = window.hazzleeAnalyticsQueue ?? [];
  window.hazzleeAnalyticsQueue.push(payload);
  window.dataLayer?.push({ event, ...properties });
  window.dispatchEvent(new CustomEvent("hazzlee:analytics", { detail: payload }));
}
