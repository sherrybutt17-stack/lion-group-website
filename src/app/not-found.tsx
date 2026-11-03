import type { Metadata } from "next";
import { ConceptButton } from "@/components/concepts/ConceptButton";
import { ConceptFooter } from "@/components/concepts/ConceptFooter";
import { ConceptHeader } from "@/components/concepts/ConceptHeader";
import { serviceLinks } from "@/content/site";
import { withConcept } from "@/concepts/config";

export const metadata: Metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <div data-concept="a" className="min-h-svh">
      <ConceptHeader concept="a" />
      <main id="main" tabIndex={-1} className="focus:outline-none">
        <section aria-labelledby="page-title" className="grain bg-noir-center">
          <div className="container-page py-24 md:py-36">
            <p className="label-concept">Error 404</p>
            <h1 id="page-title" className="mt-5 font-serif text-[clamp(2.75rem,1.4rem+5vw,6rem)] leading-[1] tracking-[-0.025em] text-c-ink">
              Page <span className="italic text-gradient-gold">not found</span>
            </h1>
            <p className="mt-6 max-w-[55ch] text-lg">The page you&apos;re looking for isn&apos;t here. It may have moved, or the address may be incorrect.</p>
            <ul className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <li>
                <ConceptButton href={withConcept("a", "/")}>Go to the homepage</ConceptButton>
              </li>
              {serviceLinks.map((l) => (
                <li key={l.href}>
                  <ConceptButton href={withConcept("a", l.href)} variant="ghost">
                    {l.label}
                  </ConceptButton>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <ConceptFooter concept="a" />
    </div>
  );
}
