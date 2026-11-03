import type { ImageName } from "@/lib/images.generated";
import { Picture } from "../Picture";

export interface PhotoSpec {
  name: ImageName;
  alt: string;
  /** Media-query `sizes` value describing the rendered width. */
  sizes: string;
  /** Tailwind object-position class that keeps the subject in frame when cropped. */
  focus?: string;
  /** Transparent cutout: shown whole, standing on a molten-gold gradient instead of cropped. */
  cutout?: boolean;
}

/** Gold-edged frame used around photos on the dark concepts (A and D). Needs `group` for the hover zoom. */
export const photoFrame = "group border-gradient-gold rounded-[1.75rem] p-1.5 [--card-bg:#0a0a0a]";

/** One of the client's own photos (never stock), filling its frame. */
export function GalleryPhoto({ name, alt, sizes, focus = "object-center", cutout = false, className = "" }: PhotoSpec & { className?: string }) {
  const zoom =
    "motion-safe:transition-transform motion-safe:duration-700 motion-safe:ease-out motion-safe:group-hover:scale-[1.03]";
  return (
    <div className={`relative overflow-hidden rounded-[1.4rem] ${cutout ? "bg-mesh-molten" : "bg-c-surface"} ${className}`}>
      <Picture
        name={name}
        alt={alt}
        sizes={sizes}
        className={
          cutout
            ? `absolute inset-x-0 bottom-0 h-[92%] w-full object-contain object-bottom ${zoom} origin-bottom`
            : `absolute inset-0 h-full w-full object-cover ${focus} ${zoom}`
        }
      />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/45 via-transparent to-transparent" />
    </div>
  );
}
