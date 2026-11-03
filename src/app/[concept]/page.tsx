import type { Metadata } from "next";
import { HomeA } from "@/components/concepts/HomeA";
import { HomeB } from "@/components/concepts/HomeB";
import { HomeC } from "@/components/concepts/HomeC";
import { HomeD } from "@/components/concepts/HomeD";
import { HomeE } from "@/components/concepts/HomeE";
import { conceptTitle, resolveConcept, type ConceptParams } from "./params";

export async function generateMetadata({ params }: ConceptParams): Promise<Metadata> {
  return { title: await conceptTitle(params, "Home") };
}

export default async function ConceptHome({ params }: ConceptParams) {
  const concept = await resolveConcept(params);
  if (concept === "a") return <HomeA />;
  if (concept === "b") return <HomeB />;
  if (concept === "c") return <HomeC />;
  if (concept === "d") return <HomeD />;
  return <HomeE />;
}
