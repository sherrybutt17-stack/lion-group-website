import type { Metadata } from "next";
import { AboutDetail } from "@/components/concepts/inner/AboutDetail";
import { conceptTitle, resolveConcept, type ConceptParams } from "../params";

export async function generateMetadata({ params }: ConceptParams): Promise<Metadata> {
  return { title: await conceptTitle(params, "About") };
}

export default async function Page({ params }: ConceptParams) {
  return <AboutDetail concept={await resolveConcept(params)} />;
}
