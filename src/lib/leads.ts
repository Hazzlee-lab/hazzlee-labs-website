export const LEAD_TYPES = [
  "Workflow Blueprint Interview (Complimentary; $499 Value)",
  "Performance & Conversion Audit ($299)",
  "Storyboard & Brand Script Pack ($350)",
  "Custom Software Build / System Architecture",
] as const;

export type LeadType = (typeof LEAD_TYPES)[number];

export const DEFAULT_LEAD_TYPE: LeadType = LEAD_TYPES[0];

const DEFAULT_MESSAGE_PLACEHOLDER =
  "Tell me what you want to build, fix, automate, audit, or launch.";

export const LEAD_HELPERS: Record<LeadType, string> = {
  "Workflow Blueprint Interview (Complimentary; $499 Value)":
    "Best next step: A focused 45 minute technical review to isolate your manual processes and map out an automation webhook blueprint. (Application required; reserved for operations grossing over $5k/mo).",
  "Performance & Conversion Audit ($299)":
    "Best next step: A deep-dive structural tracking run of your site code metrics, SEO bugs, and conversion leaks, paired with a personalized 15 minute Loom breakdown video.",
  "Storyboard & Brand Script Pack ($350)":
    "Best next step: Complete pre-production copy concepts and visual rhythm scripts written for 2 cinematic main films and 5 vertical social distribution assets.",
  "Custom Software Build / System Architecture":
    "Best next step: Technical architecture scoping for full-stack applications, custom internal tools, or enterprise data infrastructure carrying a mandatory ongoing operational retainer.",
};

export const LEAD_MESSAGE_PLACEHOLDERS: Record<LeadType, string> = {
  "Workflow Blueprint Interview (Complimentary; $499 Value)":
    "Tell me about your current team size, rough monthly revenue, and the exact software workflow bottleneck that is driving you crazy...",
  "Performance & Conversion Audit ($299)": DEFAULT_MESSAGE_PLACEHOLDER,
  "Storyboard & Brand Script Pack ($350)": DEFAULT_MESSAGE_PLACEHOLDER,
  "Custom Software Build / System Architecture": DEFAULT_MESSAGE_PLACEHOLDER,
};

export const FORM_SUCCESS_MESSAGE =
  "Application Received. Our engineering lab is reviewing your workflow parameters. We will reach out via email within 24 hours to coordinate your workshop if your ecosystem is a match.";

export function isLeadType(value: string): value is LeadType {
  return LEAD_TYPES.includes(value as LeadType);
}
