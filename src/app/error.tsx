"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ContactEmailLink } from "@/components/ContactEmail";

export default function ErrorPage({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="brand-shell brand-grid flex min-h-screen items-center justify-center px-6 text-white">
      <section className="max-w-2xl rounded-[2rem] border border-[rgba(37,99,235,0.2)] bg-[rgba(5,10,20,0.78)] p-8 text-center shadow-2xl shadow-blue-950/30 backdrop-blur">
        <p className="brand-eyebrow">Unexpected error</p>
        <h1 className="font-display mt-4 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
          Something went wrong.
        </h1>
        <p className="mt-5 text-lg leading-8 text-slate-300">
          The page hit an unexpected error. Trying again usually resolves it.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => unstable_retry()}
            className="inline-flex rounded-xl bg-[var(--brand-blue)] px-6 py-3 text-sm font-black text-white transition hover:bg-[#3b82f6]"
          >
            Try again
          </button>
          <Link
            href="/"
            className="ghost-button inline-flex rounded-xl px-6 py-3 text-sm font-bold text-white"
          >
            Back to homepage
          </Link>
        </div>
        <p className="mt-6 text-sm leading-6 text-slate-400">
          Still stuck? Email <ContactEmailLink className="text-slate-200 underline decoration-slate-600 underline-offset-4 hover:text-white" />.
        </p>
      </section>
    </main>
  );
}
