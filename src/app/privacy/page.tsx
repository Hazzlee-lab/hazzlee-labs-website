import type { Metadata } from "next";
import Link from "next/link";
import { CONTACT_EMAIL, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Hazzlee Labs collects and uses information submitted through the website request form.",
  alternates: {
    canonical: "/privacy",
  },
};

const policySections = [
  {
    title: "Information Collected",
    body: "When you submit the work request form, Hazzlee Labs may collect your name, email address, business or project name, website URL, selected request type, and the message you provide.",
  },
  {
    title: "How It Is Used",
    body: "The information is used to review the request, respond to you, qualify the right next step, and maintain a record of the conversation in the Hazzlee Labs lead workflow.",
  },
  {
    title: "Where It Is Stored",
    body: "Form submissions are sent to Airtable, which acts as a third-party processor for lead management. Hazzlee Labs does not sell submitted contact information.",
  },
  {
    title: "Analytics",
    body: "The site may record lightweight interaction events, such as CTA clicks and form submission outcomes, to understand whether the website is working. The current implementation does not require advertising trackers.",
  },
  {
    title: "Your Choices",
    body: `You can request correction or deletion of submitted information by emailing ${CONTACT_EMAIL}.`,
  },
];

export default function PrivacyPage() {
  return (
    <main className="brand-shell min-h-screen px-6 py-16 text-white sm:px-8 lg:px-10">
      <section className="mx-auto max-w-3xl rounded-[2rem] border border-[rgba(37,99,235,0.2)] bg-[rgba(5,13,26,0.78)] p-6 shadow-2xl shadow-blue-950/30 sm:p-10">
        <p className="brand-eyebrow">{SITE_NAME}</p>
        <h1 className="font-display mt-4 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
          Privacy Policy
        </h1>
        <p className="mt-5 text-sm leading-7 text-slate-400">Last updated: June 14, 2026</p>
        <p className="mt-6 text-lg leading-8 text-slate-300">
          This policy explains how Hazzlee Labs handles information submitted through this website.
          It is intended for a practical launch and may be updated as the business adds more tools or services.
        </p>

        <div className="mt-10 grid gap-6">
          {policySections.map((section) => (
            <article key={section.title} className="rounded-2xl border border-white/10 bg-white/[0.025] p-5">
              <h2 className="font-display text-2xl font-semibold text-white">{section.title}</h2>
              <p className="mt-3 leading-7 text-slate-300">{section.body}</p>
            </article>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <Link className="nav-link font-medium" href="/">
            Back to homepage
          </Link>
          <a className="nav-link font-medium" href={`mailto:${CONTACT_EMAIL}`}>
            {CONTACT_EMAIL}
          </a>
        </div>
      </section>
    </main>
  );
}
