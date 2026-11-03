import Link from "next/link";
import { withConcept, type ConceptId } from "@/concepts/config";
import { GOLD_TOPOGRAPHY, MOLTEN_GOLD } from "../../effects/presets";
import { ShaderStage } from "../../effects/ShaderStage";
import { ManeRays } from "../ManeRays";
import { SplitWords } from "../SplitWords";

interface PageHeroProps {
  concept: ConceptId;
  label: string;
  title: string;
  lede: string;
  crumb: string;
  actions?: React.ReactNode;
}

function Crumbs({ concept, crumb }: { concept: ConceptId; crumb: string }) {
  return (
    <nav aria-label="Breadcrumb" className="enter-fade font-ui text-sm [--d:50ms]">
      <ol className="flex flex-wrap items-center gap-2 text-c-muted">
        <li>
          <Link prefetch={false} href={withConcept(concept, "/")} className="link-sweep link-sweep-static inline-flex min-h-6 items-center text-c-ink">
            Home
          </Link>
        </li>
        <li aria-hidden="true">/</li>
        <li>
          <span aria-current="page">{crumb}</span>
        </li>
      </ol>
    </nav>
  );
}

/** Page header for inner pages, styled per concept. */
export function PageHero({ concept, label, title, lede, crumb, actions }: PageHeroProps) {
  if (concept === "b") {
    return (
      <section aria-labelledby="page-title" className="px-3 pt-6 md:pt-8">
        <div className="mx-auto max-w-[90rem] rounded-[2rem] bg-white px-6 py-14 sm:px-12 md:py-20 lg:px-16">
          <Crumbs concept={concept} crumb={crumb} />
          <p className="enter-fade mt-10 inline-flex items-center gap-2 rounded-full bg-c-accent-soft px-4 py-2 font-ui text-sm font-semibold text-c-accent [--d:100ms]">
            {label}
          </p>
          <h1 id="page-title" className="mt-6 max-w-4xl font-serif text-[clamp(2.5rem,1.4rem+4vw,5rem)] leading-[1.02] tracking-[-0.025em] text-c-ink">
            <SplitWords segments={[title]} />
          </h1>
          <p className="enter-fade mt-6 max-w-[56ch] text-lg leading-relaxed md:text-xl [--d:500ms]">{lede}</p>
          {actions && <div className="enter-fade mt-10 flex flex-col gap-3 sm:flex-row [--d:650ms]">{actions}</div>}
        </div>
      </section>
    );
  }

  if (concept === "d") {
    return (
      <section aria-labelledby="page-title" className="relative -mt-[5.5rem] overflow-hidden pt-[5.5rem]">
        <ShaderStage effect="molten" settings={{ ...MOLTEN_GOLD, opacity: 0.85 }} fallbackClassName="bg-mesh-molten" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgb(26_26_26/0.55),rgb(26_26_26/0.88))]" />
        <div className="container-page relative py-20 text-center md:py-28">
          <div className="flex justify-center">
            <Crumbs concept={concept} crumb={crumb} />
          </div>
          <p className="label-concept enter-fade mt-12 [--d:100ms]">{label}</p>
          <h1 id="page-title" className="mx-auto mt-6 max-w-5xl font-serif text-[clamp(2.75rem,1.2rem+5vw,6rem)] leading-[0.98] tracking-[-0.025em] text-c-ink">
            <SplitWords segments={[{ text: title, className: "text-gradient-gold" }]} />
          </h1>
          <div aria-hidden="true" className="rule-gold mx-auto mt-10 max-w-md" />
          <p className="enter-fade mx-auto mt-8 max-w-[56ch] text-lg leading-relaxed md:text-xl [--d:500ms]">{lede}</p>
          {actions && <div className="enter-fade mt-10 flex flex-col justify-center gap-3 sm:flex-row [--d:650ms]">{actions}</div>}
        </div>
      </section>
    );
  }

  if (concept === "e") {
    return (
      <section aria-labelledby="page-title" className="relative overflow-hidden">
        <ShaderStage effect="topography" settings={GOLD_TOPOGRAPHY} fallbackClassName="bg-mesh-light" />
        <div className="container-page relative py-14 md:py-20">
          <Crumbs concept={concept} crumb={crumb} />
          <div className="mt-10 flex items-center gap-4 border-y border-c-ink py-2 font-ui text-xs font-semibold uppercase tracking-[0.2em] text-c-ink">
            <span>{label}</span>
            <span aria-hidden="true">·</span>
            <span>The Lion Group</span>
            <span className="ml-auto hidden sm:inline">Cleveland, Ohio</span>
          </div>
          <h1 id="page-title" className="mt-8 max-w-5xl font-serif text-[clamp(3rem,1.2rem+6vw,7.5rem)] leading-[0.92] tracking-[-0.035em] text-c-ink">
            <SplitWords segments={[title]} />
          </h1>
          <p className="enter-fade mt-8 max-w-[52ch] font-serif text-xl italic leading-relaxed text-c-ink md:text-2xl [--d:500ms]">{lede}</p>
          {actions && <div className="enter-fade mt-10 flex flex-col gap-3 sm:flex-row [--d:650ms]">{actions}</div>}
        </div>
      </section>
    );
  }

  if (concept === "c") {
    return (
      <section aria-labelledby="page-title" className="relative overflow-hidden border-b border-c-line" data-spotlight>
        <div className="container-page py-14 md:py-20">
          <Crumbs concept={concept} crumb={crumb} />
          <p className="label-concept enter-fade mt-12 [--d:100ms]">{label}</p>
          <h1
            id="page-title"
            className="mt-5 font-ui text-[clamp(2.5rem,1rem+6vw,7rem)] font-semibold uppercase leading-[0.9] tracking-[-0.035em] text-c-ink"
          >
            <SplitWords segments={[title]} />
          </h1>
          <div className="mt-12 grid gap-8 border-t border-c-line pt-8 md:grid-cols-12 md:items-end">
            <p className="enter-fade max-w-[52ch] text-lg leading-relaxed md:col-span-7 md:text-xl [--d:500ms]">{lede}</p>
            {actions && <div className="enter-fade flex flex-col gap-3 sm:flex-row md:col-span-5 md:justify-end [--d:650ms]">{actions}</div>}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section aria-labelledby="page-title" className="grain bg-noir-hero relative -mt-[4.75rem] overflow-hidden pt-[4.75rem]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(50rem_30rem_at_85%_30%,rgb(189_147_55/0.18),transparent_65%)]"
      />
      <div aria-hidden="true" className="pointer-events-none absolute -right-40 top-0 hidden w-[42rem] opacity-60 lg:block" data-parallax="-60">
        <ManeRays className="size-full" count={56} />
      </div>
      <div className="container-page relative py-16 md:py-24">
        <Crumbs concept={concept} crumb={crumb} />
        <p className="label-concept mt-12 flex items-center gap-4">
          <span aria-hidden="true" className="enter-rule h-px w-14 bg-c-accent" />
          <span className="enter-fade [--d:150ms]">{label}</span>
        </p>
        <h1
          id="page-title"
          className="mt-6 max-w-5xl font-serif text-[clamp(2.75rem,1.2rem+5vw,6rem)] leading-[0.98] tracking-[-0.025em] text-c-ink"
        >
          <SplitWords segments={[title]} />
        </h1>
        <p className="enter-fade mt-8 max-w-[56ch] text-lg leading-relaxed text-c-muted md:text-xl [--d:500ms]">{lede}</p>
        {actions && <div className="enter-fade mt-10 flex flex-col gap-4 sm:flex-row sm:items-center [--d:650ms]">{actions}</div>}
      </div>
    </section>
  );
}
