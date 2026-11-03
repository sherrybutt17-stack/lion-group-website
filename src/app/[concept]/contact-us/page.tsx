import type { Metadata } from "next";
import { ContactDetail } from "@/components/concepts/inner/ContactDetail";
import { conceptTitle, resolveConcept, type ConceptParams } from "../params";

export async function generateMetadata({ params }: ConceptParams): Promise<Metadata> {
  return { title: await conceptTitle(params, "Contact") };
}

export default async function Page({ params }: ConceptParams) {
  return <ContactDetail concept={await resolveConcept(params)} />;
}
