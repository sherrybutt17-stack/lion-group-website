import { showReviewFlags, type ReviewKind } from "@/content/site";

const labels: Record<ReviewKind, string> = {
  draft: "Draft copy · pending client approval",
  placeholder: "Placeholder · client to supply",
  assumption: "Assumption · client to confirm",
  confirm: "Confirm details with client",
};

/** Small inline tag marking content that still needs client approval. */
export function ReviewFlag({ kind, className = "" }: { kind: ReviewKind; className?: string }) {
  if (!showReviewFlags) return null;
  return <span className={`review-flag ${className}`}>{labels[kind]}</span>;
}

/** Block-level reviewer note. Hidden entirely once review flags are turned off. */
export function ReviewNote({ title, children }: { title: string; children: React.ReactNode }) {
  if (!showReviewFlags) return null;
  return (
    <div
      role="note"
      className="rounded-xl border border-dashed border-gold-700 bg-gold-50 px-5 py-4 text-[0.9375rem] text-ink-soft"
    >
      <p className="font-ui font-semibold text-gold-700">Review note: {title}</p>
      <p className="mt-1">{children}</p>
    </div>
  );
}

/** Visible gap in the copy that the client must fill. Stays visible even with flags off. */
export function Placeholder({ children }: { children: React.ReactNode }) {
  return <span className="placeholder-text">{children}</span>;
}
