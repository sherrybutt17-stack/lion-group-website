import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { services } from "@/content/services";
import { withConcept, type ConceptId } from "@/concepts/config";

/** Large editorial rows for the two services, with a sweep on hover/focus. */
export function ServiceIndex({ concept, headingLevel = "h3" }: { concept: ConceptId; headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel;
  return (
    <ul className="border-t border-c-line" data-reveal-group>
      {services.map((service, i) => (
        <li key={service.slug} className="index-row border-b border-c-line" data-reveal-item>
          <div className="grid gap-6 px-2 py-10 md:grid-cols-[4rem_1fr_auto] md:items-center md:gap-10 md:px-4 md:py-14 lg:grid-cols-[5rem_1.2fr_1fr_auto]">
            <span aria-hidden="true" className="font-ui text-sm font-semibold text-c-accent">
              0{i + 1}
            </span>
            <Heading className="index-title text-[clamp(2rem,1.2rem+3.4vw,4.25rem)] leading-[1.02] tracking-[-0.01em] text-c-ink">
              <Link prefetch={false} href={withConcept(concept, service.href)} className="after:absolute after:inset-0 after:content-['']">
                {service.name}
              </Link>
            </Heading>
            <p className="max-w-md text-c-muted md:col-start-2 lg:col-start-3">{service.card.summary}</p>
            <span
              aria-hidden="true"
              className="index-arrow hidden size-16 place-items-center rounded-full border border-c-line text-c-ink md:col-start-3 md:row-span-2 md:row-start-1 md:grid lg:col-start-4"
            >
              <ArrowRight className="size-6" strokeWidth={1.5} />
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
}
