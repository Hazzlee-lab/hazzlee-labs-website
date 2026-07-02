import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import BrandLogo from "@/components/BrandLogo";
import SiteFooter from "@/components/SiteFooter";
import { ContactEmailText } from "@/components/ContactEmail";
import { SERVICE_PAGES, getServicePage } from "@/lib/services";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export function generateStaticParams() {
  return SERVICE_PAGES.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServicePage(slug);
  if (!service) return {};

  return {
    title: service.metaTitle,
    description: service.metaDescription,
    alternates: {
      canonical: `/services/${service.slug}`,
    },
    openGraph: {
      title: `${service.metaTitle} | ${SITE_NAME}`,
      description: service.metaDescription,
      url: `${SITE_URL}/services/${service.slug}`,
    },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServicePage(slug);
  if (!service) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: service.name,
        description: service.metaDescription,
        url: `${SITE_URL}/services/${service.slug}`,
        provider: {
          "@type": "ProfessionalService",
          name: SITE_NAME,
          url: SITE_URL,
        },
        areaServed: "US",
      },
      {
        "@type": "FAQPage",
        mainEntity: service.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      },
    ],
  };

  const contactHref = `/?lead=${encodeURIComponent(service.leadType)}#contact`;

  return (
    <main className="brand-shell min-h-screen text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-4xl px-6 py-10 sm:px-8 lg:px-10">
        <header className="flex items-center justify-between gap-4">
          <Link href="/" className="inline-flex" aria-label="Hazzlee Labs home">
            <BrandLogo variant="wordmark" className="h-5 w-auto opacity-90 sm:h-6" />
          </Link>
          <Link
            href={contactHref}
            className="magnetic-button inline-flex rounded-lg px-3 py-2 text-xs font-semibold text-white sm:rounded-xl sm:px-4 sm:text-sm"
          >
            <span>{service.cta}</span>
          </Link>
        </header>

        <section className="mt-12">
          <p className="brand-eyebrow">{service.eyebrow}</p>
          <h1 className="font-display mt-4 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
            {service.headline}
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-300">{service.intro}</p>
        </section>

        <section className="mt-12 rounded-[2rem] border border-[rgba(37,99,235,0.2)] bg-[rgba(5,13,26,0.74)] p-6 sm:p-8">
          <h2 className="font-display text-2xl font-semibold tracking-[-0.03em] text-white sm:text-3xl">
            {service.symptoms.title}
          </h2>
          <ul className="mt-6 grid gap-3">
            {service.symptoms.items.map((item) => (
              <li
                key={item}
                className="rounded-2xl border border-white/10 bg-white/[0.025] px-4 py-3 text-sm font-semibold leading-6 text-slate-300"
              >
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl font-semibold tracking-[-0.03em] text-white sm:text-3xl">
            What you get
          </h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-3">
            {service.included.map((item) => (
              <article key={item.title} className="rounded-3xl border border-white/10 bg-white/[0.025] p-5">
                <h3 className="font-display text-xl font-semibold text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-300">{item.body}</p>
              </article>
            ))}
          </div>
          <p className="mt-6 text-sm font-semibold leading-6 text-slate-400">{service.firstStep}</p>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl font-semibold tracking-[-0.03em] text-white sm:text-3xl">
            Common questions
          </h2>
          <div className="mt-6 grid gap-5">
            {service.faqs.map((faq) => (
              <article key={faq.question} className="rounded-2xl border border-white/10 bg-white/[0.025] p-5">
                <h3 className="font-display text-xl font-semibold text-white">{faq.question}</h3>
                <p className="mt-3 leading-7 text-slate-300">{faq.answer}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-14 rounded-[2rem] border border-[rgba(37,99,235,0.22)] bg-[rgba(5,13,26,0.78)] p-6 text-center sm:p-8">
          <p className="brand-eyebrow">Start here</p>
          <h2 className="font-display mx-auto mt-4 max-w-2xl text-3xl font-semibold tracking-[-0.04em] text-white">
            Send the short version of the problem.
          </h2>
          <p className="mx-auto mt-4 max-w-xl leading-7 text-slate-300">
            The request form takes two minutes. The reply is a practical review and a clear recommendation.
          </p>
          <Link
            href={contactHref}
            className="magnetic-button mt-7 inline-flex rounded-xl px-6 py-3 text-sm font-bold text-white"
          >
            <span>{service.cta}</span>
          </Link>
          <p className="mt-5 text-sm leading-6 text-slate-400">
            Prefer email? Reach out at <ContactEmailText className="text-slate-200" />.
          </p>
        </section>
      </div>

      <SiteFooter />
    </main>
  );
}
