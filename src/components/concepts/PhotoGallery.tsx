import type { ConceptId } from "@/concepts/config";
import { GalleryPhoto, photoFrame } from "./GalleryPhoto";
import { SectionLabel } from "./SectionLabel";

/** Homepage gallery of the client's own photography (no stock). */
export function PhotoGallery({ concept }: { concept: ConceptId }) {
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
          <div className={`${photoFrame} md:col-span-2 md:row-span-2`} data-reveal-item>
            <GalleryPhoto
              name="team-working-session"
              alt="Dr. Romey Coles Jr. reviewing work at a computer with a colleague"
              sizes="(min-width: 1152px) 720px, (min-width: 768px) 64vw, 92vw"
              focus="object-[50%_30%]"
              className="aspect-[4/3] h-full md:aspect-auto"
            />
          </div>
          <div className={photoFrame} data-reveal-item>
            <GalleryPhoto
              name="ceo-presenting"
              alt="Dr. Romey Coles Jr. speaking to an audience"
              sizes="(min-width: 1152px) 360px, (min-width: 768px) 32vw, 92vw"
              focus="object-[50%_22%]"
              className="aspect-[4/3] h-full"
            />
          </div>
          <div className={photoFrame} data-reveal-item>
            <GalleryPhoto
              name="ceo-speaking"
              alt="Dr. Romey Coles Jr. speaking with a tablet in hand"
              sizes="(min-width: 1152px) 360px, (min-width: 768px) 32vw, 92vw"
              cutout
              className="aspect-[4/3] h-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
