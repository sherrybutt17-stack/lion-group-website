import Link from "next/link";
import { ArrowRight, BriefcaseBusiness } from "lucide-react";
import { CtaBand } from "@/components/CtaBand";
import { Picture } from "@/components/Picture";
import { Principles } from "@/components/Principles";
import { ReviewFlag, ReviewNote } from "@/components/ReviewFlag";
import { SectionHeading } from "@/components/SectionHeading";
import { ServiceCard } from "@/components/ServiceCard";
import { services } from "@/content/services";
import { site } from "@/content/site";

export default function HomePage() {
  return (
    <>
      <section aria-labelledby="hero-heading" className="overflow-hidden border-b border-line bg-paper">
        <div className="container-page grid items-center gap-12 py-14 md:grid-cols-[1.35fr_1fr] md:py-20 lg:py-24">
          <div>
            <p className="eyebrow">
              {site.name} · {site.contact.city}, {site.contact.regionName}
            </p>
            <h1 id="hero-heading" className="mt-4 text-display">
              Support for developmental disability services and health care consulting.
            </h1>
            <p className="mt-6 max-w-[56ch] text-lede">
              The Lion Group partners with families, counties, and organizations. Explore our two services, or contact
              us to talk through your situation.
            </p>
            <ReviewFlag kind="draft" className="mt-4" />
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link prefetch={false} href="/contact-us/" className="btn btn-primary">
                Contact The Lion Group
              </Link>
              <a href="#services" className="btn btn-secondary">
                Explore our services
              </a>
            </div>
          </div>

          <div aria-hidden="true" className="flex justify-center md:justify-end" data-reveal>
            <div className="brand-blob flex aspect-square w-52 flex-col items-center justify-center gap-3 bg-brown-900 p-8 sm:w-64 lg:w-80">
              <Picture
                name="logo-lion-L"
                alt=""
                sizes="(min-width: 1024px) 176px, (min-width: 640px) 136px, 104px"
                priority
                className="h-auto w-[6.5rem] sm:w-[8.5rem] lg:w-44"
              />
              <p className="text-center font-serif text-sm leading-snug text-gold-200 sm:text-base lg:text-lg">
                {site.tagline}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="services" aria-labelledby="services-heading" className="py-16 md:py-24" data-reveal>
        <div className="container-page">
          <SectionHeading
            id="services-heading"
            eyebrow="Our services"
            title="How The Lion Group can help"
            intro="The Lion Group offers two services. Each has its own page explaining what it covers, who it's for, and how to get in touch."
          />
          <ul className="mt-10 grid gap-6 md:grid-cols-2">
            {services.map((service) => (
              <li key={service.slug}>
                <ServiceCard service={service} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="approach-heading" className="bg-mist py-16 md:py-24" data-reveal>
        <div className="container-page">
          <SectionHeading id="approach-heading" eyebrow="Our approach" title={site.tagline} />
          <div className="mt-10">
            <Principles />
          </div>
        </div>
      </section>

      <section aria-labelledby="about-heading" className="py-16 md:py-24" data-reveal>
        <div className="container-page grid items-center gap-10 md:grid-cols-[minmax(0,22rem)_1fr] lg:gap-16">
          <Picture
            name="ceo-portrait-gold"
            alt="Dr. Romey Coles Jr., President and CEO of The Lion Group"
            sizes="(min-width: 768px) 352px, 80vw"
            className="mx-auto h-auto w-full max-w-[22rem]"
          />
          <div>
            <p className="eyebrow">About The Lion Group</p>
            <h2 id="about-heading" className="mt-3 text-title">
              Who we are
            </h2>
            <div className="prose-body mt-5 max-w-[60ch]">
              <p>
                The Lion Group is led by President and CEO Dr. Romey Coles Jr. Having been personally touched by the
                challenges of autism and special needs, he leads The Lion Group&apos;s work to make a positive impact in
                these areas.
              </p>
            </div>
            <ReviewFlag kind="draft" className="mt-4" />
            <div className="mt-5 max-w-[60ch]">
              <ReviewNote title="Confirm leadership details">
                Confirm the “Dr.” title, the bio wording, and approval to use this portrait.
              </ReviewNote>
            </div>
            <Link prefetch={false} href="/about-us/" className="text-link mt-6 inline-flex min-h-11 items-center gap-2">
              More about The Lion Group
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      <section aria-labelledby="careers-heading" className="pb-16 md:pb-24" data-reveal>
        <div className="container-page">
          <div className="flex flex-col gap-8 rounded-3xl border border-line bg-paper p-8 md:flex-row md:items-center md:justify-between md:p-12">
            <div className="flex gap-5">
              <span className="hidden size-14 shrink-0 place-items-center rounded-full bg-gold-50 text-gold-700 sm:grid">
                <BriefcaseBusiness aria-hidden="true" className="size-7" strokeWidth={1.75} />
              </span>
              <div className="max-w-xl">
                <p className="eyebrow">Careers</p>
                <h2 id="careers-heading" className="mt-2 text-title">
                  Interested in working with The Lion Group?
                </h2>
                <p className="mt-3">
                  Submit your information through our application form. The Lion Group reviews applications and contacts
                  shortlisted candidates about next steps.
                </p>
                <ReviewFlag kind="draft" className="mt-4" />
              </div>
            </div>
            <Link prefetch={false} href="/careers/" className="btn btn-primary md:shrink-0">
              View careers and apply
            </Link>
          </div>
        </div>
      </section>

      <CtaBand
        heading="Talk with The Lion Group"
        text="Call, email, or send a message to ask about DODD Agency Provider or Health Care Consultant."
      />
    </>
  );
}
