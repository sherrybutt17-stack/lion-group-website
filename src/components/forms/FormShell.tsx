"use client";

import { Info } from "lucide-react";
import type { RefObject } from "react";
import type { Errors, Rules } from "./useMockForm";

export function PreviewNotice({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <div id={id} className="flex gap-3 rounded-xl border border-gold-700 bg-gold-50 px-5 py-4 text-ink">
      <Info aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-gold-700" />
      <div>{children}</div>
    </div>
  );
}

interface ErrorSummaryProps {
  summaryRef: RefObject<HTMLDivElement | null>;
  errors: Errors;
  rules: Rules;
  title: string;
}

/** Error summary pattern: focused on submit, links move focus to each field. */
export function ErrorSummary({ summaryRef, errors, rules, title }: ErrorSummaryProps) {
  const names = Object.keys(rules).filter((n) => n in errors);
  return (
    <div
      ref={summaryRef}
      tabIndex={-1}
      aria-labelledby="error-summary-title"
      hidden={names.length === 0}
      className="rounded-xl border-l-4 border-error bg-error-bg px-5 py-4 focus-visible:outline-error"
    >
      <h3 id="error-summary-title" className="font-ui text-lg font-semibold text-ink">
        {title}
      </h3>
      <ul className="mt-2 space-y-1">
        {names.map((name) => (
          <li key={name}>
            <a
              href={`#${name}`}
              className="inline-flex min-h-6 font-semibold text-error underline underline-offset-4"
              onClick={(event) => {
                event.preventDefault();
                const field = document.getElementById(name);
                field?.focus();
                field?.closest("div")?.scrollIntoView({ block: "center" });
              }}
            >
              {errors[name]}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Always-present live region so the preview result is announced. */
export function PreviewStatus({ previewed, children }: { previewed: boolean; children: React.ReactNode }) {
  return (
    <div role="status" aria-live="polite">
      {previewed && (
        <div className="mt-6 flex gap-3 rounded-xl border border-ink-soft bg-mist px-5 py-4 text-ink">
          <Info aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-gold-700" />
          <div>{children}</div>
        </div>
      )}
    </div>
  );
}
