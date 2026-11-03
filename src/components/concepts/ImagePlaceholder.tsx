import { ImageIcon } from "lucide-react";

interface ImagePlaceholderProps {
  label: string;
  className?: string;
}

/**
 * Marks where real, client-supplied photography will go. Intentionally styled
 * as a frame, not a fake photo, so nothing is mistaken for a real image.
 */
export function ImagePlaceholder({ label, className = "" }: ImagePlaceholderProps) {
  return (
    <figure className={`image-placeholder relative grid place-items-center overflow-hidden rounded-[inherit] p-6 text-center ${className}`}>
      <div className="max-w-xs">
        <ImageIcon aria-hidden="true" className="mx-auto size-7 text-c-accent" strokeWidth={1.5} />
        <figcaption className="mt-3 font-ui text-sm font-semibold uppercase tracking-[0.14em] text-c-ink">
          Image placeholder
        </figcaption>
        <p className="mt-1 text-[0.9375rem] text-c-muted">{label}</p>
      </div>
    </figure>
  );
}
