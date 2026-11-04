// Design directions for client review. Each active concept renders the full
// site under its own prefix; the root is a chooser between them.
// The user shortlisted A (Heritage) and D (Gilded) on 2026-11-03, then asked on
// 2026-11-04 for all five to go back on GitHub. Remove an id from `active` to
// switch a concept off; its code can stay.

export type ConceptId = "a" | "b" | "c" | "d" | "e";

export interface Concept {
  id: ConceptId;
  name: string;
  summary: string;
}

export const allConcepts: Concept[] = [
  { id: "a", name: "Heritage", summary: "Black and gold, editorial serif, gold light rays and a mane-ray lion, gradients throughout." },
  { id: "b", name: "Daylight", summary: "Warm, light and welcoming. Bento layout, soft surfaces, calm motion." },
  { id: "c", name: "Momentum", summary: "Bold and kinetic. High contrast, big type, stacked panels and scroll-driven motion." },
  { id: "d", name: "Gilded", summary: "Black and molten gold. Cinematic hero, a liquid-metal lion, glass panels, gradients throughout." },
  { id: "e", name: "Atelier", summary: "Printed editorial. Paper, ink rules, animated gold topography and a halftone portrait." },
];

const active: ConceptId[] = ["a", "b", "c", "d", "e"];

/** Concepts currently built and shown in the design chooser. */
export const concepts = allConcepts.filter((c) => active.includes(c.id));

export const isConceptId = (value: string): value is ConceptId => concepts.some((c) => c.id === value);

export const getConcept = (id: ConceptId) => allConcepts.find((c) => c.id === id)!;

/** Prefix a site path ("/careers/") with a concept ("/a/careers/"). Anchors and external links pass through. */
export function withConcept(concept: ConceptId, href: string) {
  if (!href.startsWith("/")) return href;
  return href === "/" ? `/${concept}/` : `/${concept}${href}`;
}

/** Strip a concept prefix to get the shared site path. */
export function stripConcept(pathname: string) {
  const match = pathname.match(/^\/([a-e])(\/.*)?$/);
  if (!match) return pathname || "/";
  return match[2] && match[2] !== "/" ? match[2] : "/";
}
