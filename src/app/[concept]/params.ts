import { notFound } from "next/navigation";
import { getConcept, isConceptId, type ConceptId } from "@/concepts/config";

export type ConceptParams = { params: Promise<{ concept: string }> };

export async function resolveConcept(params: ConceptParams["params"]): Promise<ConceptId> {
  const { concept } = await params;
  if (!isConceptId(concept)) notFound();
  return concept;
}

export async function conceptTitle(params: ConceptParams["params"], page: string) {
  const id = await resolveConcept(params);
  return `${page} · Concept ${id.toUpperCase()} ${getConcept(id).name}`;
}
