import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { services } from "@/content/services";
import { site } from "@/content/site";
import { withConcept } from "@/concepts/config";
import { Picture } from "../Picture";
import { GOLD_TOPOGRAPHY } from "../effects/presets";
import { ShaderStage } from "../effects/ShaderStage";
import { ConceptButton } from "./ConceptButton";
import { SplitWords } from "./SplitWords";

const href = (path: string) => withConcept("e", path);

const principles = [
  { n: "I", title: "Advocacy", text: "A person-centered approach that puts each individual's needs and goals first." },
  { n: "II", title: "Independence", text: "Encouraging self-sufficiency and the daily living skills that build confidence." },
  { n: "III", title: "Support", text: "Working closely with each individual, their family, and their support team." },
];

/** Small-caps strap line between ink rules, like a newspaper section header. */
function Strap({ children, id }: { children: React.ReactNode; id?: string }) {
  return (
    <div className="flex items-center gap-4 border-y border-c-ink py-2 font-ui text-xs font-semibold uppercase tracking-[0.22em] text-c-ink">
      <h2 id={id} className="font-ui text-xs font-semibold uppercase tracking-[0.22em]">
        {children}
      </h2>
      <span aria-hidden="true" className="h-px flex-1 bg-c-ink/30" />
      <span aria-hidden="true">The Lion Group</span>
    </div>
  );
}

export function HomeE() {
  return (
    <>
      {/* Masthead hero */}
      <section aria-labelledby="hero-heading" className="relative overflow-hidden">
        <ShaderStage effect="topography" settings={GOLD_TOPOGRAPHY} fallbackClassName="bg-mesh-light" />
        <div className="container-page relative pb-20 pt-10 md:pb-28">
          <div className="enter-fade flex flex-wrap items-center justify-between gap-3 border-b border-c-ink pb-3 font-ui text-xs font-semibold uppercase tracking-[0.22em] text-c-ink [--d:50ms]">
            <span>
              {site.contact.city}, {site.contact.regionName}
            </span>
            <span className="hidden md:inline">Developmental disability services · Health care consulting</span>
            <span>{site.tagline}</span>
          </div>

          <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-8">
              <h1 id="hero-heading" className="word-mask-loose font-serif text-[clamp(3rem,1rem+6.6vw,8rem)] leading-[0.9] tracking-[-0.04em] text-c-ink">
                <SplitWords
                  segments={[
                    "Support for",
                    { text: "developmental disability services", className: "italic text-gradient-ink" },
                    "and",
                    { text: "health care consulting.", className: "italic text-gradient-ink" },
                  ]}
                />
              </h1>
              <div className="enter-fade mt-12 grid gap-8 border-t border-c-ink pt-8 md:grid-cols-2 [--d:700ms]">
                <p className="text-lg leading-relaxed text-c-ink first-letter:float-left first-letter:mr-3 first-letter:font-serif first-letter:text-[4.5rem] first-letter:leading-[0.8] first-letter:text-c-accent">
                  The Lion Group partners with families, counties, and organizations. Explore our two services, or talk with
                  us about your situation.
                </p>
                <div className="flex flex-col items-start gap-4">
                  <ConceptButton href={href("/contact-us/")} magnetic>
                    Contact The Lion Group
                  </ConceptButton>
                  <a href="#services" className="link-sweep link-sweep-static inline-flex min-h-11 items-center font-serif text-lg italic text-c-ink">
                    Read about our services
                  </a>
                </div>
              </div>
            </div>

            <figure className="lg:col-span-4" data-reveal>
              <div className="border border-c-ink bg-c-bg p-3">
                <div className="halftone-reveal bg-[linear-gradient(160deg,#fbf6e6,#f2d471)]">
                  <Picture
                    name="ceo-portrait-cutout"
                    alt="Dr. Romey Coles Jr., President and CEO of The Lion Group"
                    sizes="(min-width: 1024px) 360px, 85vw"
                    priority
                    className="h-auto w-full"
                  />
                </div>
              </div>
              <figcaption className="mt-3 border-b border-c-ink pb-3 font-serif text-[0.9375rem] italic text-c-ink">
                Dr. Romey Coles Jr., President and CEO
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* Services as a magazine spread */}
      <section id="services" aria-labelledby="services-heading" className="py-20 md:py-28">
        <div className="container-page">
          <Strap id="services-heading">Our services</Strap>
          <div className="mt-12 grid gap-14 md:grid-cols-2 md:gap-0 md:divide-x md:divide-[var(--c-line)]" data-reveal-group>
            {services.map((service, i) => (
              <article key={service.slug} aria-labelledby={`${service.slug}-title`} className={i === 0 ? "md:pr-12" : "md:pl-12"} data-reveal-item>
                <p className="font-ui text-xs font-semibold uppercase tracking-[0.22em] text-c-accent">No. 0{i + 1}</p>
                <h3 id={`${service.slug}-title`} className="mt-4 font-serif text-[clamp(2.25rem,1.4rem+3vw,4rem)] leading-[0.98] tracking-[-0.03em] text-c-ink">
                  {service.name}
                </h3>
                <p className="mt-6 font-serif text-xl italic leading-snug text-c-ink">{service.card.summary}</p>
                <p className="mt-6 text-lg leading-relaxed first-letter:float-left first-letter:mr-2 first-letter:font-serif first-letter:text-[3.25rem] first-letter:leading-[0.85] first-letter:text-c-accent">
                  {service.about.paragraphs[0]}
                </p>
                <Link
                  prefetch={false}
                  href={href(service.href)}
                  className="link-sweep link-sweep-static mt-8 inline-flex min-h-11 items-center gap-2 font-ui font-semibold text-c-ink"
                >
                  Continue reading: {service.name}
                  <ArrowRight aria-hidden="true" className="size-4" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Pull quote */}
      <section aria-labelledby="approach-heading" className="bg-mesh-light border-y-[3px] border-double border-c-ink py-20 md:py-28">
        <div className="container-page">
          <h2 id="approach-heading" className="sr-only">
            Our approach
          </h2>
          <blockquote className="mx-auto max-w-5xl text-center" data-reveal>
            <p className="font-serif text-[clamp(2.75rem,1.2rem+5.6vw,7rem)] italic leading-[0.95] tracking-[-0.03em] text-gradient-ink">
              Advocacy. Independence. Support.
            </p>
            <footer className="mt-8 font-ui text-xs font-semibold uppercase tracking-[0.22em] text-c-ink">The principles behind our work</footer>
          </blockquote>
          <ol className="mt-16 grid gap-10 md:grid-cols-3 md:gap-0 md:divide-x md:divide-[var(--c-line)]" data-reveal-group>
            {principles.map((p) => (
              <li key={p.title} className="md:px-10 md:first:pl-0 md:last:pr-0" data-reveal-item>
                <span aria-hidden="true" className="font-serif text-4xl italic text-c-accent">
                  {p.n}
                </span>
                <h3 className="mt-3 font-serif text-2xl text-c-ink">{p.title}</h3>
                <p className="mt-2 text-lg">{p.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Careers: classifieds box */}
      <section aria-labelledby="careers-heading" className="py-20 md:py-28">
        <div className="container-page grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5" data-reveal>
            <Strap id="careers-heading">Careers</Strap>
            <p className="mt-8 font-serif text-[clamp(2rem,1.3rem+2.4vw,3.25rem)] leading-[1.02] tracking-[-0.02em] text-c-ink">
              Interested in working with The Lion Group?
            </p>
            <p className="mt-6 text-lg">Submit your information for review. The Lion Group shortlists candidates and handles all screening and hiring.</p>
          </div>
          <div className="border-[3px] border-double border-c-ink p-8 sm:p-10 lg:col-span-6 lg:col-start-7" data-reveal>
            <p className="text-center font-ui text-xs font-semibold uppercase tracking-[0.3em] text-c-ink">Applications welcome</p>
            <ol className="mt-8 space-y-6">
              {["Submit your information", "The Lion Group reviews and shortlists", "Shortlisted candidates are contacted"].map((title, i) => (
                <li key={title} className="flex gap-5 border-b border-dotted border-c-ink/40 pb-6">
                  <span aria-hidden="true" className="font-serif text-3xl italic text-c-accent">
                    {i + 1}.
                  </span>
                  <span className="font-serif text-xl text-c-ink">
                    <span className="sr-only">Step {i + 1}: </span>
                    {title}
                  </span>
                </li>
              ))}
            </ol>
            <p className="mt-6 text-[0.9375rem] font-semibold text-c-ink">Applying does not guarantee a response, an interview, or a job offer.</p>
            <div className="mt-8">
              <ConceptButton href={href("/careers/")}>View careers and apply</ConceptButton>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section aria-labelledby="contact-heading" className="relative overflow-hidden border-t-[3px] border-double border-c-ink">
        <ShaderStage effect="topography" settings={{ ...GOLD_TOPOGRAPHY, opacity: 0.4 }} fallbackClassName="bg-mesh-light" />
        <div className="container-page relative grid gap-10 py-20 md:py-28 lg:grid-cols-12 lg:items-end">
          <h2 id="contact-heading" className="font-serif text-[clamp(3.5rem,1rem+10vw,10rem)] italic leading-[0.88] tracking-[-0.04em] text-c-ink lg:col-span-7" data-reveal>
            Correspondence
          </h2>
          <address className="space-y-4 not-italic lg:col-span-5" data-reveal-group>
            <p className="font-ui text-xs font-semibold uppercase tracking-[0.22em] text-c-ink" data-reveal-item>
              {site.contact.street}, {site.contact.city}, {site.contact.regionName} {site.contact.postalCode}
            </p>
            <a href={site.contact.phoneHref} className="link-sweep link-sweep-static block w-fit font-serif text-3xl text-c-ink" data-reveal-item>
              {site.contact.phoneDisplay}
            </a>
            <a href={`mailto:${site.contact.email}`} className="link-sweep link-sweep-static block w-fit font-serif text-2xl text-c-ink [overflow-wrap:anywhere]" data-reveal-item>
              {site.contact.email}
            </a>
            <div className="pt-4" data-reveal-item>
              <ConceptButton href={href("/contact-us/")}>Send a message</ConceptButton>
            </div>
          </address>
        </div>
      </section>
    </>
  );
}
