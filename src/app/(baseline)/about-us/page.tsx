import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CtaBand } from "@/components/CtaBand";
import { Picture } from "@/components/Picture";
import { Principles } from "@/components/Principles";
import { ReviewFlag, ReviewNote } from "@/components/ReviewFlag";
import { SectionHeading } from "@/components/SectionHeading";
import { ServiceCard } from "@/components/ServiceCard";
import { services } from "@/content/services";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "About The Lion Group in Cleveland, Ohio: led by President and CEO Dr. Romey Coles Jr. and guided by advocacy, independence, and support.",
  alternates: { canonical: "/about-us/" },
};

export default function AboutPage() {
  return (
    <>
      <section aria-labelledby="page-title" className="border-b border-line bg-paper">
        <div className="container-page py-12 md:py-16">
          <Breadcrumbs current="About" />
          <p className="eyebrow mt-8">About us</p>
          <h1 id="page-title" className="mt-3 max-w-3xl text-display">
            About The Lion Group
          </h1>
          <p className="mt-5 max-w-[60ch] text-lede">
            The Lion Group offers two services, DODD Agency Provider and Health Care Consultant. Our work is guided by
            three principles: advocacy, independence, and support.
          </p>
          <ReviewFlag kind="draft" className="mt-4" />
        </div>
      </section>

      <section aria-labelledby="leadership-heading" className="py-16 md:py-20" data-reveal>
        <div className="container-page grid items-center gap-10 md:grid-cols-[minmax(0,22rem)_1fr] lg:gap-16">
          <Picture
            name="ceo-portrait-gold"
            alt="Dr. Romey Coles Jr., President and CEO of The Lion Group"
            sizes="(min-width: 768px) 352px, 80vw"
            className="mx-auto h-auto w-full max-w-[22rem]"
          />
          <div>
            <p className="eyebrow">Leadership</p>
            <h2 id="leadership-heading" className="mt-3 text-title">
              Dr. Romey Coles Jr.
            </h2>
            <p className="mt-1 font-ui font-semibold text-ink">President and CEO</p>
            <div className="prose-body mt-5 max-w-[60ch]">
              <p>
                Dr. Romey Coles Jr. leads The Lion Group with integrity and insight. Having been personally touched by
                the challenges of autism and special needs, he is focused on making a positive impact in these areas
                through effective services.
              </p>
            </div>
            <ReviewFlag kind="draft" className="mt-4" />
            <div className="mt-5 max-w-[60ch]">
              <ReviewNote title="Confirm leadership details">
                Confirm the “Dr.” title, the bio wording, and approval to use this portrait. The current site&apos;s bio
                also mentions services that are no longer offered; those references have been removed.
              </ReviewNote>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="approach-heading" className="bg-mist py-16 md:py-20" data-reveal>
        <div className="container-page">
          <SectionHeading id="approach-heading" eyebrow="Our approach" title={site.tagline} />
          <div className="mt-10">
            <Principles />
          </div>
        </div>
      </section>

      <section aria-labelledby="services-heading" className="py-16 md:py-20" data-reveal>
        <div className="container-page">
          <SectionHeading id="services-heading" eyebrow="Our services" title="What we offer" />
          <ul className="mt-10 grid gap-6 md:grid-cols-2">
            {services.map((service) => (
              <li key={service.slug}>
                <ServiceCard service={service} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand
        heading="Talk with The Lion Group"
        text="Call, email, or send a message to ask about DODD Agency Provider or Health Care Consultant."
      />
    </>
  );
}
