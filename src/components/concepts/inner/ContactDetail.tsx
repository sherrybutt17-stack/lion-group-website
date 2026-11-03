import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/content/site";
import { withConcept, type ConceptId } from "@/concepts/config";
import { ContactForm } from "../../forms/ContactForm";
import { PageHero } from "./PageHero";

export function ContactDetail({ concept }: { concept: ConceptId }) {
  const { contact } = site;
  const rows = [
    { term: "Call", value: contact.phoneDisplay, href: contact.phoneHref },
    { term: "Email", value: contact.email, href: `mailto:${contact.email}` },
    { term: "Visit", value: `${contact.street}, ${contact.city}, ${contact.regionName} ${contact.postalCode}`, href: contact.mapsHref, label: "(opens Google Maps)" },
  ];

  return (
    <>
      <PageHero
        concept={concept}
        crumb="Contact"
        label="Contact"
        title="Contact The Lion Group"
        lede="Questions about DODD Agency Provider or Health Care Consultant? Reach us by phone, email, or the form below."
      />

      <section aria-label="Contact options" className={concept === "b" ? "px-3 py-3" : "py-20 md:py-28"}>
        <div className="container-page grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <ul className="border-t border-c-line" data-reveal-group>
              {rows.map((row) => (
                <li key={row.term} className="border-b border-c-line" data-reveal-item>
                  <a href={row.href} className="group flex min-h-24 items-center justify-between gap-6 py-6">
                    <span>
                      <span className="block font-ui text-sm font-semibold uppercase tracking-[0.14em] text-c-accent">{row.term}</span>
                      <span className="mt-2 block font-serif text-2xl leading-snug text-c-ink [overflow-wrap:anywhere]">
                        {row.value}
                        {row.label && <span className="sr-only"> {row.label}</span>}
                      </span>
                    </span>
                    <ArrowUpRight
                      aria-hidden="true"
                      className="size-6 shrink-0 text-c-ink transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                    />
                  </a>
                </li>
              ))}
              <li className="py-6" data-reveal-item>
                <span className="block font-ui text-sm font-semibold uppercase tracking-[0.14em] text-c-accent">Office hours</span>
                <span className="mt-2 block font-serif text-2xl text-c-ink">{contact.hours}</span>
              </li>
            </ul>
            <p className="mt-8 rounded-2xl border border-c-line p-6">
              Looking for a job? Applications go through the{" "}
              <Link prefetch={false} href={withConcept(concept, "/careers/")} className="link-sweep link-sweep-static font-semibold text-c-ink">
                Careers page
              </Link>
              , not this form.
            </p>
          </div>

          <div
            className={`${concept === "a" || concept === "d" ? "form-dark border border-c-line bg-white/[0.03]" : "tone-light"} rounded-[2rem] p-6 sm:p-10 lg:col-span-7`}
          >
            <h2 id="contact-form-heading" className="font-serif text-[clamp(2rem,1.5rem+2vw,3rem)] leading-tight text-c-ink">
              Send a message
            </h2>
            <p className="mb-8 mt-4">Fields marked “(required)” must be completed.</p>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
