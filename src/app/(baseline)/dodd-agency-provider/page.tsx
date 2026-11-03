import type { Metadata } from "next";
import { ServicePage } from "@/components/ServicePage";
import { doddAgencyProvider } from "@/content/services";

export const metadata: Metadata = {
  title: doddAgencyProvider.name,
  description: doddAgencyProvider.metaDescription,
  alternates: { canonical: doddAgencyProvider.href },
};

export default function DoddAgencyProviderPage() {
  return <ServicePage service={doddAgencyProvider} />;
}
