import type { Metadata } from "next";
import { ServiceDetail } from "@/components/concepts/inner/ServiceDetail";
import { doddAgencyProvider } from "@/content/services";
import { conceptTitle, resolveConcept, type ConceptParams } from "../params";

export async function generateMetadata({ params }: ConceptParams): Promise<Metadata> {
  return { title: await conceptTitle(params, doddAgencyProvider.name), description: doddAgencyProvider.metaDescription };
}

export default async function Page({ params }: ConceptParams) {
  return <ServiceDetail concept={await resolveConcept(params)} service={doddAgencyProvider} index={0} />;
}
