"use client";

import ContactConsole from "@/components/ContactConsole";
import HeroExperience from "@/components/HeroExperience";
import MotionScene from "@/components/MotionScene";
import OfferDeck from "@/components/OfferDeck";
import ProcessTimeline from "@/components/ProcessTimeline";
import SystemMap from "@/components/SystemMap";

const entryOffers = [
  {
    name: "Website Rescue & Security Cleanup",
    tag: "For broken, suspicious, redirected, or unstable websites",
    description:
      "Stabilize the site, clean up obvious issues, reduce risk, and create a practical hardening plan without fear-based claims.",
    cta: "Request rescue help",
    leadType: "Website Rescue",
  },
  {
    name: "Website Speed & Performance Cleanup",
    tag: "For slow sites, poor mobile load, heavy media, and sluggish UX",
    description:
      "Improve speed, caching basics, image weight, mobile experience, and the visible performance issues that cost trust and leads.",
    cta: "Request a speed review",
    leadType: "Speed Cleanup",
  },
  {
    name: "Website Design & Development",
    tag: "For sharper websites, custom rebuilds, and better front doors",
    description:
      "Design and build clean, fast, credible websites that support sales conversations and can grow into custom systems later.",
    cta: "Talk through a website",
    leadType: "Custom Website / Web App",
  },
  {
    name: "Technical Website Audit",
    tag: "For owners who need clear answers before rebuilding or fixing",
    description:
      "Review site health, performance, forms, analytics, security posture, SEO basics, accessibility basics, and conversion paths.",
    cta: "Request an audit",
    leadType: "Technical Audit",
  },
];

const studioOffers = [
  {
    name: "Software Systems",
    tag: "Custom web apps, portals, dashboards, and internal tools",
    description:
      "Practical software for businesses that need a working system instead of another spreadsheet, manual handoff, or half-finished idea.",
  },
  {
    name: "Automation Workflows",
    tag: "Operations, AI workflows, APIs, forms, and CRM handoffs",
    description:
      "Connect the tools, reduce repetitive work, and build reliable workflows that move information where it needs to go.",
  },
  {
    name: "Product & Launch Engineering",
    tag: "Finish, ship, and improve technical projects",
    description:
      "Help turn complex product ideas, integrations, and stuck software projects into usable, launched systems.",
  },
];

const capabilities = [
  "Full-stack web apps",
  "Business automation",
  "AI workflow systems",
  "Technical audits",
  "Website rescue",
  "Performance cleanup",
  "API integrations",
  "Launch support",
];

const attributes = [
  "Intelligent",
  "Practical",
  "Modern",
  "Precise",
  "Future-forward",
  "Builder-led",
];

const processSteps = [
  {
    title: "Clarify",
    body: "Define the real technical problem, business outcome, users, constraints, and fastest useful first move.",
  },
  {
    title: "Design",
    body: "Turn the messy idea into a buildable system plan with clear scope, interfaces, and delivery path.",
  },
  {
    title: "Build",
    body: "Ship the software, automation, cleanup, or audit with practical engineering and direct communication.",
  },
  {
    title: "Improve",
    body: "Use real usage, sales conversations, and operational feedback to harden the system and choose what comes next.",
  },
];

export default function Home() {
  return (
    <main className="brand-shell min-h-screen text-white">
      <MotionScene>
        <HeroExperience capabilities={capabilities} />
        <OfferDeck offers={entryOffers} />
        <SystemMap offers={studioOffers} />

        <section className="border-y border-[rgba(37,99,235,0.16)] bg-[rgba(5,13,26,0.68)]">
          <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-10">
            <p className="brand-eyebrow motion-reveal text-center">Brand attributes</p>
            <div className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-6">
              {attributes.map((attribute) => (
                <div key={attribute} className="attribute-card motion-card">
                  <div className="attribute-card__bar" />
                  <p className="font-display text-sm font-semibold text-white">{attribute}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <ProcessTimeline steps={processSteps} />
        <ContactConsole />
      </MotionScene>
    </main>
  );
}
