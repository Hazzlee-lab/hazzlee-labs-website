"use client";

import { useEffect, useState } from "react";

const leadHelpers: Record<string, string> = {
  "Health Check": "Best next step: a lightweight review of the website front door, public signals, forms, mobile experience, speed, and obvious upkeep issues.",
  "Website Rescue": "Best next step: stabilize what is broken, suspicious, redirected, or business-critical before planning deeper improvements.",
  "Speed Cleanup": "Best next step: review the heavy assets, caching basics, mobile performance, and visible load problems that cost trust and leads.",
  "Technical Audit": "Best next step: map what is working, what is fragile, and what should happen before a rebuild, cleanup, or system expansion.",
  "Custom Website / Web App": "Best next step: define the business outcome, users, content, integrations, and smallest useful launch path.",
  Automation: "Best next step: map the workflow, inputs, systems, handoffs, failure points, and where automation creates the most leverage.",
  Maintenance: "Best next step: define the ongoing support, update, monitoring, and improvement rhythm that keeps the system stable.",
};

const options = [
  "Health Check",
  "Website Rescue",
  "Speed Cleanup",
  "Technical Audit",
  "Custom Website / Web App",
  "Automation",
  "Maintenance",
];

export default function ContactConsole() {
  const [leadType, setLeadType] = useState("Health Check");

  useEffect(() => {
    function handleLeadType(event: Event) {
      const detail = (event as CustomEvent<string>).detail;
      if (detail && options.includes(detail)) {
        setLeadType(detail);
        window.setTimeout(() => {
          document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 20);
      }
    }

    window.addEventListener("hazzlee:leadType", handleLeadType);
    return () => window.removeEventListener("hazzlee:leadType", handleLeadType);
  }, []);

  return (
    <section id="contact" className="section-shell mx-auto grid max-w-7xl gap-12 px-6 py-24 sm:px-8 lg:grid-cols-[0.92fr_1.08fr] lg:px-10">
      <div className="motion-reveal">
        <p className="brand-eyebrow">Start the conversation</p>
        <h2 className="font-display mt-4 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
          Bring the messy idea, broken workflow, fragile site, or system problem.
        </h2>
        <p className="mt-5 text-lg leading-8 text-slate-300">
          Use this for software builds, automation systems, technical audits, AI workflow ideas, website rescue, speed cleanup, launch help, or ongoing technical support.
        </p>
        <div className="mt-8 rounded-3xl border border-[rgba(37,99,235,0.18)] bg-[rgba(10,17,32,0.68)] p-6 text-sm leading-7 text-slate-300">
          <p className="font-display font-semibold text-white">Tagline</p>
          <p className="mt-2 uppercase tracking-[0.22em] text-[var(--brand-blue-soft)]">Software. Automation. Engineering.</p>
          <p className="font-display mt-5 font-semibold text-white">Mission</p>
          <p className="mt-2">Hazzlee Labs builds intelligent software, automation, and engineering systems that help people and businesses turn complex ideas into practical, working solutions.</p>
        </div>
      </div>

      <form action="/api/website-checkup" method="post" className="contact-console motion-reveal rounded-[2rem] border border-[rgba(37,99,235,0.2)] bg-[rgba(5,13,26,0.82)] p-6 shadow-2xl shadow-blue-950/30">
        <div className="mb-6 flex items-center justify-between gap-4 border-b border-white/10 pb-5">
          <div>
            <p className="code-label">request console</p>
            <h3 className="font-display mt-2 text-2xl font-semibold text-white">Open a work request</h3>
          </div>
          <span className="status-dot">ready</span>
        </div>
        <div className="hidden">
          <label htmlFor="company">Company</label>
          <input id="company" name="company" tabIndex={-1} autoComplete="off" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="form-field block">
            <span>Name</span>
            <input required name="name" placeholder="Your name" />
          </label>
          <label className="form-field block">
            <span>Email</span>
            <input required type="email" name="email" placeholder="you@example.com" />
          </label>
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <label className="form-field block">
            <span>Business or project</span>
            <input name="businessName" placeholder="Business or project" />
          </label>
          <label className="form-field block">
            <span>Website URL</span>
            <input name="websiteUrl" type="url" placeholder="https://example.com" />
          </label>
        </div>
        <label className="form-field mt-4 block">
          <span>What do you need help with?</span>
          <select name="leadType" value={leadType} onChange={(event) => setLeadType(event.target.value)}>
            {options.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </label>
        <div className="mt-4 rounded-2xl border border-[rgba(37,99,235,0.18)] bg-[rgba(37,99,235,0.08)] p-4 text-sm leading-6 text-blue-100">
          <p className="code-label mb-2">selection helper</p>
          {leadHelpers[leadType]}
        </div>
        <label className="form-field mt-4 block">
          <span>Short version of the problem</span>
          <textarea required name="message" rows={5} placeholder="Tell me what you want to build, fix, automate, audit, or launch." />
        </label>
        <button className="magnetic-button mt-6 w-full rounded-xl px-6 py-4 text-sm font-black text-white" type="submit">
          <span>Send request</span>
        </button>
        <p className="mt-4 text-center text-xs leading-6 text-slate-500">
          Clear, practical, technical help. No fake urgency and no buzzword soup.
        </p>
      </form>
    </section>
  );
}
