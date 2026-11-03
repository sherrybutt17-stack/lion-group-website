import type { Metadata } from "next";
import { ServiceDetail } from "@/components/concepts/inner/ServiceDetail";
import { healthCareConsultant } from "@/content/services";
import { conceptTitle, resolveConcept, type ConceptParams } from "../params";

export async function generateMetadata({ params }: ConceptParams): Promise<Metadata> {
  return { title: await conceptTitle(params, healthCareConsultant.name), description: healthCareConsultant.metaDescription };
}

export default async function Page({ params }: ConceptParams) {
  return <ServiceDetail concept={await resolveConcept(params)} service={healthCareConsultant} index={1} />;
}
