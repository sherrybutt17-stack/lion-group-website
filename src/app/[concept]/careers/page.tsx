import type { Metadata } from "next";
import { CareersDetail } from "@/components/concepts/inner/CareersDetail";
import { careers } from "@/content/careers";
import { conceptTitle, resolveConcept, type ConceptParams } from "../params";

export async function generateMetadata({ params }: ConceptParams): Promise<Metadata> {
  return { title: await conceptTitle(params, "Careers"), description: careers.metaDescription };
}

export default async function Page({ params }: ConceptParams) {
  return <CareersDetail concept={await resolveConcept(params)} />;
}
