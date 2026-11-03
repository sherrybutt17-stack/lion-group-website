import { ArrowDown } from "lucide-react";
import { site } from "@/content/site";
import { withConcept } from "@/concepts/config";
import { Picture } from "../Picture";
import { LIGHT_RAYS } from "../effects/presets";
import { ShaderStage } from "../effects/ShaderStage";
import { ConceptButton } from "./ConceptButton";
import { ManeRays } from "./ManeRays";
import { PhotoGallery } from "./PhotoGallery";
import { ScrollWords } from "./ScrollWords";
import { SectionLabel } from "./SectionLabel";
import { ServiceIndex } from "./ServiceIndex";
import { SplitWords } from "./SplitWords";

const href = (path: string) => withConcept("a", path);

const principles = [
  { n: "I", title: "Advocacy", text: "A person-centered approach that puts each individual's needs and goals first." },
  { n: "II", title: "Independence", text: "Encouraging self-sufficiency and the daily living skills that build confidence." },
  { n: "III", title: "Support", text: "Working closely with each individual, their family, and their support team." },
];

const steps = [
  { title: "Submit your information", text: "Share your contact details, the role you're interested in, and your experience." },
  { title: "Review and shortlist", text: "The Lion Group reviews every application and decides who to shortlist." },
  { title: "Next steps", text: "Shortlisted candidates are contacted directly. The Lion Group handles screening and hiring." },
];

export function HomeA() {
  return (
    <>
      {/* Hero */}
      <section aria-labelledby="hero-heading" className="grain bg-noir-hero relative -mt-[4.75rem] overflow-hidden pt-[4.75rem]">
        <ShaderStage effect="light-rays" settings={LIGHT_RAYS} className="-z-10" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60rem_40rem_at_78%_42%,rgb(189_147_55/0.22),transparent_65%)]"
        />
        <div className="container-page grid min-h-[min(100svh,64rem)] items-center gap-12 pb-28 pt-12 lg:grid-cols-12 lg:pt-6">
          <div className="lg:col-span-7">
            <p className="label-concept flex items-center gap-4">
              <span aria-hidden="true" className="enter-rule h-px w-14 bg-c-accent" />
              <span className="enter-fade [--d:150ms]">
                {site.name} · {site.contact.city}, {site.contact.regionName}
              </span>
            </p>
            <h1
              id="hero-heading"
              className="mt-8 font-serif text-[clamp(2.75rem,1.2rem+5vw,6.25rem)] leading-[0.98] tracking-[-0.025em] text-c-ink"
            >
              <SplitWords
                segments={[
                  "Support for",
                  { text: "developmental disability services", className: "italic text-gold-shine" },
                  "and",
                  { text: "health care consulting.", className: "italic text-gold-shine" },
                ]}
              />
            </h1>
            <p className="enter-fade mt-8 max-w-[52ch] text-lg leading-relaxed text-c-muted [--d:700ms] md:text-xl">
              The Lion Group partners with families, counties, and organizations. Explore our two services, or talk with
              us about your situation.
            </p>
            <div className="enter-fade mt-10 flex flex-col gap-4 [--d:850ms] sm:flex-row sm:items-center">
              <ConceptButton href={href("/contact-us/")} magnetic>
                Contact The Lion Group
              </ConceptButton>
              <a href="#services" className="link-sweep inline-flex min-h-11 items-center gap-2 font-ui font-semibold text-c-ink">
                Explore our services
                <ArrowDown aria-hidden="true" className="size-4" />
              </a>
            </div>
          </div>

          <div aria-hidden="true" className="relative mx-auto w-full max-w-[22rem] lg:col-span-5 lg:max-w-none" data-parallax="-70">
            <div className="relative aspect-square">
              <ManeRays className="absolute inset-0 size-full" />
              <div className="enter-mark absolute inset-[27%] grid place-items-center">
                <div className="sheen">
                  <Picture name="logo-lion-L" alt="" sizes="(min-width: 1024px) 200px, 150px" priority className="h-auto w-full" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container-page absolute inset-x-0 bottom-0 hidden items-center justify-between border-t border-c-line py-6 md:flex">
          <p className="enter-fade font-ui text-sm uppercase tracking-[0.2em] text-c-muted [--d:1100ms]">
            Advocacy <span className="mx-3 text-c-accent">/</span> Independence <span className="mx-3 text-c-accent">/</span> Support
          </p>
          <p className="enter-fade font-ui text-sm text-c-muted [--d:1200ms]">Cleveland, Ohio</p>
        </div>
      </section>

      {/* Services */}
      <section id="services" aria-labelledby="services-heading" className="bg-noir py-24 md:py-36">
        <div className="container-page">
          <div className="grid gap-8 lg:grid-cols-12">
            <SectionLabel index="01" className="lg:col-span-3 lg:pt-4">
              Services
            </SectionLabel>
            <div className="lg:col-span-9" data-reveal>
              <h2 id="services-heading" className="max-w-3xl text-[clamp(2.25rem,1.4rem+3vw,4rem)] leading-[1.05] tracking-[-0.02em] text-c-ink">
                Two ways <span className="text-gradient-gold">The Lion Group</span> can help.
              </h2>
              <p className="mt-6 max-w-xl text-lg text-c-muted">
                Each service has its own page explaining what it covers, who it&apos;s for, and how to get in touch.
              </p>
            </div>
          </div>
          <div className="mt-16 md:mt-24">
            <ServiceIndex concept="a" />
          </div>
        </div>
      </section>

      <PhotoGallery concept="a" />

      {/* Approach */}
      <section aria-labelledby="approach-heading" className="bg-noir-warm py-24 md:py-36">
        <div className="container-page grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <SectionLabel index="02">Our approach</SectionLabel>
            <h2 id="approach-heading" className="sr-only">
              Our approach
            </h2>
          </div>
          <div className="lg:col-span-9">
            <ScrollWords
              className="font-serif text-[clamp(1.875rem,1.1rem+2.9vw,3.75rem)] leading-[1.14] tracking-[-0.015em] text-c-ink"
              text="Our work is guided by three principles: advocacy, independence, and support. We work closely with each individual and their support team, and keep everyone informed and involved."
            />
            <ol className="mt-20 grid gap-4 md:grid-cols-3" data-reveal-group>
              {principles.map((p) => (
                <li key={p.title} className="border-gradient-gold rounded-2xl p-8 [--card-bg:#0a0a0a]" data-reveal-item>
                  <span aria-hidden="true" className="font-serif text-3xl italic text-gradient-gold">
                    {p.n}
                  </span>
                  <h3 className="mt-6 text-2xl text-c-ink">{p.title}</h3>
                  <p className="mt-3 text-c-muted">{p.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section aria-labelledby="leadership-heading" className="bg-noir-center overflow-hidden py-24 md:py-36">
        <div className="container-page grid items-center gap-14 lg:grid-cols-12">
          <div className="relative mx-auto w-full max-w-md lg:col-span-5" data-reveal="clip">
            <Picture
              name="ceo-portrait-gold"
              alt="Dr. Romey Coles Jr., President and CEO of The Lion Group"
              sizes="(min-width: 1024px) 420px, 80vw"
              className="h-auto w-full"
            />
          </div>
          <div className="lg:col-span-6 lg:col-start-7" data-reveal>
            <SectionLabel index="03">Leadership</SectionLabel>
            <h2 id="leadership-heading" className="mt-6 text-[clamp(2.25rem,1.4rem+3vw,4rem)] leading-[1.05] tracking-[-0.02em] text-c-ink">
              Who we are
            </h2>
            <p className="mt-8 font-serif text-[clamp(1.25rem,1rem+0.8vw,1.75rem)] leading-snug text-c-ink">
              The Lion Group is led by President and CEO Dr. Romey Coles Jr. Having been personally touched by the
              challenges of autism and special needs, he leads The Lion Group&apos;s work to make a positive impact in these
              areas.
            </p>
            <div className="mt-10 flex items-center gap-5 border-t border-c-line pt-6">
              <div>
                <p className="font-serif text-xl italic text-c-ink">Dr. Romey Coles Jr.</p>
                <p className="font-ui text-sm uppercase tracking-[0.14em] text-c-muted">President and CEO</p>
              </div>
            </div>
            <div className="mt-10">
              <ConceptButton href={href("/about-us/")} variant="ghost">
                More about The Lion Group
              </ConceptButton>
            </div>
          </div>
        </div>
      </section>

      {/* Careers */}
      <section aria-labelledby="careers-heading" className="bg-noir-warm border-y border-c-line py-24 md:py-32">
        <div className="container-page grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5" data-reveal>
            <SectionLabel index="04">Careers</SectionLabel>
            <h2 id="careers-heading" className="mt-6 text-[clamp(2.25rem,1.4rem+3vw,4rem)] leading-[1.05] tracking-[-0.02em] text-c-ink">
              Interested in working with <span className="text-gradient-gold">The Lion Group?</span>
            </h2>
            <div className="mt-10">
              <ConceptButton href={href("/careers/")} magnetic>
                View careers and apply
              </ConceptButton>
            </div>
          </div>
          <ol className="lg:col-span-6 lg:col-start-7" data-reveal-group>
            {steps.map((step, i) => (
              <li key={step.title} className="grid grid-cols-[3.5rem_1fr] gap-4 border-t border-c-line py-7" data-reveal-item>
                <span aria-hidden="true" className="font-ui text-sm font-semibold text-c-accent">
                  0{i + 1}
                </span>
                <div>
                  <h3 className="font-serif text-2xl text-c-ink">
                    <span className="sr-only">Step {i + 1}: </span>
                    {step.title}
                  </h3>
                  <p className="mt-2">{step.text}</p>
                </div>
              </li>
            ))}
            <li className="border-t border-c-line pt-6 font-semibold" data-reveal-item>
              Applying does not guarantee a response, an interview, or a job offer.
            </li>
          </ol>
        </div>
      </section>

      {/* Contact */}
      <section aria-labelledby="contact-heading" className="grain bg-noir-center overflow-hidden py-24 md:py-36">
        <div className="container-page">
          <SectionLabel index="05">Contact</SectionLabel>
          <h2
            id="contact-heading"
            className="mt-6 font-serif text-[clamp(3.5rem,1rem+11vw,11rem)] leading-[0.9] tracking-[-0.04em] text-c-ink"
            data-reveal
          >
            Let&apos;s <span className="italic text-gold-shine">talk.</span>
          </h2>
          <div className="mt-14 grid gap-10 border-t border-c-line pt-10 md:grid-cols-[auto_1fr] lg:grid-cols-[auto_1fr_auto] lg:gap-16" data-reveal-group>
            <div data-reveal-item>
              <p className="label-concept">Call</p>
              <a href={site.contact.phoneHref} className="link-sweep mt-3 inline-flex min-h-11 items-center font-serif text-3xl text-c-ink">
                {site.contact.phoneDisplay}
              </a>
            </div>
            <div data-reveal-item>
              <p className="label-concept">Email</p>
              <a
                href={`mailto:${site.contact.email}`}
                className="link-sweep mt-3 inline-flex min-h-11 items-center font-serif text-2xl text-c-ink [overflow-wrap:anywhere] xl:text-3xl"
              >
                {site.contact.email}
              </a>
            </div>
            <div className="md:col-span-2 lg:col-span-1 lg:justify-self-end" data-reveal-item>
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
