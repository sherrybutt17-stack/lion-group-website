import Link from "next/link";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { footerNav, site } from "@/content/site";
import { Logo } from "./Logo";

function FooterLinkList({ links }: { links: { label: string; href: string }[] }) {
  return (
    <ul className="mt-4 space-y-1">
      {links.map((link) => (
        <li key={link.href}>
          <Link prefetch={false} href={link.href} className="inline-flex min-h-11 items-center text-line-strong hover:text-gold-200 hover:underline">
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function SiteFooter() {
  const { contact } = site;
  return (
    <footer className="on-dark no-print bg-brown-900 text-line-strong">
      <div className="container-page grid gap-10 py-14 sm:grid-cols-2 xl:grid-cols-[1.4fr_1fr_1fr_1.5fr]">
        <div>
          <Logo tone="dark" />
          <p className="mt-5 max-w-xs font-serif text-lg text-gold-200">{site.tagline}</p>
          <ul className="mt-4">
            {site.social.map((s) => (
              <li key={s.href}>
                <a href={s.href} className="inline-flex min-h-11 items-center text-line-strong underline underline-offset-4 hover:text-gold-200">
                  <span className="sr-only">The Lion Group on&nbsp;</span>
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <nav aria-labelledby="footer-useful-links">
          <h2 id="footer-useful-links" className="font-ui text-sm font-semibold uppercase tracking-[0.12em] text-gold-400">
            Useful Links
          </h2>
          <FooterLinkList links={footerNav.usefulLinks} />
        </nav>

        <nav aria-labelledby="footer-company">
          <h2 id="footer-company" className="font-ui text-sm font-semibold uppercase tracking-[0.12em] text-gold-400">
            Company
          </h2>
          <FooterLinkList links={footerNav.company} />
        </nav>

        <div>
          <h2 className="font-ui text-sm font-semibold uppercase tracking-[0.12em] text-gold-400">Contact</h2>
          <ul className="mt-4 space-y-3 text-[0.9375rem]">
            <li className="flex gap-3">
              <MapPin aria-hidden="true" className="mt-1 size-4 shrink-0 text-gold-400" />
              <address className="not-italic">
                {contact.street}
                <br />
                {contact.city}, {contact.regionName} {contact.postalCode}
              </address>
            </li>
            <li>
              <a href={contact.phoneHref} className="inline-flex min-h-11 items-center gap-3 text-white hover:text-gold-200">
                <Phone aria-hidden="true" className="size-4 shrink-0 text-gold-400" />
                {contact.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={`mailto:${contact.email}`} className="inline-flex min-h-11 items-center gap-3 [overflow-wrap:anywhere] text-white hover:text-gold-200">
                <Mail aria-hidden="true" className="size-4 shrink-0 text-gold-400" />
                {contact.email}
              </a>
            </li>
            <li className="flex gap-3">
              <Clock aria-hidden="true" className="mt-1 size-4 shrink-0 text-gold-400" />
              <span>{contact.hours}</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-2 py-6 text-sm text-grey sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <p>Website mockup for client review. Not for publication.</p>
        </div>
      </div>
    </footer>
  );
}
