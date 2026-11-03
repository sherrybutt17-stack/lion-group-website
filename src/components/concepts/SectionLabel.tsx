/** Editorial section marker, e.g. "(01) Services". */
export function SectionLabel({ index, children, className = "" }: { index?: string; children: React.ReactNode; className?: string }) {
  return (
    <p className={`label-concept flex items-center gap-3 self-start ${className}`}>
      {index && <span className="font-normal">({index})</span>}
      <span>{children}</span>
    </p>
  );
}
