import type { Metadata } from "next";
import { ServicePage } from "@/components/ServicePage";
import { healthCareConsultant } from "@/content/services";

export const metadata: Metadata = {
  title: healthCareConsultant.name,
  description: healthCareConsultant.metaDescription,
  alternates: { canonical: healthCareConsultant.href },
};

export default function HealthCareConsultantPage() {
  return <ServicePage service={healthCareConsultant} />;
}
