import Link from "next/link";

export default function ThanksPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#06080d] px-6 text-white">
      <section className="max-w-2xl rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 text-center shadow-2xl shadow-cyan-950/30">
        <p className="text-sm font-bold uppercase tracking-[0.35em] text-cyan-200">Request received</p>
        <h1 className="mt-4 text-4xl font-black tracking-[-0.04em] sm:text-5xl">Thanks. I’ll take a look.</h1>
        <p className="mt-5 text-lg leading-8 text-zinc-300">
          Your request has been sent to the Hazzlee Labs CRM. The next step is a practical review and a clear recommendation on what to fix, build, or ignore.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex rounded-full bg-cyan-300 px-6 py-3 text-sm font-black text-slate-950 transition hover:bg-cyan-200"
        >
          Back to homepage
        </Link>
      </section>
    </main>
  );
}
