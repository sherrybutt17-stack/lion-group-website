import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { services } from "@/content/services";
import { site } from "@/content/site";
import { withConcept } from "@/concepts/config";
import { Picture } from "../Picture";
import { MetallicLogo } from "../effects/MetallicLogo";
import { MOLTEN_GOLD } from "../effects/presets";
import { ShaderStage } from "../effects/ShaderStage";
import { ConceptButton } from "./ConceptButton";
import { PhotoGallery } from "./PhotoGallery";
import { ScrollWords } from "./ScrollWords";
import { SectionLabel } from "./SectionLabel";
import { SplitWords } from "./SplitWords";

const href = (path: string) => withConcept("d", path);

const steps = [
  { title: "Submit your information", text: "Share your contact details, the role you're interested in, and your experience." },
  { title: "Review and shortlist", text: "The Lion Group reviews every application and decides who to shortlist." },
  { title: "Next steps", text: "Shortlisted candidates are contacted directly. The Lion Group handles screening and hiring." },
];

export function HomeD() {
  return (
    <>
      {/* Molten gold hero */}
      <section aria-labelledby="hero-heading" className="relative -mt-[5.5rem] flex min-h-[min(100svh,62rem)] items-center overflow-hidden pt-[5.5rem]">
        <ShaderStage effect="molten" settings={MOLTEN_GOLD} fallbackClassName="bg-mesh-molten" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_55%,rgb(26_26_26/0.78),rgb(26_26_26/0.35)_70%,rgb(26_26_26/0.7))]"
        />
        <div className="container-page relative py-16 text-center">
          <MetallicLogo className="enter-mark mx-auto w-28 sm:w-36 md:w-44" sizes="(min-width: 768px) 176px, 112px" priority />
          <p className="label-concept enter-fade mt-8 [--d:200ms]">
            {site.name} · {site.contact.city}, {site.contact.regionName}
          </p>
          <h1
            id="hero-heading"
            className="mx-auto mt-6 max-w-5xl font-serif text-[clamp(2.5rem,1.2rem+4.8vw,5.75rem)] leading-[1] tracking-[-0.025em] text-c-ink"
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
          <p className="enter-fade mx-auto mt-8 max-w-[52ch] text-lg leading-relaxed md:text-xl [--d:700ms]">
            The Lion Group partners with families, counties, and organizations. Explore our two services, or talk with us
            about your situation.
          </p>
          <div className="enter-fade mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row [--d:850ms]">
            <ConceptButton href={href("/contact-us/")} magnetic className="glow-border">
              Contact The Lion Group
            </ConceptButton>
            <a href="#services" className="glass inline-flex min-h-[3.25rem] items-center gap-2 rounded-full border border-white/15 px-6 font-ui font-semibold text-c-ink hover:bg-white/15">
              Explore our services
              <ArrowDown aria-hidden="true" className="size-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Services: glass panels */}
      <section id="services" aria-labelledby="services-heading" className="bg-noir relative py-24 md:py-36">
        <div className="container-page">
          <div className="mx-auto max-w-3xl text-center" data-reveal>
            <SectionLabel className="justify-center">Our services</SectionLabel>
            <h2 id="services-heading" className="mt-5 font-serif text-[clamp(2.25rem,1.4rem+3vw,4.25rem)] leading-[1.04] tracking-[-0.02em] text-c-ink">
              Two ways <span className="text-gradient-gold">The Lion Group</span> can help
            </h2>
          </div>
          <ul className="mt-16 grid gap-6 lg:grid-cols-2" data-reveal-group>
            {services.map((service, i) => (
              <li key={service.slug} data-reveal-item>
                <article
                  aria-labelledby={`${service.slug}-title`}
                  className="glare edge-glow glass group relative flex h-full flex-col rounded-[2rem] border border-white/10 p-8 sm:p-12"
                  data-spotlight
                >
                  <div className="flex items-center justify-between">
                    <span className="font-ui text-sm font-semibold text-c-accent">0{i + 1}</span>
                    <span aria-hidden="true" className="grid size-12 place-items-center rounded-full border border-white/15 text-c-ink transition-transform duration-500 group-hover:-rotate-45">
                      <ArrowUpRight className="size-5" />
                    </span>
                  </div>
                  <h3 id={`${service.slug}-title`} className="mt-10 font-serif text-[clamp(2rem,1.4rem+2.2vw,3.25rem)] leading-[1.04] text-c-ink">
                    <Link prefetch={false} href={href(service.href)} className="after:absolute after:inset-0 after:z-[2] after:content-['']">
                      {service.name}
                    </Link>
                  </h3>
                  <p className="mt-5 flex-1 text-lg">{service.lede.text}</p>
                  <div aria-hidden="true" className="rule-gold mt-10 opacity-60" />
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {service.audience.items.map((a) => (
                      <li key={a} className="rounded-full border border-white/12 bg-white/5 px-4 py-1.5 text-[0.9375rem] text-c-ink">
                        {a}
                      </li>
                    ))}
                  </ul>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <PhotoGallery concept="d" />

      {/* Manifesto on a gold gradient band */}
      <section aria-labelledby="approach-heading" className="bg-noir-warm border-y border-c-line py-24 md:py-36">
        <div className="container-page">
          <SectionLabel>Our approach</SectionLabel>
          <h2 id="approach-heading" className="sr-only">
            Our approach
          </h2>
          <ScrollWords
            className="text-gradient-gold mt-8 max-w-6xl font-serif text-[clamp(2rem,1.1rem+3.2vw,4.25rem)] leading-[1.1] tracking-[-0.02em]"
            text="Advocacy. Independence. Support. We work closely with each individual and their support team, and keep everyone informed and involved."
          />
        </div>
      </section>

      {/* Leadership with a glowing orb */}
      <section aria-labelledby="leadership-heading" className="bg-noir-center relative overflow-hidden py-24 md:py-36">
        <div className="container-page grid items-center gap-14 lg:grid-cols-2">
          <div className="relative mx-auto w-full max-w-md" data-reveal>
            <div aria-hidden="true" className="orb-glow absolute inset-[-8%] rounded-full" />
            <div className="relative">
              <Picture
                name="ceo-portrait-cutout"
                alt="Dr. Romey Coles Jr., President and CEO of The Lion Group"
                sizes="(min-width: 1024px) 448px, 85vw"
                className="h-auto w-full"
              />
            </div>
          </div>
          <div data-reveal>
            <SectionLabel>Leadership</SectionLabel>
            <h2 id="leadership-heading" className="mt-5 font-serif text-[clamp(2.25rem,1.4rem+3vw,4.25rem)] leading-[1.04] tracking-[-0.02em] text-c-ink">
              Who we are
            </h2>
            <p className="mt-8 font-serif text-[clamp(1.25rem,1rem+0.8vw,1.75rem)] leading-snug text-c-ink">
              The Lion Group is led by President and CEO Dr. Romey Coles Jr. Having been personally touched by the challenges
              of autism and special needs, he leads The Lion Group&apos;s work to make a positive impact in these areas.
            </p>
            <div aria-hidden="true" className="rule-gold mt-10 max-w-sm" />
            <p className="mt-5 font-serif text-xl italic text-gradient-gold">Dr. Romey Coles Jr.</p>
            <p className="font-ui text-sm uppercase tracking-[0.14em]">President and CEO</p>
            <div className="mt-10">
              <ConceptButton href={href("/about-us/")} variant="ghost">
                More about The Lion Group
              </ConceptButton>
            </div>
          </div>
        </div>
      </section>

      {/* Careers: gradient-bordered steps */}
      <section aria-labelledby="careers-heading" className="bg-noir py-24 md:py-32">
        <div className="container-page">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end" data-reveal>
            <div className="lg:col-span-7">
              <SectionLabel>Careers</SectionLabel>
              <h2 id="careers-heading" className="mt-5 font-serif text-[clamp(2.25rem,1.4rem+3vw,4.25rem)] leading-[1.04] tracking-[-0.02em] text-c-ink">
                Interested in working with <span className="text-gradient-gold">The Lion Group?</span>
              </h2>
            </div>
            <div className="lg:col-span-4 lg:col-start-9 lg:justify-self-end">
              <ConceptButton href={href("/careers/")} magnetic>
                View careers and apply
              </ConceptButton>
            </div>
          </div>
          <ol className="mt-14 grid gap-5 md:grid-cols-3" data-reveal-group>
            {steps.map((step, i) => (
              <li key={step.title} className="border-gradient-gold rounded-[1.75rem] p-8 [--card-bg:#0a0a0a]" data-reveal-item>
                <span aria-hidden="true" className="font-serif text-5xl italic text-gradient-gold">
                  {i + 1}
                </span>
                <h3 className="mt-6 font-serif text-2xl text-c-ink">
                  <span className="sr-only">Step {i + 1}: </span>
                  {step.title}
                </h3>
                <p className="mt-3">{step.text}</p>
              </li>
            ))}
          </ol>
          <p className="mt-8 font-semibold text-c-ink">Applying does not guarantee a response, an interview, or a job offer.</p>
        </div>
      </section>

      {/* Contact */}
      <section aria-labelledby="contact-heading" className="bg-noir-center relative overflow-hidden py-24 text-center md:py-36">
        <div aria-hidden="true" className="orb-glow pointer-events-none absolute left-1/2 top-1/2 size-[46rem] -translate-x-1/2 -translate-y-1/2 opacity-40" />
        <div className="container-page relative">
          <SectionLabel className="justify-center">Contact</SectionLabel>
          <h2 id="contact-heading" className="mt-6 font-serif text-[clamp(3.5rem,1rem+10vw,10rem)] leading-[0.9] tracking-[-0.04em] text-gold-shine" data-reveal>
            Let&apos;s talk.
          </h2>
          <div className="mx-auto mt-14 flex max-w-3xl flex-col items-center justify-center gap-6 md:flex-row md:gap-12" data-reveal-group>
            <a href={site.contact.phoneHref} className="link-sweep inline-flex min-h-11 items-center font-serif text-3xl text-c-ink" data-reveal-item>
              {site.contact.phoneDisplay}
            </a>
            <a
              href={`mailto:${site.contact.email}`}
              className="link-sweep inline-flex min-h-11 items-center font-serif text-2xl text-c-ink [overflow-wrap:anywhere] md:text-3xl"
              data-reveal-item
            >
              {site.contact.email}
            </a>
          </div>
          <div className="mt-12">
            <ConceptButton href={href("/contact-us/")} magnetic className="glow-border">
              Send a message
            </ConceptButton>
          </div>
        </div>
      </section>
    </>
  );
}
