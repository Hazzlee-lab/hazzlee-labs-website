import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Request Received",
  description: "Your Hazzlee Labs request has been received.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ThanksPage() {
  return (
    <main className="brand-shell brand-grid flex min-h-screen items-center justify-center px-6 text-white">
      <section className="max-w-2xl rounded-[2rem] border border-[rgba(24,224,255,0.18)] bg-[rgba(5,10,20,0.78)] p-8 text-center shadow-2xl shadow-blue-950/30 backdrop-blur">
        <p className="brand-eyebrow">Request received</p>
        <h1 className="font-display mt-4 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
          Thanks. I’ll take a look.
        </h1>
        <p className="mt-5 text-lg leading-8 text-slate-300">
          Your request landed directly with Andrew. Expect a practical review and a clear recommendation on what to build, fix, automate, or ignore — usually within one business day.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex rounded-xl bg-[var(--brand-electric-blue)] px-6 py-3 text-sm font-black text-white transition hover:bg-[var(--brand-cyan)] hover:text-[var(--brand-near-black)]"
        >
          Back to homepage
        </Link>
      </section>
    </main>
  );
}
