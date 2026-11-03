/** Bracketed copy slot for content the client still needs to supply. */
export function ConceptPlaceholder({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={`block rounded-xl border border-dashed border-c-line bg-c-surface px-4 py-3 font-serif italic text-c-ink/80 ${className}`}
    >
      {children}
    </span>
  );
}
