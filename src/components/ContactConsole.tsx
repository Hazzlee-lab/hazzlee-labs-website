"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import BrandLogo from "./BrandLogo";
import { trackEvent } from "@/lib/analytics";
import { LEAD_HELPERS, LEAD_TYPES, isLeadType, type LeadType } from "@/lib/leads";
import { CONTACT_EMAIL } from "@/lib/site";

type FormStatus = {
  state: "idle" | "submitting" | "success" | "error";
  message: string;
};

export default function ContactConsole() {
  const [leadType, setLeadType] = useState<LeadType>("Health Check");
  const [status, setStatus] = useState<FormStatus>(() => {
    if (typeof window !== "undefined" && window.location.search.includes("form=error")) {
      return {
        state: "error",
        message: `The request could not be sent. Please try again or email ${CONTACT_EMAIL}.`,
      };
    }

    return { state: "idle", message: "" };
  });
  const formStartedRef = useRef(false);

  useEffect(() => {
    function handleLeadType(event: Event) {
      const detail = (event as CustomEvent<string>).detail;
      if (detail && isLeadType(detail)) {
        setLeadType(detail);
        window.setTimeout(() => {
          document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 20);
      }
    }

    window.addEventListener("hazzlee:leadType", handleLeadType);
    return () => window.removeEventListener("hazzlee:leadType", handleLeadType);
  }, []);

  function handleFormStart() {
    if (formStartedRef.current) return;
    formStartedRef.current = true;
    trackEvent("Form Started", { form: "website_checkup", leadType });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    setStatus({ state: "submitting", message: "Sending your request..." });

    try {
      const response = await fetch(form.action, {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      });

      const result = (await response.json().catch(() => null)) as
        | { ok?: boolean; error?: string; redirectTo?: string }
        | null;

      if (!response.ok || !result?.ok) {
        const message =
          result?.error ?? `The request could not be sent. Please try again or email ${CONTACT_EMAIL}.`;
        setStatus({ state: "error", message });
        trackEvent("Form Submission Failed", {
          form: "website_checkup",
          leadType,
          status: response.status,
        });
        return;
      }

      trackEvent("Form Submitted", { form: "website_checkup", leadType });
      setStatus({ state: "success", message: "Request sent. Redirecting..." });
      window.location.href = result.redirectTo ?? "/thanks";
    } catch {
      setStatus({
        state: "error",
        message: `The request could not be sent. Please try again or email ${CONTACT_EMAIL}.`,
      });
      trackEvent("Form Submission Failed", { form: "website_checkup", leadType, status: "network_error" });
    }
  }

  return (
    <section
      id="contact"
      data-section-label="Contact"
      className="section-shell mx-auto grid max-w-7xl gap-12 px-6 py-24 sm:px-8 lg:grid-cols-[0.92fr_1.08fr] lg:px-10"
    >
      <div className="motion-reveal">
        <p className="brand-eyebrow">Start the conversation</p>
        <h2 className="font-display mt-4 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
          Bring the messy idea, broken workflow, fragile site, or system problem.
        </h2>
        <p className="mt-5 text-lg leading-8 text-slate-300">
          Use this for software builds, automation systems, technical audits, AI workflow ideas, website rescue, speed cleanup, launch help, or ongoing technical support.
        </p>
        <div className="mt-8 rounded-3xl border border-[rgba(37,99,235,0.18)] bg-[rgba(10,17,32,0.68)] p-6 text-sm leading-7 text-slate-300">
          <BrandLogo
            variant="full"
            title="Hazzlee Labs — Software. Automation. Engineering."
            className="h-28 w-auto"
          />
          <p className="font-display mt-6 font-semibold text-white">Mission</p>
          <p className="mt-2">Hazzlee Labs builds intelligent software, automation, and engineering systems that help people and businesses turn complex ideas into practical, working solutions.</p>
        </div>
      </div>

      <form
        action="/api/website-checkup"
        method="post"
        onFocusCapture={handleFormStart}
        onSubmit={handleSubmit}
        className="contact-console motion-reveal rounded-[2rem] border border-[rgba(37,99,235,0.2)] bg-[rgba(5,13,26,0.82)] p-6 shadow-2xl shadow-blue-950/30"
      >
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
            <input required name="name" maxLength={100} placeholder="Your name" />
          </label>
          <label className="form-field block">
            <span>Email</span>
            <input required type="email" name="email" maxLength={254} placeholder="you@example.com" />
          </label>
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <label className="form-field block">
            <span>Business or project</span>
            <input name="businessName" maxLength={120} placeholder="Business or project" />
          </label>
          <label className="form-field block">
            <span>Website URL</span>
            <input name="websiteUrl" type="url" maxLength={2048} placeholder="https://example.com" />
          </label>
        </div>
        <label className="form-field mt-4 block">
          <span>What do you need help with?</span>
          <select
            name="leadType"
            value={leadType}
            onChange={(event) => {
              const nextLeadType = event.target.value;
              if (isLeadType(nextLeadType)) {
                setLeadType(nextLeadType);
                trackEvent("Offer Selected", { leadType: nextLeadType, source: "contact_select" });
              }
            }}
          >
            {LEAD_TYPES.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </label>
        <div className="mt-4 rounded-2xl border border-[rgba(37,99,235,0.18)] bg-[rgba(37,99,235,0.08)] p-4 text-sm leading-6 text-blue-100">
          <p className="code-label mb-2">selection helper</p>
          {LEAD_HELPERS[leadType]}
        </div>
        <label className="form-field mt-4 block">
          <span>Short version of the problem</span>
          <textarea
            required
            name="message"
            rows={5}
            minLength={10}
            maxLength={2000}
            placeholder="Tell me what you want to build, fix, automate, audit, or launch."
          />
        </label>
        <div
          aria-live="polite"
          className={`mt-5 rounded-2xl border px-4 py-3 text-sm leading-6 ${
            status.state === "error"
              ? "border-red-400/30 bg-red-500/10 text-red-100"
              : status.state === "success"
                ? "border-cyan-300/30 bg-cyan-500/10 text-cyan-100"
                : "hidden"
          }`}
        >
          {status.message}
        </div>
        <button
          className="magnetic-button mt-6 w-full rounded-xl px-6 py-4 text-sm font-black text-white disabled:cursor-not-allowed disabled:opacity-70"
          type="submit"
          disabled={status.state === "submitting"}
        >
          <span>{status.state === "submitting" ? "Sending..." : "Send request"}</span>
        </button>
        <p className="mt-4 text-center text-xs leading-6 text-slate-500">
          By submitting, you agree that Hazzlee Labs can use your details to review and respond to the request. Read the{" "}
          <Link className="text-slate-300 underline decoration-slate-600 underline-offset-4 hover:text-white" href="/privacy">
            privacy policy
          </Link>
          .
        </p>
        <p className="mt-2 text-center text-xs leading-6 text-slate-500">
          Prefer email? Reach out at{" "}
          <a className="text-slate-300 underline decoration-slate-600 underline-offset-4 hover:text-white" href={`mailto:${CONTACT_EMAIL}`}>
            {CONTACT_EMAIL}
          </a>
          .
        </p>
      </form>
    </section>
  );
}
