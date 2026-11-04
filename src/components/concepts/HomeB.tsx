import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/content/services";
import { site } from "@/content/site";
import { withConcept } from "@/concepts/config";
import { Picture } from "../Picture";
import { GOLD_GRAIN } from "../effects/presets";
import { ShaderStage } from "../effects/ShaderStage";
import { ConceptButton } from "./ConceptButton";
import { ConceptPlaceholder } from "./ConceptPlaceholder";
import { GalleryPhoto, type PhotoSpec } from "./GalleryPhoto";
import { Marquee } from "./motion/Marquee";
import { SectionLabel } from "./SectionLabel";
import { SplitWords } from "./SplitWords";

const href = (path: string) => withConcept("b", path);

const tile = "relative overflow-hidden rounded-[2rem]";

const photoSizes = "(min-width: 1152px) 640px, (min-width: 1024px) 56vw, 84vw";
/** One of the client's own photos per service card, in `services` order (never stock). */
const servicePhotos: PhotoSpec[] = [
  { name: "ceo-speaking", alt: "Dr. Romey Coles Jr. speaking with a tablet in hand", sizes: photoSizes, cutout: true },
  { name: "team-working-session", alt: "Dr. Romey Coles Jr. reviewing work at a computer with a colleague", sizes: photoSizes, focus: "object-[50%_30%]" },
];

function GoldCheck() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" className="mt-1 size-5 shrink-0">
      <circle cx="10" cy="10" r="10" fill="#fbf6e6" />
      <path d="M5.5 10.5l3 3 6-7" fill="none" stroke="#7e6821" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function HomeB() {
  return (
    <>
      {/* Bento hero */}
      <section aria-labelledby="hero-heading" className="px-3 pb-3 pt-6 md:pt-8" data-click-spark>
        <div className="mx-auto grid max-w-[90rem] gap-3 lg:grid-cols-12 lg:grid-rows-[auto_auto]">
          <div className={`${tile} bg-mesh-light flex flex-col justify-between border border-c-line p-8 sm:p-12 lg:col-span-8 lg:row-span-2 lg:min-h-[40rem] lg:p-16`}>
            <p className="enter-fade inline-flex w-fit items-center gap-2 rounded-full bg-c-accent-soft px-4 py-2 font-ui text-sm font-semibold text-c-accent [--d:100ms]">
              <span aria-hidden="true" className="size-2 rounded-full bg-c-accent" />
              {site.contact.city}, {site.contact.regionName}
            </p>
            <div className="mt-10">
              <h1 id="hero-heading" className="font-serif text-[clamp(2.5rem,1.3rem+4.4vw,5.25rem)] leading-[1.02] tracking-[-0.025em] text-c-ink">
                <SplitWords segments={["Support for developmental disability services and"]} />{" "}
                <span className="relative inline-block sm:whitespace-nowrap">
                  <SplitWords segments={["health care consulting."]} start={6} />
                  <svg
                    viewBox="0 0 300 20"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                    className="draw-underline absolute -bottom-2 left-0 h-3 w-full [--d:1000ms]"
                  >
                    <path d="M3 14 C 60 4, 140 4, 200 9 S 280 16, 297 6" fill="none" stroke="#dcad18" strokeWidth="4" strokeLinecap="round" pathLength={1} />
                  </svg>
                </span>
              </h1>
              <p className="enter-fade mt-8 max-w-[50ch] text-lg leading-relaxed md:text-xl [--d:700ms]">
                The Lion Group partners with families, counties, and organizations. Explore our two services, or talk with
                us about your situation.
              </p>
              <div className="enter-fade mt-10 flex flex-col gap-3 sm:flex-row [--d:850ms]">
                <ConceptButton href={href("/contact-us/")} magnetic>
                  Contact The Lion Group
                </ConceptButton>
                <ConceptButton href="#services" variant="ghost">
                  Explore our services
                </ConceptButton>
              </div>
            </div>
          </div>

          <div className={`${tile} tone-brown grid min-h-[20rem] place-items-center p-10 lg:col-span-4`} data-tilt>
            <ShaderStage effect="grainient" settings={GOLD_GRAIN} fallbackClassName="bg-mesh-dark" />
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgb(49_28_32/0.15),rgb(49_28_32/0.65))]" />
            <div className="enter-mark relative w-36 md:w-44">
              <div className="sheen">
                <Picture name="logo-lion-L" alt="" sizes="176px" priority className="h-auto w-full" />
              </div>
            </div>
            <p className="enter-fade relative mt-6 text-center font-serif text-2xl italic text-c-accent-soft [--d:900ms]">{site.tagline}</p>
          </div>

          <Link
            prefetch={false}
            href={href("/about-us/")}
            className={`${tile} group flex min-h-[20rem] flex-col justify-between bg-c-accent-soft p-8 lg:col-span-4`}
          >
            <div className="relative z-10 max-w-[13rem]">
              <p className="label-concept">Leadership</p>
              <p className="mt-3 font-serif text-2xl leading-tight text-c-ink">Led by Dr. Romey Coles Jr.</p>
              <span className="mt-4 inline-flex items-center gap-1 font-ui font-semibold text-c-accent">
                About us
                <ArrowUpRight aria-hidden="true" className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </span>
            </div>
            <div className="pointer-events-none absolute -bottom-2 -right-6 w-[62%] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]">
              <Picture name="ceo-portrait-cutout" alt="" sizes="(min-width: 1024px) 220px, 60vw" className="h-auto w-full" />
            </div>
          </Link>
        </div>
      </section>

      {/* Principles marquee */}
      <section aria-labelledby="principles-heading" className="py-10 md:py-14">
        <h2 id="principles-heading" className="sr-only">
          Our principles
        </h2>
        <Marquee
          label="Our principles"
          items={["Advocacy", "Independence", "Support", "Advocacy", "Independence", "Support"]}
          className="py-2"
          itemClassName="font-serif text-[clamp(2.75rem,1.5rem+5vw,6rem)] leading-none text-c-ink"
        />
      </section>

      {/* Services: sticky split */}
      <section id="services" aria-labelledby="services-heading" className="px-3 pb-24 md:pb-32">
        <div className="container-page grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <SectionLabel>Our services</SectionLabel>
              <h2 id="services-heading" className="mt-5 text-[clamp(2.25rem,1.5rem+2.6vw,3.75rem)] leading-[1.05] tracking-[-0.02em] text-c-ink">
                How The Lion Group can help
              </h2>
              <p className="mt-5 max-w-sm text-lg">Two services, each with its own focus. Explore what each one covers.</p>
              <div className="relative mt-10 hidden pl-6 lg:block">
                <span aria-hidden="true" className="absolute left-0 top-0 h-full w-px bg-c-line" />
                <span aria-hidden="true" className="absolute left-0 top-0 h-full w-px origin-top bg-c-accent" data-progress="y" />
                <ul className="space-y-4 font-ui font-semibold">
                  {services.map((s, i) => (
                    <li key={s.slug}>
                      <a href={`#${s.slug}`} className="inline-flex min-h-11 items-center gap-3 text-c-ink hover:text-c-accent">
                        <span aria-hidden="true" className="text-sm text-c-accent">
                          0{i + 1}
                        </span>
                        {s.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="space-y-4 lg:col-span-8">
            {services.map((service, i) => (
              <article
                key={service.slug}
                id={service.slug}
                aria-labelledby={`${service.slug}-title`}
                className="border-gradient-gold rounded-[2rem] p-8 shadow-[0_30px_80px_-50px_rgb(49_28_32/0.45)] [--card-bg:#ffffff] sm:p-12"
                data-reveal
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="font-ui text-sm font-semibold text-c-accent">Service 0{i + 1}</span>
                </div>
                <h3 id={`${service.slug}-title`} className="mt-4 text-[clamp(2rem,1.4rem+2.2vw,3.25rem)] leading-[1.05] tracking-[-0.02em] text-c-ink">
                  {service.name}
                </h3>
                <p className="mt-5 max-w-[56ch] text-lg">{service.lede.text}</p>

                <div className="mt-8 flex flex-wrap gap-2">
                  {service.audience.items.map((a) => (
                    <span key={a} className="rounded-full border border-c-line px-4 py-1.5 text-[0.9375rem] text-c-ink">
                      {a}
                    </span>
                  ))}
                </div>

                <ul className="mt-10 grid gap-x-8 gap-y-4 sm:grid-cols-2">
                  {service.offerings.items.map((item) => (
                    <li key={item.title} className="flex gap-3 text-c-ink">
                      <GoldCheck />
                      <span>{item.title}</span>
                    </li>
                  ))}
                </ul>
                {service.offerings.placeholder && <ConceptPlaceholder className="mt-6">{service.offerings.placeholder}</ConceptPlaceholder>}

                <div className="group mt-10">
                  <GalleryPhoto {...servicePhotos[i]} className="aspect-[16/9]" />
                </div>

                <div className="mt-10">
                  <ConceptButton href={href(service.href)}>Learn about {service.name}</ConceptButton>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Careers stepper */}
      <section aria-labelledby="careers-heading" className="px-3 pb-3">
        <div className="mx-auto max-w-[90rem] rounded-[2rem] bg-c-bg-alt px-6 py-16 sm:px-12 md:py-24">
          <div className="container-page !px-0">
            <div className="grid gap-8 lg:grid-cols-12" data-reveal>
              <div className="lg:col-span-6">
                <SectionLabel>Careers</SectionLabel>
                <h2 id="careers-heading" className="mt-5 text-[clamp(2.25rem,1.5rem+2.6vw,3.75rem)] leading-[1.05] tracking-[-0.02em] text-c-ink">
                  Interested in working with The Lion Group?
                </h2>
              </div>
              <div className="flex items-end lg:col-span-5 lg:col-start-8">
                <p className="text-lg">
                  Submit your information for review. The Lion Group shortlists candidates and handles all screening and
                  hiring.
                </p>
              </div>
            </div>

            <div className="relative mt-16">
              <svg viewBox="0 0 1000 20" preserveAspectRatio="none" aria-hidden="true" className="absolute left-0 top-6 hidden h-5 w-full md:block" data-draw>
                <path d="M0 10 H 1000" fill="none" stroke="#7e6821" strokeWidth="2" strokeDasharray="1" pathLength={1} />
              </svg>
              <ol className="relative grid gap-8 md:grid-cols-3" data-reveal-group>
                {["Submit your information", "The Lion Group reviews and shortlists", "Shortlisted candidates are contacted"].map((title, i) => (
                  <li key={title} data-reveal-item>
                    <span aria-hidden="true" className="grid size-12 place-items-center rounded-full bg-c-ink font-ui font-semibold text-white ring-8 ring-c-bg-alt">
                      {i + 1}
                    </span>
                    <h3 className="mt-6 font-serif text-2xl text-c-ink">
                      <span className="sr-only">Step {i + 1}: </span>
                      {title}
                    </h3>
                  </li>
                ))}
              </ol>
            </div>

            <div className="mt-14 flex flex-col gap-4 border-t border-c-line pt-8 sm:flex-row sm:items-center sm:justify-between">
              <p className="font-semibold text-c-ink">Applying does not guarantee a response, an interview, or a job offer.</p>
              <ConceptButton href={href("/careers/")} magnetic>
                View careers and apply
              </ConceptButton>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section aria-labelledby="contact-heading" className="px-3 pb-3">
        <div className="tone-gold mx-auto grid max-w-[90rem] gap-10 overflow-hidden rounded-[2rem] px-6 py-16 sm:px-12 md:py-24 lg:grid-cols-12">
          <div className="lg:col-span-7" data-reveal>
            <h2 id="contact-heading" className="text-[clamp(2.75rem,1.5rem+4.5vw,5.5rem)] leading-[0.98] tracking-[-0.03em] text-c-ink">
              Talk with The Lion Group
            </h2>
            <p className="mt-6 max-w-lg text-lg">Call, email, or send a message to ask about DODD Agency Provider or Health Care Consultant.</p>
          </div>
          <div className="flex flex-col justify-end gap-3 lg:col-span-4 lg:col-start-9" data-reveal-group>
            <a href={site.contact.phoneHref} className="flex min-h-14 items-center justify-between rounded-2xl bg-white/40 px-5 font-ui text-lg font-semibold text-c-ink hover:bg-white/70" data-reveal-item>
              {site.contact.phoneDisplay}
              <ArrowUpRight aria-hidden="true" className="size-5" />
            </a>
            <a
              href={`mailto:${site.contact.email}`}
              className="flex min-h-14 items-center justify-between gap-3 rounded-2xl bg-white/40 px-5 font-ui text-lg font-semibold text-c-ink [overflow-wrap:anywhere] hover:bg-white/70"
              data-reveal-item
            >
              {site.contact.email}
              <ArrowUpRight aria-hidden="true" className="size-5 shrink-0" />
            </a>
            <div data-reveal-item>
              <ConceptButton href={href("/contact-us/")} className="mt-2 w-full">
                Send a message
              </ConceptButton>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
