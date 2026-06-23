export const LEAD_TYPES = [
  "Health Check",
  "Website Rescue",
  "Speed Cleanup",
  "Technical Audit",
  "Custom Website / Web App",
  "Automation",
  "Maintenance",
] as const;

export type LeadType = (typeof LEAD_TYPES)[number];

export const LEAD_HELPERS: Record<LeadType, string> = {
  "Health Check":
    "Best next step: a lightweight review of the website front door, public signals, forms, mobile experience, speed, and obvious upkeep issues.",
  "Website Rescue":
    "Best next step: stabilize what is broken, suspicious, redirected, or business-critical before planning deeper improvements.",
  "Speed Cleanup":
    "Best next step: review the heavy assets, caching basics, mobile performance, and visible load problems that cost trust and leads.",
  "Technical Audit":
    "Best next step: map what is working, what is fragile, and what should happen before a rebuild, cleanup, or system expansion.",
  "Custom Website / Web App":
    "Best next step: define the business outcome, users, content, integrations, and smallest useful launch path.",
  Automation:
    "Best next step: map the workflow, inputs, systems, handoffs, failure points, and where automation creates the most leverage.",
  Maintenance:
    "Best next step: define the ongoing support, update, monitoring, and improvement rhythm that keeps the system stable.",
};

export function isLeadType(value: string): value is LeadType {
  return LEAD_TYPES.includes(value as LeadType);
}
