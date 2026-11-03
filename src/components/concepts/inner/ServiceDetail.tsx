import { Phone } from "lucide-react";
import type { ServiceContent } from "@/content/services";
import { site } from "@/content/site";
import { withConcept, type ConceptId } from "@/concepts/config";
import { ConceptButton } from "../ConceptButton";
import { ConceptPlaceholder } from "../ConceptPlaceholder";
import { ImagePlaceholder } from "../ImagePlaceholder";
import { SectionLabel } from "../SectionLabel";
import { ConceptCta } from "./ConceptCta";
import { ConceptFaq } from "./ConceptFaq";
import { PageHero } from "./PageHero";
import { h2Class } from "./styles";


export function ServiceDetail({ concept, service, index }: { concept: ConceptId; service: ServiceContent; index: number }) {
  const contactHref = withConcept(concept, `/contact-us/?service=${service.slug}`);
  const panel = concept === "b" ? "rounded-[2rem] bg-white px-6 py-14 sm:px-12 md:py-20" : "py-20 md:py-28";
  const outer = concept === "b" ? "px-3 pt-3" : "";

  return (
    <>
      <PageHero
        concept={concept}
        crumb={service.name}
        label={`Service 0${index + 1}`}
        title={service.name}
        lede={service.lede.text}
        actions={
          <>
            <ConceptButton href={contactHref} magnetic>
              Ask about {service.name}
            </ConceptButton>
            <ConceptButton href={site.contact.phoneHref} variant="ghost" icon={<Phone className="size-4" strokeWidth={2} />}>
              <span className="sr-only">Call </span>
              {site.contact.phoneDisplay}
            </ConceptButton>
          </>
        }
      />

      {/* Overview */}
      <section aria-labelledby="overview-heading" className={outer}>
        <div className={`${concept === "b" ? "mx-auto max-w-[90rem]" : ""} ${panel}`}>
          <div className="container-page grid gap-10 lg:grid-cols-12">
            <SectionLabel index="01" className="lg:col-span-3 lg:pt-3">
              Overview
            </SectionLabel>
            <div className="lg:col-span-9" data-reveal>
              <h2 id="overview-heading" className={`${h2Class[concept]} text-c-ink`}>
                About this service
              </h2>
              <div className="mt-8 max-w-[60ch] space-y-5 text-xl leading-relaxed">
                {service.about.paragraphs.map((p) => (
                  <p key={p}>{p}</p>
                ))}
                {service.about.placeholder && <ConceptPlaceholder>{service.about.placeholder}</ConceptPlaceholder>}
              </div>

              <h3 className="mt-16 font-ui text-sm font-semibold uppercase tracking-[0.16em] text-c-accent">Who this service is for</h3>
              <ul className="mt-6 grid gap-px overflow-hidden rounded-2xl border border-c-line bg-c-line sm:grid-cols-3" data-reveal-group>
                {service.audience.items.map((item, i) => (
                  <li key={item} className={`${concept === "b" ? "bg-white" : "bg-c-bg"} p-6`} data-reveal-item>
                    <span aria-hidden="true" className="font-ui text-sm font-semibold text-c-accent">
                      0{i + 1}
                    </span>
                    <p className="mt-3 font-serif text-xl leading-snug text-c-ink">{item}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Photography */}
      <div className={`container-page ${concept === "b" ? "py-3" : "pb-6"}`} data-reveal>
        <ImagePlaceholder
          label={index === 0 ? "Real photo of a program, home, or team member at work." : "Real photo of a planning or consulting session."}
          className="aspect-[4/3] rounded-[2rem] sm:aspect-[21/9]"
        />
      </div>

      {/* Offerings */}
      <section aria-labelledby="offerings-heading" className={`${concept === "a" || concept === "d" ? "bg-noir-warm" : concept === "c" ? "tone-light" : ""} ${outer}`}>
        <div className={`${concept === "b" ? "mx-auto max-w-[90rem] rounded-[2rem] bg-c-bg-alt px-6 py-14 sm:px-12 md:py-20" : "py-20 md:py-28"}`}>
          <div className="container-page grid gap-10 lg:grid-cols-12">
            <SectionLabel index="02" className="lg:col-span-3 lg:pt-3">
              {index === 0 ? "Supports" : "Scope"}
            </SectionLabel>
            <div className="lg:col-span-9">
              <h2 id="offerings-heading" className={`${h2Class[concept]} text-c-ink`} data-reveal>
                {service.offerings.heading}
              </h2>
              <ol className="mt-12 grid gap-x-10 md:grid-cols-2" data-reveal-group>
                {service.offerings.items.map((item, i) => (
                  <li key={item.title} className="border-t border-c-line py-8" data-reveal-item>
                    <span aria-hidden="true" className="font-ui text-sm font-semibold text-c-accent">
                      0{i + 1}
                    </span>
                    <h3 className="mt-3 font-serif text-2xl leading-snug text-c-ink">{item.title}</h3>
                    <p className="mt-2 text-lg">{item.text}</p>
                  </li>
                ))}
              </ol>
              {service.offerings.placeholder && <ConceptPlaceholder className="mt-4">{service.offerings.placeholder}</ConceptPlaceholder>}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section aria-labelledby="faq-heading" className={outer}>
        <div className={`${concept === "b" ? "mx-auto max-w-[90rem]" : ""} ${panel}`}>
          <div className="container-page grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <SectionLabel index="03">Questions</SectionLabel>
              <h2 id="faq-heading" className={`${h2Class[concept]} mt-5 text-c-ink`}>
                Frequently asked questions
              </h2>
            </div>
            <div className="lg:col-span-8">
              <ConceptFaq items={service.faqs} />
            </div>
          </div>
        </div>
      </section>

      <ConceptCta concept={concept} heading={service.cta.heading} text={service.cta.text} href={`/contact-us/?service=${service.slug}`} />
    </>
  );
}
