import Link from "next/link";
import { Check, Phone } from "lucide-react";
import type { ServiceContent } from "@/content/services";
import { site } from "@/content/site";
import { Breadcrumbs } from "./Breadcrumbs";
import { CtaBand } from "./CtaBand";
import { Faq } from "./Faq";
import { Placeholder, ReviewFlag, ReviewNote } from "./ReviewFlag";
import { ServiceIcon } from "./ServiceIcon";

/** Shared layout for the two service pages; copy comes from src/content/services.ts. */
export function ServicePage({ service }: { service: ServiceContent }) {
  const { about, audience, offerings } = service;
  const contactHref = `/contact-us/?service=${service.slug}`;

  return (
    <>
      <section aria-labelledby="page-title" className="border-b border-line bg-paper">
        <div className="container-page grid items-center gap-10 py-12 md:grid-cols-[1fr_auto] md:py-16">
          <div className="max-w-3xl">
            <Breadcrumbs current={service.name} />
            <p className="eyebrow mt-8">Service</p>
            <h1 id="page-title" className="mt-3 text-display">
              {service.name}
            </h1>
            <p className="mt-5 max-w-[60ch] text-lede">{service.lede.text}</p>
            <ReviewFlag kind={service.lede.review} className="mt-4" />
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link prefetch={false} href={contactHref} className="btn btn-primary">
                Ask about {service.name}
              </Link>
              <a href={site.contact.phoneHref} className="btn btn-secondary">
                <Phone aria-hidden="true" className="size-4" />
                <span>
                  <span className="sr-only">Call </span>
                  {site.contact.phoneDisplay}
                </span>
              </a>
            </div>
          </div>
          <div aria-hidden="true" className="hidden md:block" data-reveal>
            <div className="brand-blob grid size-56 place-items-center bg-brown-900 text-gold-400 lg:size-64">
              <ServiceIcon name={service.icon} className="size-24" />
            </div>
          </div>
        </div>
      </section>

      {service.reviewNotes.length > 0 && (
        <div className="container-page mt-10 space-y-4">
          {service.reviewNotes.map((note) => (
            <ReviewNote key={note.title} title={note.title}>
              {note.body}
            </ReviewNote>
          ))}
        </div>
      )}

      <section aria-labelledby="about-heading" className="py-16 md:py-20" data-reveal>
        <div className="container-page grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          <div>
            <h2 id="about-heading" className="text-title">
              About this service
            </h2>
            <div className="prose-body mt-5 max-w-[65ch]">
              {about.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
              {about.placeholder && <Placeholder>{about.placeholder}</Placeholder>}
            </div>
            <ReviewFlag kind={about.review} className="mt-5" />
          </div>
          <div className="self-start rounded-2xl border border-line bg-white p-6 sm:p-8">
            <h2 className="font-serif text-2xl">Who this service is for</h2>
            <p className="mt-3">{audience.intro}</p>
            <ul className="mt-4 space-y-3">
              {audience.items.map((item) => (
                <li key={item} className="flex gap-3">
                  <Check aria-hidden="true" className="mt-1 size-5 shrink-0 text-gold-700" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <ReviewFlag kind={audience.review} className="mt-5" />
          </div>
        </div>
      </section>

      <section aria-labelledby="offerings-heading" className="bg-mist py-16 md:py-20" data-reveal>
        <div className="container-page">
          <div className="max-w-2xl">
            <h2 id="offerings-heading" className="text-title">
              {offerings.heading}
            </h2>
            <p className="mt-4">{offerings.intro}</p>
            <ReviewFlag kind={offerings.review} className="mt-4" />
          </div>
          <div className="mt-6 max-w-3xl">
            <ReviewNote title="Confirm scope">{offerings.reviewNote}</ReviewNote>
          </div>
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {offerings.items.map((item) => (
              <li key={item.title} className="rounded-2xl border border-line bg-white p-6">
                <h3 className="font-serif text-xl leading-snug">{item.title}</h3>
                <p className="mt-2">{item.text}</p>
              </li>
            ))}
          </ul>
          {offerings.placeholder && (
            <div className="mt-5 max-w-3xl">
              <Placeholder>{offerings.placeholder}</Placeholder>
            </div>
          )}
        </div>
      </section>

      <section aria-labelledby="faq-heading" className="py-16 md:py-20" data-reveal>
        <div className="container-page grid gap-10 lg:grid-cols-[1fr_2fr] lg:gap-16">
          <div>
            <h2 id="faq-heading" className="text-title">
              Frequently asked questions
            </h2>
            <p className="mt-4">
              Don&apos;t see your question?{" "}
              <Link prefetch={false} href={contactHref} className="text-link">
                Contact The Lion Group
              </Link>
              .
            </p>
          </div>
          <Faq items={service.faqs} />
        </div>
      </section>

      <CtaBand heading={service.cta.heading} text={service.cta.text} href={contactHref} buttonLabel="Contact us" />
    </>
  );
}
