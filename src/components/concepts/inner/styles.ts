import type { ConceptId } from "@/concepts/config";

/** Section heading style per concept, shared by the inner page templates. */
export const h2Class: Record<ConceptId, string> = {
  a: "font-serif text-[clamp(2.25rem,1.4rem+3vw,4rem)] leading-[1.05] tracking-[-0.02em]",
  b: "font-serif text-[clamp(2.25rem,1.5rem+2.6vw,3.75rem)] leading-[1.05] tracking-[-0.02em]",
  c: "font-ui font-semibold uppercase tracking-[-0.035em] text-[clamp(2.25rem,1.2rem+3.6vw,4.5rem)] leading-[0.92]",
  d: "font-serif text-[clamp(2.25rem,1.4rem+3vw,4.25rem)] leading-[1.04] tracking-[-0.02em]",
  e: "font-serif text-[clamp(2.5rem,1.5rem+3.4vw,4.75rem)] leading-[0.98] tracking-[-0.03em]",
};
