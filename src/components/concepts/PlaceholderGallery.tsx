import type { ConceptId } from "@/concepts/config";
import { ConceptPlaceholder } from "./ConceptPlaceholder";
import { ImagePlaceholder } from "./ImagePlaceholder";
import { SectionLabel } from "./SectionLabel";

const frame = "border-gradient-gold rounded-[1.75rem] p-1.5 [--card-bg:#0a0a0a]";

/** Gallery of labelled photo slots for real, client-supplied photography (no stock). */
export function PlaceholderGallery({ concept }: { concept: ConceptId }) {
  const centered = concept === "d";
  return (
    <section aria-labelledby="gallery-heading" className="bg-noir py-24 md:py-32">
      <div className="container-page">
        <div className={centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl"} data-reveal>
          <SectionLabel className={centered ? "justify-center" : ""}>Gallery</SectionLabel>
          <h2 id="gallery-heading" className="mt-5 font-serif text-[clamp(2.25rem,1.4rem+3vw,4rem)] leading-[1.05] tracking-[-0.02em] text-c-ink">
            Inside <span className="text-gradient-gold">The Lion Group</span>
          </h2>
        </div>
        <div className="mt-14 grid gap-4 md:grid-cols-3 md:grid-rows-2" data-reveal-group>
          <div className={`${frame} md:col-span-2 md:row-span-2`} data-reveal-item>
            <ImagePlaceholder label="Photo of a program, activity, or day at The Lion Group." className="aspect-[4/3] h-full rounded-[1.4rem] md:aspect-auto" />
          </div>
          <div className={frame} data-reveal-item>
            <ImagePlaceholder label="Photo of a home or shared living space." className="aspect-[4/3] h-full rounded-[1.4rem]" />
          </div>
          <div className={frame} data-reveal-item>
            <ImagePlaceholder label="Photo of the team at work." className="aspect-[4/3] h-full rounded-[1.4rem]" />
          </div>
        </div>
      </div>
    </section>
  );
}

/** Slot for a real, consented client testimonial. Never filled with invented quotes. */
export function TestimonialPlaceholder({ concept }: { concept: ConceptId }) {
  const centered = concept === "d";
  return (
    <section aria-labelledby="stories-heading" className="bg-noir-center py-24 md:py-32">
      <div className={`container-page ${centered ? "text-center" : ""}`} data-reveal>
        <SectionLabel className={centered ? "justify-center" : ""}>Client stories</SectionLabel>
        <h2 id="stories-heading" className="sr-only">
          Client stories
        </h2>
        <figure className={`mt-8 max-w-4xl ${centered ? "mx-auto" : ""}`}>
          <span aria-hidden="true" className="block font-serif text-[6rem] leading-[0.6] text-gradient-gold">
            &ldquo;
          </span>
          <blockquote className="mt-4">
            <ConceptPlaceholder className="text-[clamp(1.25rem,1rem+1vw,1.75rem)] leading-snug">
              [Client to supply a real, consented testimonial from a family, guardian, or partner organization.]
            </ConceptPlaceholder>
          </blockquote>
          <figcaption className="mt-6">
            <ConceptPlaceholder className="inline-block text-base">[Name, relationship to The Lion Group]</ConceptPlaceholder>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
