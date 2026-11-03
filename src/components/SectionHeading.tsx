import type { ReviewKind } from "@/content/site";
import { ReviewFlag } from "./ReviewFlag";

interface SectionHeadingProps {
  id?: string;
  eyebrow?: string;
  title: string;
  intro?: React.ReactNode;
  review?: ReviewKind;
  align?: "start" | "center";
  as?: "h1" | "h2";
}

export function SectionHeading({ id, eyebrow, title, intro, review, align = "start", as: Tag = "h2" }: SectionHeadingProps) {
  const centered = align === "center";
  return (
    <div className={centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <Tag id={id} className={`${eyebrow ? "mt-3" : ""} text-title`}>
        {title}
      </Tag>
      {intro && <p className="mt-4 text-lede">{intro}</p>}
      {review && <ReviewFlag kind={review} className="mt-4" />}
    </div>
  );
}
