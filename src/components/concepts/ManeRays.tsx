/**
 * Brand motion graphic: thin gold rays radiating like a lion's mane around the
 * logo mark. Rays draw in once on load (CSS) and rotate slightly with scroll
 * (data-scroll-rotate, handled by ConceptMotion). Decorative only.
 */
export function ManeRays({ className = "", count = 72 }: { className?: string; count?: number }) {
  const rays = Array.from({ length: count }, (_, i) => {
    const angle = (360 / count) * i;
    // Deterministic, organic variation in ray length.
    const wobble = Math.sin(i * 2.399) * 0.5 + Math.sin(i * 0.7) * 0.5;
    const inner = 34 + (i % 3) * 1.5;
    const outer = 70 + wobble * 22 + (i % 2 === 0 ? 8 : 0);
    return { angle, inner, outer, i, width: i % 4 === 0 ? 0.5 : 0.28 };
  });

  return (
    <svg viewBox="-100 -100 200 200" className={`rays ${className}`} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="ray-gold" gradientUnits="userSpaceOnUse" x1="0" y1="-34" x2="0" y2="-96">
          <stop offset="0" stopColor="#dcad18" stopOpacity="0.9" />
          <stop offset="1" stopColor="#f2d471" stopOpacity="0" />
        </linearGradient>
      </defs>
      <circle r="31" fill="none" stroke="#bd9337" strokeOpacity="0.35" strokeWidth="0.3" />
      <circle r="93" fill="none" stroke="#bd9337" strokeOpacity="0.15" strokeWidth="0.2" />
      <g data-scroll-rotate="18">
        {rays.map((r) => (
          <line
            key={r.i}
            x1="0"
            y1={-r.inner}
            x2="0"
            y2={-r.outer}
            pathLength={1}
            stroke="url(#ray-gold)"
            strokeWidth={r.width}
            strokeLinecap="round"
            transform={`rotate(${r.angle.toFixed(2)})`}
            style={{ "--i": r.i } as React.CSSProperties}
          />
        ))}
      </g>
    </svg>
  );
}
