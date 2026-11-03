import { ChevronDown } from "lucide-react";
import type { Faq as FaqItem } from "@/content/services";
import { ReviewFlag } from "./ReviewFlag";

/** Native <details> accordion: keyboard accessible and works without JavaScript. */
export function Faq({ items }: { items: FaqItem[] }) {
  return (
    <div className="divide-y divide-line rounded-2xl border border-line bg-white">
      {items.map((item) => {
        const isPlaceholder = item.review === "placeholder";
        return (
          <details key={item.question} className="group px-5 sm:px-7">
            <summary className="flex min-h-14 items-center justify-between gap-4 py-4 font-ui text-[1.0625rem] font-semibold text-ink">
              <span>{item.question}</span>
              <ChevronDown
                aria-hidden="true"
                className="size-5 shrink-0 text-gold-700 transition-transform duration-200 group-open:rotate-180"
              />
            </summary>
            <div className="pb-5">
              <p className={isPlaceholder ? "placeholder-text" : "max-w-[65ch]"}>{item.answer}</p>
              <ReviewFlag kind={item.review} className="mt-3" />
            </div>
          </details>
        );
      })}
    </div>
  );
}
