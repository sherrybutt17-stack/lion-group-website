import { site } from "@/content/site";
import { withConcept, type ConceptId } from "@/concepts/config";
import { Logo } from "../Logo";
import { ConceptButton } from "./ConceptButton";
import { ConceptMobileMenu } from "./ConceptMobileMenu";
import { ConceptNav } from "./ConceptNav";

const styles: Record<ConceptId, { header: string; bar: string; backdrop: string; link: string; menuButton: string; tone: "light" | "dark" }> = {
  // A · Heritage: transparent over the hero, frosted brown once scrolled.
  a: {
    header: "sticky top-0 z-40 [--header-h:4.75rem]",
    bar: "container-page relative flex h-[4.75rem] items-center justify-between gap-4",
    backdrop:
      "pointer-events-none absolute inset-0 -z-10 border-b border-c-line bg-c-bg/85 opacity-0 backdrop-blur-md transition-opacity duration-300 group-data-[scrolled]/header:opacity-100",
    link: "font-ui text-[0.9375rem] font-medium text-c-muted hover:text-c-ink aria-[current=page]:text-c-accent-soft",
    menuButton: "border border-c-line text-c-ink",
    tone: "dark",
  },
  // B · Daylight: floating rounded bar.
  b: {
    header: "sticky top-0 z-40 px-3 pt-3 [--header-h:5.5rem]",
    bar: "relative mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 pl-5 pr-2",
    backdrop:
      "pointer-events-none absolute inset-0 -z-10 rounded-full border border-c-line bg-white/85 shadow-[0_10px_40px_-24px_rgb(49_28_32/0.45)] backdrop-blur-md",
    link: "font-ui text-[0.9375rem] font-medium text-c-ink hover:text-c-accent aria-[current=page]:text-c-accent",
    menuButton: "bg-c-ink text-white",
    tone: "light",
  },
  // C · Momentum: solid ink bar with uppercase navigation.
  c: {
    header: "sticky top-0 z-40 [--header-h:4.5rem]",
    bar: "container-page relative flex h-[4.5rem] items-center justify-between gap-4",
    backdrop: "pointer-events-none absolute inset-0 -z-10 border-b border-c-line bg-c-bg/95 backdrop-blur-md",
    link: "font-ui font-medium uppercase tracking-[0.08em] text-[0.8125rem] text-c-muted hover:text-c-accent aria-[current=page]:text-c-accent",
    menuButton: "bg-c-accent text-c-on-accent",
    tone: "dark",
  },
  // D · Gilded: floating dark glass bar over the molten hero.
  d: {
    header: "sticky top-0 z-40 px-3 pt-3 [--header-h:5.5rem]",
    bar: "relative mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 pl-5 pr-2",
    backdrop:
      "pointer-events-none absolute inset-0 -z-10 rounded-full border border-white/12 bg-[#1a1a1a]/55 shadow-[0_20px_60px_-30px_rgb(0_0_0/0.8)] backdrop-blur-xl",
    link: "font-ui text-[0.9375rem] font-medium text-c-muted hover:text-c-ink aria-[current=page]:text-c-accent-soft",
    menuButton: "border border-white/15 bg-white/10 text-c-ink",
    tone: "dark",
  },
  // E · Atelier: newspaper masthead with a double ink rule.
  e: {
    header: "sticky top-0 z-40 [--header-h:4.75rem]",
    bar: "container-page relative flex h-[4.75rem] items-center justify-between gap-4",
    backdrop: "pointer-events-none absolute inset-0 -z-10 border-b-[3px] border-double border-c-ink bg-c-bg/95 backdrop-blur",
    link: "font-serif text-[1.0625rem] text-c-ink hover:text-c-accent aria-[current=page]:italic aria-[current=page]:text-c-accent",
    menuButton: "border border-c-ink text-c-ink",
    tone: "light",
  },
};

export function ConceptHeader({ concept }: { concept: ConceptId }) {
  const s = styles[concept];
  return (
    <header data-header className={`group/header no-print ${s.header}`}>
      <div className={s.bar}>
        <div aria-hidden="true" className={s.backdrop} />
        <Logo tone={s.tone} href={withConcept(concept, "/")} />
        <nav aria-label="Primary" className="hidden flex-1 items-center nav:flex">
          <div className="mx-auto">
            <ConceptNav concept={concept} linkClassName={s.link} />
          </div>
          <div className="flex items-center gap-5">
            {concept === "a" && (
              <a href={site.contact.phoneHref} className="link-sweep hidden whitespace-nowrap font-ui text-[0.9375rem] text-c-muted hover:text-c-ink 2xl:inline">
                {site.contact.phoneDisplay}
              </a>
            )}
            <ConceptButton href={withConcept(concept, "/contact-us/")} magnetic className="min-h-11 whitespace-nowrap py-2 pl-5 pr-2 text-[0.9375rem]">
              Contact us
            </ConceptButton>
          </div>
        </nav>
        <ConceptMobileMenu concept={concept} buttonClassName={s.menuButton} />
      </div>
    </header>
  );
}
