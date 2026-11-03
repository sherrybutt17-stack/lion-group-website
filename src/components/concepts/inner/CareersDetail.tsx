import { careers } from "@/content/careers";
import { site } from "@/content/site";
import type { ConceptId } from "@/concepts/config";
import { ConceptButton } from "../ConceptButton";
import { SectionLabel } from "../SectionLabel";
import { CareersForm } from "../../forms/CareersForm";
import { PageHero } from "./PageHero";
import { h2Class } from "./styles";


export function CareersDetail({ concept }: { concept: ConceptId }) {
  const outer = concept === "b" ? "px-3 pt-3" : "";
  const inner = concept === "b" ? "mx-auto max-w-[90rem] rounded-[2rem] bg-white px-6 py-14 sm:px-12 md:py-20" : "py-20 md:py-28";

  return (
    <>
      <PageHero
        concept={concept}
        crumb="Careers"
        label="Careers"
        title="Careers at The Lion Group"
        lede={careers.lede}
        actions={<ConceptButton href="#apply-heading">Go to the application</ConceptButton>}
      />

      <section aria-labelledby="process-heading" className={outer}>
        <div className={inner}>
          <div className="container-page">
            <div className="grid gap-8 lg:grid-cols-12">
              <SectionLabel index="01" className="lg:col-span-3 lg:pt-3">
                Process
              </SectionLabel>
              <div className="lg:col-span-9" data-reveal>
                <h2 id="process-heading" className={`${h2Class[concept]} text-c-ink`}>
                  How applications work
                </h2>
                <p className="mt-5 max-w-xl text-lg">The Lion Group handles every step after you apply, including screening and hiring decisions.</p>
              </div>
            </div>
            <ol className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-c-line bg-c-line md:grid-cols-3" data-reveal-group>
              {careers.steps.map((step, i) => (
                <li key={step.title} className={`${concept === "b" ? "bg-white" : "bg-c-bg"} p-8`} data-reveal-item>
                  <span aria-hidden="true" className="font-serif text-5xl italic text-c-accent">
                    {i + 1}
                  </span>
                  <h3 className="mt-6 font-serif text-2xl leading-snug text-c-ink">
                    <span className="sr-only">Step {i + 1}: </span>
                    {step.title}
                  </h3>
                  <p className="mt-3">{step.text}</p>
                </li>
              ))}
            </ol>
            <p className="mt-8 text-lg font-semibold text-c-ink">{careers.noGuarantee}</p>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="openings-heading"
        className={concept === "b" ? "px-3 pt-3" : concept === "a" || concept === "d" ? "bg-noir-warm" : "bg-c-bg-alt"}
      >
        <div className={concept === "b" ? "mx-auto max-w-[90rem] rounded-[2rem] bg-c-bg-alt px-6 py-14 sm:px-12 md:py-20" : "py-20 md:py-28"}>
          <div className="container-page grid gap-8 lg:grid-cols-12">
            <SectionLabel index="02" className="lg:col-span-3 lg:pt-3">
              Openings
            </SectionLabel>
            <div className="lg:col-span-9" data-reveal>
              <h2 id="openings-heading" className={`${h2Class[concept]} text-c-ink`}>
                Open positions
              </h2>
              <p className="mt-8 text-lg">{careers.openingsFallback}</p>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="apply-heading" className={concept === "b" ? "px-3 py-3" : "py-20 md:py-28"}>
        <div className="container-page grid gap-10 lg:grid-cols-12">
          <div
            className={`${concept === "a" || concept === "d" ? "form-dark border border-c-line bg-white/[0.03]" : "tone-light"} rounded-[2rem] p-6 sm:p-10 lg:col-span-8`}
          >
            <h2 id="apply-heading" className="font-serif text-[clamp(2rem,1.5rem+2vw,3rem)] leading-tight text-c-ink">
              Apply
            </h2>
            <p className="mb-8 mt-4">
              Fields marked “(required)” must be completed. Please don&apos;t include your Social Security number or other sensitive
              details.
            </p>
            <CareersForm />
          </div>

          <aside aria-labelledby="privacy-heading" className="self-start rounded-[2rem] border border-c-line p-6 sm:p-8 lg:sticky lg:top-28 lg:col-span-4">
            <h2 id="privacy-heading" className="font-serif text-2xl text-c-ink">
              How your information is used
            </h2>
            <dl className="mt-6 space-y-6">
              {careers.privacy.map((item) => (
                <div key={item.term}>
                  <dt className="font-ui text-sm font-semibold uppercase tracking-[0.12em] text-c-accent">{item.term}</dt>
                  <dd className="mt-2">{item.detail}</dd>
                </div>
              ))}
              <div>
                <dt className="font-ui text-sm font-semibold uppercase tracking-[0.12em] text-c-accent">Questions or removal requests</dt>
                <dd className="mt-2">
                  Contact{" "}
                  <a href={`mailto:${site.contact.email}`} className="link-sweep link-sweep-static text-c-ink [overflow-wrap:anywhere]">
                    {site.contact.email}
                  </a>{" "}
                  or{" "}
                  <a href={site.contact.phoneHref} className="link-sweep link-sweep-static whitespace-nowrap text-c-ink">
                    {site.contact.phoneDisplay}
                  </a>
                  .
                </dd>
              </div>
            </dl>
            <p className="mt-8 border-t border-c-line pt-6">{careers.eeo}</p>
          </aside>
        </div>
      </section>
    </>
  );
}
