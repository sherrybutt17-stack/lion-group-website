import { site } from "@/content/site";
import { withConcept, type ConceptId } from "@/concepts/config";
import { ConceptButton } from "../ConceptButton";

/** Closing call to action, styled per concept. */
export function ConceptCta({ concept, heading, text, href = "/contact-us/" }: { concept: ConceptId; heading: string; text: string; href?: string }) {
  const dark = concept === "a" || concept === "d";
  const tone = dark ? "bg-noir-cta border-y border-c-line" : concept === "b" ? "tone-brown" : "tone-gold";
  const titleClass =
    concept === "c"
      ? "font-ui font-semibold uppercase tracking-[-0.035em] text-[clamp(2.25rem,1.2rem+3.6vw,4.75rem)] leading-[0.92]"
      : "font-serif text-[clamp(2.25rem,1.3rem+3.4vw,4.5rem)] leading-[1.02] tracking-[-0.02em]";

  return (
    <section aria-labelledby="cta-heading" className={concept === "b" ? "px-3 pb-3" : ""}>
      <div className={`${tone} ${concept === "b" ? "mx-auto max-w-[90rem] rounded-[2rem]" : ""} overflow-hidden py-20 md:py-28`}>
        <div className="container-page grid gap-10 lg:grid-cols-12 lg:items-end" data-reveal>
          <div className="lg:col-span-8">
            <h2 id="cta-heading" className={`${titleClass} ${dark ? "text-gradient-gold" : "text-c-ink"}`}>
              {heading}
            </h2>
            <p className="mt-5 max-w-xl text-lg">{text}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:col-span-4 lg:justify-end">
            <ConceptButton href={withConcept(concept, href)} magnetic>
              Contact us
            </ConceptButton>
            <ConceptButton href={site.contact.phoneHref} variant="ghost">
              <span className="sr-only">Call </span>
              {site.contact.phoneDisplay}
            </ConceptButton>
          </div>
        </div>
      </div>
    </section>
  );
}
