export type StudioOffer = {
  name: string;
  tag: string;
  description: string;
};

export const journeySteps = [
  {
    id: "website",
    number: "01",
    label: "01 / FRONT DOOR",
    shortLabel: "Front door",
    title: "Website front door",
    body: "The public site becomes the first stable surface: faster pages, cleaner messaging, working forms, better trust signals, and a clear path into the business.",
    tag: "Stable first impression",
    metric: "A+ / 98 / working forms",
  },
  {
    id: "crm",
    number: "02",
    label: "02 / LEAD CAPTURE",
    shortLabel: "Lead capture",
    title: "CRM handoff",
    body: "Forms, checkups, and requests stop disappearing into inbox noise. Leads move into a trackable system with status, source, next action, and context.",
    tag: "Cleaner follow-up loop",
    metric: "New → contacted → qualified",
  },
  {
    id: "automation",
    number: "03",
    label: "03 / WORKFLOW ENGINE",
    shortLabel: "Workflow engine",
    title: "Automation workflows",
    body: "The repeated handoffs get wired together: intake, notifications, data movement, routing, document creation, and operational triggers.",
    tag: "Less manual drag",
    metric: "Notify / route / create / update",
  },
  {
    id: "ai",
    number: "04",
    label: "04 / INTELLIGENCE LAYER",
    shortLabel: "Intelligence layer",
    title: "AI workflows",
    body: "AI gets placed where it belongs: summarizing, classifying, drafting, checking, and accelerating work without turning the system into a black box.",
    tag: "Useful intelligence",
    metric: "Classify / summarize / draft / check",
  },
  {
    id: "dashboard",
    number: "05",
    label: "05 / OPERATING VIEW",
    shortLabel: "Operating view",
    title: "Dashboards and portals",
    body: "Once the system is connected, dashboards and portals make the work visible: what came in, what changed, what needs attention, and what should happen next.",
    tag: "Readable operations",
    metric: "248 leads / 98.6% success",
  },
];

export type JourneyStep = (typeof journeySteps)[number];
