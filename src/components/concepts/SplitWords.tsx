import { Fragment } from "react";

type Segment = string | { text: string; className?: string };

/**
 * Splits a headline into masked words that rise in on load (CSS only, so it
 * runs before hydration and is skipped for reduced motion). The words stay
 * plain text inside the heading, so screen readers read the sentence normally.
 */
export function SplitWords({ segments, start = 0 }: { segments: Segment[]; start?: number }) {
  let index = start;
  const words = segments.flatMap((segment) => {
    const { text, className } = typeof segment === "string" ? { text: segment, className: undefined } : segment;
    return text
      .split(" ")
      .filter(Boolean)
      .map((word) => ({ word, className, i: index++ }));
  });

  return (
    <>
      {words.map(({ word, className, i }, n) => (
        <Fragment key={`${word}-${i}`}>
          <span className="word-mask">
            <span className={className} style={{ "--i": i } as React.CSSProperties}>
              {word}
            </span>
          </span>
          {n < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </>
  );
}
