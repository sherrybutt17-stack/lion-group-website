import { imageManifest, type ImageName } from "@/lib/images.generated";

interface PictureProps {
  name: ImageName;
  alt: string;
  /** Media-query `sizes` value describing the rendered width. */
  sizes: string;
  /** Above-the-fold images load eagerly with high priority; everything else is lazy. */
  priority?: boolean;
  className?: string;
}

/** Responsive <picture> with AVIF/WebP sources and reserved dimensions. */
export function Picture({ name, alt, sizes, priority = false, className }: PictureProps) {
  const { width: srcWidth, height: srcHeight, widths } = imageManifest[name];
  // Use the largest generated file's dimensions so attribute and file ratios match exactly.
  const width = widths[widths.length - 1];
  const height = Math.round((width * srcHeight) / srcWidth);
  const srcSet = (ext: string) => widths.map((w) => `/images/${name}-${w}.${ext} ${w}w`).join(", ");
  const fallback = `/images/${name}-${widths[widths.length - 1]}.webp`;

  return (
    <picture>
      <source type="image/avif" srcSet={srcSet("avif")} sizes={sizes} />
      <source type="image/webp" srcSet={srcSet("webp")} sizes={sizes} />
      <img
        src={fallback}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : undefined}
        decoding={priority ? "sync" : "async"}
        className={className}
      />
    </picture>
  );
}
