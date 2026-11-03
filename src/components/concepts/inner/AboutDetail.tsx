import { site } from "@/content/site";
import type { ConceptId } from "@/concepts/config";
import { Picture } from "../../Picture";
import { SectionLabel } from "../SectionLabel";
import { ServiceIndex } from "../ServiceIndex";
import { ConceptCta } from "./ConceptCta";
import { PageHero } from "./PageHero";
import { h2Class } from "./styles";


const principles = [
  { n: "I", title: "Advocacy", text: "A person-centered approach that puts each individual's needs and goals first." },
  { n: "II", title: "Independence", text: "Encouraging self-sufficiency and the daily living skills that build confidence." },
  { n: "III", title: "Support", text: "Working closely with each individual, their family, and their support team." },
];

export function AboutDetail({ concept }: { concept: ConceptId }) {
  const outer = concept === "b" ? "px-3 pt-3" : "";
  return (
    <>
      <PageHero
        concept={concept}
        crumb="About"
        label="About us"
        title="About The Lion Group"
        lede="The Lion Group offers two services, DODD Agency Provider and Health Care Consultant. Our work is guided by three principles: advocacy, independence, and support."
      />

      <section
        aria-labelledby="leadership-heading"
        className={concept === "b" ? "px-3 pt-3" : concept === "a" || concept === "d" ? "bg-noir-center" : "tone-light"}
      >
        <div className={concept === "b" ? "mx-auto max-w-[90rem] rounded-[2rem] bg-white py-14 md:py-20" : "py-20 md:py-28"}>
          <div className="container-page grid items-center gap-14 lg:grid-cols-12">
            <div className="mx-auto w-full max-w-md lg:col-span-5" data-reveal="clip">
              <Picture
                name="ceo-portrait-smile"
                alt="Dr. Romey Coles Jr., President and CEO of The Lion Group"
                sizes="(min-width: 1024px) 420px, 80vw"
                className="h-auto w-full"
              />
            </div>
            <div className="lg:col-span-6 lg:col-start-7" data-reveal>
              <SectionLabel index="01">Leadership</SectionLabel>
              <h2 id="leadership-heading" className={`${h2Class[concept]} mt-5 text-c-ink`}>
                Dr. Romey Coles Jr.
              </h2>
              <p className="mt-2 font-ui text-sm font-semibold uppercase tracking-[0.14em] text-c-accent">President and CEO</p>
              <p className="mt-8 font-serif text-[clamp(1.25rem,1rem+0.8vw,1.75rem)] leading-snug text-c-ink">
                Dr. Romey Coles Jr. leads The Lion Group with integrity and insight. Having been personally touched by the
                challenges of autism and special needs, he is focused on making a positive impact in these areas through
                effective services.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="approach-heading"
        className={`${concept === "b" ? "" : concept === "a" || concept === "d" ? "bg-noir-warm" : "bg-c-bg-alt"} ${outer}`}
      >
        <div className={concept === "b" ? "mx-auto max-w-[90rem] rounded-[2rem] bg-c-bg-alt py-14 md:py-20" : "py-20 md:py-28"}>
          <div className="container-page">
            <SectionLabel index="02">Our approach</SectionLabel>
            <h2 id="approach-heading" className={`${h2Class[concept]} mt-5 text-c-ink`}>
              {site.tagline}
            </h2>
            <ol className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-c-line bg-c-line md:grid-cols-3" data-reveal-group>
              {principles.map((p) => (
                <li key={p.title} className={`${concept === "b" ? "bg-c-bg-alt" : "bg-c-bg-alt"} p-8`} data-reveal-item>
                  <span aria-hidden="true" className="font-serif text-3xl italic text-c-accent">
                    {p.n}
                  </span>
                  <h3 className="mt-6 font-serif text-2xl text-c-ink">{p.title}</h3>
                  <p className="mt-3">{p.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section aria-labelledby="services-heading" className={outer}>
        <div className={concept === "b" ? "mx-auto max-w-[90rem] rounded-[2rem] bg-white py-14 md:py-20" : "py-20 md:py-28"}>
          <div className="container-page">
            <SectionLabel index="03">Our services</SectionLabel>
            <h2 id="services-heading" className={`${h2Class[concept]} mt-5 text-c-ink`}>
              What we offer
            </h2>
            <div className="mt-12">
              <ServiceIndex concept={concept} />
            </div>
          </div>
        </div>
      </section>

      <ConceptCta
        concept={concept}
        heading="Talk with The Lion Group"
        text="Call, email, or send a message to ask about DODD Agency Provider or Health Care Consultant."
      />
    </>
  );
}
