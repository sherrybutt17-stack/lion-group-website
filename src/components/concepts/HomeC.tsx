import { ArrowDownRight } from "lucide-react";
import { services } from "@/content/services";
import { site } from "@/content/site";
import { withConcept } from "@/concepts/config";
import { Picture } from "../Picture";
import { GOLD_THREADS } from "../effects/presets";
import { ShaderStage } from "../effects/ShaderStage";
import { Marquee } from "./motion/Marquee";
import { ConceptButton } from "./ConceptButton";
import { ConceptPlaceholder } from "./ConceptPlaceholder";
import { SectionLabel } from "./SectionLabel";
import { SplitWords } from "./SplitWords";

const href = (path: string) => withConcept("c", path);

const principles = [
  { word: "Advocacy", text: "A person-centered approach that puts each individual's needs and goals first." },
  { word: "Independence", text: "Encouraging self-sufficiency and the daily living skills that build confidence." },
  { word: "Support", text: "Working closely with each individual, their family, and their support team." },
];

const display = "font-ui font-semibold uppercase tracking-[-0.035em]";

export function HomeC() {
  return (
    <>
      {/* Hero */}
      <section aria-labelledby="hero-heading" className="relative isolate overflow-hidden border-b border-c-line" data-spotlight>
        <ShaderStage effect="threads" settings={GOLD_THREADS} className="-z-10 opacity-70" />
        <div className="container-page grid min-h-[min(calc(100svh-4.5rem),56rem)] content-between gap-16 py-14 md:py-20">
          <div className="flex items-center justify-between gap-6">
            <p className="label-concept enter-fade [--d:100ms]">
              {site.name} — {site.contact.city}, {site.contact.regionName}
            </p>
            <div aria-hidden="true" className="enter-mark hidden w-16 md:block">
              <Picture name="logo-lion-L" alt="" sizes="64px" priority className="h-auto w-full" />
            </div>
          </div>

          <h1 id="hero-heading" className={`${display} text-[clamp(2.5rem,0.9rem+6.6vw,8.25rem)] leading-[0.9] text-c-ink`}>
            <span className="mb-4 block font-serif text-[clamp(1.25rem,0.9rem+1.4vw,2.25rem)] normal-case italic tracking-normal text-c-accent">
              <SplitWords segments={["Support for"]} />
            </span>
            <SplitWords segments={["Developmental disability services"]} start={2} />{" "}
            <SplitWords segments={[{ text: "and health care consulting.", className: "text-c-accent" }]} start={5} />
          </h1>

          <div className="grid gap-10 border-t border-c-line pt-8 md:grid-cols-12 md:items-end">
            <p className="enter-fade max-w-[46ch] text-lg leading-relaxed md:col-span-6 md:text-xl [--d:800ms]">
              The Lion Group partners with families, counties, and organizations. Explore our two services, or talk with us
              about your situation.
            </p>
            <div className="enter-fade flex flex-col gap-3 sm:flex-row md:col-span-6 md:justify-end [--d:950ms]">
              <ConceptButton href={href("/contact-us/")} magnetic>
                Contact The Lion Group
              </ConceptButton>
              <ConceptButton href="#services" variant="ghost" icon={<ArrowDownRight className="size-4" strokeWidth={2.25} />}>
                Our services
              </ConceptButton>
            </div>
          </div>
        </div>
      </section>

      {/* Service names react to scroll speed */}
      <section aria-label="Our services" className="border-b border-c-line py-8">
        <Marquee
          velocity
          label="Our services"
          items={["DODD Agency Provider", "Health Care Consultant", "DODD Agency Provider", "Health Care Consultant"]}
          itemClassName="font-ui text-[clamp(2.25rem,1rem+4vw,5rem)] font-semibold uppercase leading-none tracking-[-0.03em] text-c-ink"
        />
      </section>

      {/* Services: stacked panels */}
      <section id="services" aria-labelledby="services-heading" className="py-24 md:py-32">
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-6" data-reveal>
            <h2 id="services-heading" className={`${display} text-[clamp(2.5rem,1.2rem+5vw,6rem)] leading-[0.92] text-c-ink`}>
              Services <span className="text-c-accent">(2)</span>
            </h2>
            <p className="max-w-sm text-lg">Two services, each with its own focus. Scroll to explore both.</p>
          </div>

          <div className="mt-14 space-y-6">
            {services.map((service, i) => (
              <article
                key={service.slug}
                aria-labelledby={`${service.slug}-title`}
                className={`stack-panel ${i === 0 ? "tone-brown bg-mesh-dark" : "tone-gold bg-mesh-gold"} grid min-h-[min(80svh,46rem)] gap-10 overflow-hidden rounded-[2rem] p-8 sm:p-12 lg:grid-cols-12 lg:p-16`}
                data-stack-panel
              >
                <div className="flex flex-col justify-between gap-10 lg:col-span-6">
                  <span aria-hidden="true" className="font-ui text-[clamp(4rem,2rem+8vw,9rem)] font-semibold leading-none tracking-[-0.05em] text-c-accent">
                    0{i + 1}
                  </span>
                  <div>
                    <h3 id={`${service.slug}-title`} className={`${display} text-[clamp(2rem,1.2rem+3.2vw,4.25rem)] leading-[0.95] text-c-ink`}>
                      {service.name}
                    </h3>
                    <p className="mt-6 max-w-[48ch] text-lg">{service.lede.text}</p>
                  </div>
                </div>
                <div className="flex flex-col justify-between gap-10 lg:col-span-5 lg:col-start-8">
                  <div>
                    <p className="label-concept">{i === 0 ? "Supports include" : "Consulting can include"}</p>
                    <ul className="mt-5 divide-y divide-[var(--c-line)] border-y border-c-line">
                      {service.offerings.items.map((item) => (
                        <li key={item.title} className="py-3 font-ui font-medium text-c-ink">
                          {item.title}
                        </li>
                      ))}
                    </ul>
                    {service.offerings.placeholder && <ConceptPlaceholder className="mt-5">{service.offerings.placeholder}</ConceptPlaceholder>}
                  </div>
                  <div>
                    <ConceptButton href={href(service.href)}>Learn about {service.name}</ConceptButton>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Principles */}
      <section aria-labelledby="approach-heading" className="tone-light overflow-hidden py-24 md:py-32">
        <div className="container-page">
          <SectionLabel>Our approach</SectionLabel>
          <h2 id="approach-heading" className="sr-only">
            Our approach: advocacy, independence, and support
          </h2>
          <ul className="mt-10">
            {principles.map((p) => (
              <li key={p.word} className="grid gap-4 border-t border-c-line py-8 md:grid-cols-12 md:items-end md:gap-10">
                <p
                  className={`${display} text-[clamp(2rem,6.6vw,7.5rem)] leading-[0.88] text-c-ink [hyphens:none] md:col-span-8`}
                  data-reveal="clip"
                >
                  {p.word}
                </p>
                <p className="max-w-sm text-lg md:col-span-4" data-reveal>
                  {p.text}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Leadership */}
      <section aria-labelledby="leadership-heading" className="py-24 md:py-32">
        <div className="container-page grid items-center gap-14 lg:grid-cols-12">
          <div className="relative lg:col-span-5" data-reveal="clip">
            <div className="tone-gold aspect-square overflow-hidden rounded-full">
              <Picture
                name="ceo-speaking"
                alt="Dr. Romey Coles Jr. speaking to an audience"
                sizes="(min-width: 1024px) 440px, 85vw"
                className="h-full w-full translate-y-[6%] scale-110 object-cover object-top"
              />
            </div>
          </div>
          <div className="lg:col-span-6 lg:col-start-7" data-reveal>
            <SectionLabel>Leadership</SectionLabel>
            <h2 id="leadership-heading" className={`${display} mt-5 text-[clamp(2.5rem,1.2rem+4vw,5rem)] leading-[0.92] text-c-ink`}>
              Who we are
            </h2>
            <p className="mt-8 text-xl leading-relaxed">
              The Lion Group is led by President and CEO Dr. Romey Coles Jr. Having been personally touched by the
              challenges of autism and special needs, he leads The Lion Group&apos;s work to make a positive impact in these
              areas.
            </p>
            <div className="mt-10">
              <ConceptButton href={href("/about-us/")} variant="ghost">
                More about The Lion Group
              </ConceptButton>
            </div>
          </div>
        </div>
      </section>

      {/* Careers */}
      <section aria-labelledby="careers-heading" className="border-t border-c-line py-24 md:py-32">
        <div className="container-page grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5" data-reveal>
            <SectionLabel>Careers</SectionLabel>
            <h2 id="careers-heading" className={`${display} mt-5 text-[clamp(2.5rem,1.2rem+4vw,5rem)] leading-[0.92] text-c-ink`}>
              Work with <span className="text-c-accent">The Lion Group</span>
            </h2>
            <p className="mt-6 max-w-md text-lg">Submit your information for review. The Lion Group handles all screening and hiring decisions.</p>
            <div className="mt-10">
              <ConceptButton href={href("/careers/")} magnetic>
                View careers and apply
              </ConceptButton>
            </div>
          </div>
          <div className="relative lg:col-span-6 lg:col-start-7">
            <span aria-hidden="true" className="absolute bottom-0 left-0 top-0 w-px bg-c-line" />
            <span aria-hidden="true" className="absolute bottom-0 left-0 top-0 w-px origin-top bg-c-accent" data-progress="y" />
            <ol className="space-y-12 pl-10" data-reveal-group>
              {["Submit your information", "The Lion Group reviews and shortlists", "Shortlisted candidates are contacted"].map((title, i) => (
                <li key={title} data-reveal-item>
                  <span aria-hidden="true" className="font-ui text-sm font-semibold text-c-accent">
                    Step 0{i + 1}
                  </span>
                  <h3 className={`${display} mt-2 text-[clamp(1.5rem,1.1rem+1.4vw,2.25rem)] leading-tight text-c-ink`}>
                    <span className="sr-only">Step {i + 1}: </span>
                    {title}
                  </h3>
                </li>
              ))}
              <li className="border-t border-c-line pt-6 font-semibold text-c-ink" data-reveal-item>
                Applying does not guarantee a response, an interview, or a job offer.
              </li>
            </ol>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section aria-labelledby="contact-heading" className="tone-gold bg-mesh-gold overflow-hidden py-24 md:py-32">
        <div className="container-page">
          <h2 id="contact-heading" className={`${display} text-[clamp(3.5rem,0.5rem+12vw,12rem)] leading-[0.85] text-c-ink`} data-reveal="clip">
            Let&apos;s talk
          </h2>
          <div className="mt-14 grid gap-8 border-t border-c-line pt-10 md:grid-cols-3" data-reveal-group>
            <a href={site.contact.phoneHref} className="link-sweep inline-flex min-h-11 w-fit items-center font-ui text-2xl font-semibold text-c-ink" data-reveal-item>
              {site.contact.phoneDisplay}
            </a>
            <a
              href={`mailto:${site.contact.email}`}
              className="link-sweep inline-flex min-h-11 w-fit items-center font-ui text-xl font-semibold text-c-ink [overflow-wrap:anywhere]"
              data-reveal-item
            >
              {site.contact.email}
            </a>
            <div className="md:justify-self-end" data-reveal-item>
              <ConceptButton href={href("/contact-us/")} magnetic>
                Send a message
              </ConceptButton>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
