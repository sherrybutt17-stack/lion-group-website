import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CareersForm } from "@/components/forms/CareersForm";
import { Placeholder, ReviewFlag, ReviewNote } from "@/components/ReviewFlag";
import { careers } from "@/content/careers";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Careers",
  description: careers.metaDescription,
  alternates: { canonical: "/careers/" },
};

export default function CareersPage() {
  return (
    <>
      <section aria-labelledby="page-title" className="border-b border-line bg-paper">
        <div className="container-page py-12 md:py-16">
          <Breadcrumbs current="Careers" />
          <p className="eyebrow mt-8">Careers</p>
          <h1 id="page-title" className="mt-3 max-w-3xl text-display">
            Careers at The Lion Group
          </h1>
          <p className="mt-5 max-w-[60ch] text-lede">{careers.lede}</p>
          <ReviewFlag kind="draft" className="mt-4" />
          <div className="mt-8">
            <a href="#apply-heading" className="btn btn-primary">
              Go to the application form
            </a>
          </div>
        </div>
      </section>

      <section aria-labelledby="process-heading" className="py-16 md:py-20" data-reveal>
        <div className="container-page">
          <div className="max-w-2xl">
            <h2 id="process-heading" className="text-title">
              How applications work
            </h2>
            <p className="mt-4">
              The Lion Group handles every step after you apply, including screening and hiring decisions.
            </p>
          </div>
          <ol className="mt-10 grid gap-6 md:grid-cols-3">
            {careers.steps.map((step, index) => (
              <li key={step.title} className="rounded-2xl border border-line bg-white p-6">
                <span
                  aria-hidden="true"
                  className="grid size-10 place-items-center rounded-full bg-brown-900 font-ui font-semibold text-gold-200"
                >
                  {index + 1}
                </span>
                <h3 className="mt-4 font-serif text-xl leading-snug">
                  <span className="sr-only">Step {index + 1}: </span>
                  {step.title}
                </h3>
                <p className="mt-2">{step.text}</p>
              </li>
            ))}
          </ol>
          <p className="mt-6 max-w-[65ch] font-semibold text-ink">{careers.noGuarantee}</p>
          <ReviewFlag kind="draft" className="mt-4" />
        </div>
      </section>

      <section aria-labelledby="openings-heading" className="bg-mist py-16 md:py-20" data-reveal>
        <div className="container-page">
          <h2 id="openings-heading" className="text-title">
            Open positions
          </h2>
          <div className="mt-6 max-w-3xl space-y-4">
            <Placeholder>{careers.openingsPlaceholder}</Placeholder>
            <p>{careers.openingsFallback}</p>
          </div>
        </div>
      </section>

      <section aria-labelledby="apply-heading" className="py-16 md:py-20">
        <div className="container-page grid gap-12 lg:grid-cols-[1fr_20rem] lg:gap-16">
          <div className="max-w-3xl">
            <h2 id="apply-heading" className="text-title">
              Apply
            </h2>
            <p className="mt-4 mb-8">
              Fields marked “(required)” must be completed. Please don&apos;t include your Social Security number or
              other sensitive details.
            </p>
            <ReviewNote title="Form fields and destination">
              Fields are a shortened version of the current PDF application. Confirm the final fields, where
              applications are sent, and how resumes are stored before this form is connected.
            </ReviewNote>
            <div className="mt-8">
              <CareersForm />
            </div>
          </div>

          <aside aria-labelledby="privacy-heading" className="self-start rounded-2xl border border-line bg-paper p-6 lg:sticky lg:top-6">
            <h2 id="privacy-heading" className="font-serif text-2xl">
              How your information is used
            </h2>
            <dl className="mt-5 space-y-5 text-[0.9375rem]">
              {careers.privacy.map((item) => (
                <div key={item.term}>
                  <dt className="font-ui font-semibold text-ink">{item.term}</dt>
                  <dd className={`mt-1 ${item.placeholder ? "placeholder-text text-[0.875rem]" : ""}`}>{item.detail}</dd>
                </div>
              ))}
              <div>
                <dt className="font-ui font-semibold text-ink">Questions or removal requests</dt>
                <dd className="mt-1">
                  Contact The Lion Group at{" "}
                  <a href={`mailto:${site.contact.email}`} className="text-link [overflow-wrap:anywhere]">
                    {site.contact.email}
                  </a>{" "}
                  or{" "}
                  <a href={site.contact.phoneHref} className="text-link whitespace-nowrap">
                    {site.contact.phoneDisplay}
                  </a>
                  .
                </dd>
              </div>
            </dl>
            <ReviewFlag kind="placeholder" className="mt-5" />
            <p className="mt-6 border-t border-line pt-5 text-[0.9375rem]">{careers.eeo}</p>
            <ReviewFlag kind="draft" className="mt-3" />
          </aside>
        </div>
      </section>
    </>
  );
}
