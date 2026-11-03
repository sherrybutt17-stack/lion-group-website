import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ServiceContent } from "@/content/services";
import { ReviewFlag } from "./ReviewFlag";
import { ServiceIcon } from "./ServiceIcon";

/** Whole card is clickable through the single descriptive link (stretched link pattern). */
export function ServiceCard({ service, headingLevel = "h3" }: { service: ServiceContent; headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel;
  return (
    <article className="card-interactive relative flex h-full flex-col rounded-2xl border border-line bg-white p-7 sm:p-8">
      <span className="grid size-14 place-items-center rounded-full bg-gold-50 text-gold-700">
        <ServiceIcon name={service.icon} className="size-7" />
      </span>
      <Heading className="mt-6 text-[1.625rem] leading-tight">{service.name}</Heading>
      <p className="mt-3 flex-1">{service.card.summary}</p>
      <ReviewFlag kind={service.card.review} className="mt-4 self-start" />
      <Link
        prefetch={false}
        href={service.href}
        className="text-link mt-6 inline-flex min-h-11 items-center gap-2 self-start after:absolute after:inset-0 after:rounded-2xl after:content-['']"
      >
        Learn about {service.name}
        <ArrowRight aria-hidden="true" className="size-4" />
      </Link>
    </article>
  );
}
