import Link from "next/link";
import { footerNav, site } from "@/content/site";
import { withConcept, type ConceptId } from "@/concepts/config";
import { Logo } from "../Logo";

function LinkList({ concept, links }: { concept: ConceptId; links: { label: string; href: string }[] }) {
  return (
    <ul className="mt-5 space-y-1">
      {links.map((link) => (
        <li key={link.href}>
          <Link prefetch={false} href={withConcept(concept, link.href)} className="link-sweep inline-flex min-h-11 items-center text-c-ink">
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

const headingClass = "font-ui text-xs font-semibold uppercase tracking-[0.18em] text-c-accent";

export function ConceptFooter({ concept }: { concept: ConceptId }) {
  const { contact } = site;
  const wrapper = {
    a: "bg-noir-warm border-t border-c-line",
    b: "px-3 pb-3",
    c: "border-t border-c-line",
    d: "bg-noir-warm border-t border-c-line",
    e: "border-t-[3px] border-double border-c-ink",
  }[concept];
  const inner = concept === "b" ? "tone-brown bg-mesh-dark mx-auto max-w-[90rem] overflow-hidden rounded-[2rem]" : "";

  return (
    <footer className={`no-print ${wrapper}`}>
      <div className={inner}>
        <div className="container-page grid gap-12 pb-10 pt-16 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1.4fr] lg:pt-20">
          <div>
            <Logo tone={concept === "e" ? "light" : "dark"} href={withConcept(concept, "/")} />
            <p className="mt-6 max-w-xs font-serif text-xl leading-snug text-c-ink">{site.tagline}</p>
            <ul className="mt-5">
              {site.social.map((s) => (
                <li key={s.href}>
                  <a href={s.href} className="link-sweep link-sweep-static inline-flex min-h-11 items-center text-c-ink">
                    <span className="sr-only">The Lion Group on&nbsp;</span>
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-labelledby="footer-useful-links">
            <h2 id="footer-useful-links" className={headingClass}>
              Useful Links
            </h2>
            <LinkList concept={concept} links={footerNav.usefulLinks} />
          </nav>

          <nav aria-labelledby="footer-company">
            <h2 id="footer-company" className={headingClass}>
              Company
            </h2>
            <LinkList concept={concept} links={footerNav.company} />
          </nav>

          <div>
            <h2 className={headingClass}>Contact</h2>
            <address className="mt-5 space-y-3 not-italic">
              <p>
                {contact.street}
                <br />
                {contact.city}, {contact.regionName} {contact.postalCode}
              </p>
              <p>
                <a href={contact.phoneHref} className="link-sweep inline-flex min-h-11 items-center text-c-ink">
                  {contact.phoneDisplay}
                </a>
                <br />
                <a href={`mailto:${contact.email}`} className="link-sweep inline-flex min-h-11 items-center text-c-ink [overflow-wrap:anywhere]">
                  {contact.email}
                </a>
              </p>
              <p>{contact.hours}</p>
            </address>
          </div>
        </div>

        <div aria-hidden="true" className="container-page select-none pt-6 text-c-line">
          <svg viewBox="0 0 1000 140" className="block h-auto w-full overflow-visible">
            <text
              x="0"
              y="112"
              textLength="1000"
              lengthAdjust="spacingAndGlyphs"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              className={concept === "c" ? "font-ui font-semibold uppercase" : "font-serif"}
              style={{ fontSize: concept === "c" ? 132 : 128 }}
            >
              The Lion Group
            </text>
          </svg>
        </div>

        <div className="container-page flex flex-col gap-2 border-t border-c-line py-6 text-sm text-c-muted sm:flex-row sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
