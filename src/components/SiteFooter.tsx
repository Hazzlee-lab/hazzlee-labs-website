import Link from "next/link";
import BrandLogo from "./BrandLogo";
import { ContactEmailLink } from "./ContactEmail";
import { SERVICE_PAGES } from "@/lib/services";
import { SITE_URL } from "@/lib/site";

const footerLinks = [
  { href: "/#offers", label: "Entry Offers" },
  { href: "/#process", label: "Process" },
  { href: "/#contact", label: "Contact" },
  { href: "/privacy", label: "Privacy" },
];

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer border-t border-[rgba(37,99,235,0.16)] bg-[rgba(2,5,12,0.94)]">
      <div className="mx-auto max-w-7xl px-6 py-14 sm:px-8 lg:px-10">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-sm">
            <Link href="/#top" className="inline-flex" aria-label="Hazzlee Labs home">
              <BrandLogo variant="wordmark" className="h-5 w-auto opacity-90 sm:h-6" />
            </Link>
            <p className="mt-4 text-sm leading-7 text-slate-400">
              Software, automation, and engineering systems for practical business outcomes.
            </p>
          </div>

          <div className="flex flex-col gap-8 sm:flex-row sm:gap-16">
            <nav aria-label="Footer" className="flex flex-col gap-3">
              <p className="code-label">Navigate</p>
              {footerLinks.map((link) => (
                <Link key={link.href} className="nav-link text-sm font-medium" href={link.href}>
                  {link.label}
                </Link>
              ))}
            </nav>

            <nav aria-label="Services" className="flex flex-col gap-3">
              <p className="code-label">Services</p>
              {SERVICE_PAGES.map((service) => (
                <Link
                  key={service.slug}
                  className="nav-link text-sm font-medium"
                  href={`/services/${service.slug}`}
                >
                  {service.name}
                </Link>
              ))}
            </nav>

            <div className="flex flex-col gap-3">
              <p className="code-label">Start</p>
              <Link href="/#contact" className="nav-link text-sm font-medium">
                Open a work request
              </Link>
              <a
                href={SITE_URL}
                className="nav-link text-sm font-medium"
                rel="noopener noreferrer"
              >
                hazzleelabs.com
              </a>
              <ContactEmailLink className="nav-link text-sm font-medium" />
            </div>
          </div>
        </div>

        <div className="brand-divider mt-12">
          <span className="brand-divider__line" aria-hidden="true" />
          <BrandLogo variant="icon" className="brand-divider__mark h-5 w-auto opacity-70" decorative />
          <span className="brand-divider__line" aria-hidden="true" />
        </div>

        <div className="mt-8 flex flex-col gap-3 text-xs leading-6 text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Hazzlee Labs. All rights reserved.</p>
          <p className="code-label text-slate-500" aria-hidden="true">runtime: stable // build: production</p>
        </div>
      </div>
    </footer>
  );
}
