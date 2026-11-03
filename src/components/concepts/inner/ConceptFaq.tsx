import { Plus } from "lucide-react";
import type { Faq } from "@/content/services";
import { ConceptPlaceholder } from "../ConceptPlaceholder";

/** Accordion on native <details>: keyboard accessible and works without JS. */
export function ConceptFaq({ items }: { items: Faq[] }) {
  return (
    <div className="border-t border-c-line">
      {items.map((item) => (
        <details key={item.question} className="group border-b border-c-line">
          <summary className="flex min-h-16 items-center justify-between gap-6 py-6 font-serif text-[clamp(1.25rem,1.05rem+0.6vw,1.625rem)] leading-snug text-c-ink">
            <span>{item.question}</span>
            <span
              aria-hidden="true"
              className="grid size-11 shrink-0 place-items-center rounded-full border border-c-line text-c-ink transition-[transform,background-color,color] duration-300 group-open:rotate-45 group-open:bg-c-accent group-open:text-c-on-accent"
            >
              <Plus className="size-5" strokeWidth={1.75} />
            </span>
          </summary>
          <div className="pb-8 pr-16">
            {item.placeholder ? (
              <ConceptPlaceholder>{item.answer}</ConceptPlaceholder>
            ) : (
              <p className="max-w-[62ch] text-lg">{item.answer}</p>
            )}
          </div>
        </details>
      ))}
    </div>
  );
}
