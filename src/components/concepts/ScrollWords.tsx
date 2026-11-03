/** Paragraph whose words brighten as it scrolls through the viewport (see ConceptMotion). */
export function ScrollWords({ text, className = "" }: { text: string; className?: string }) {
  const words = text.split(" ");
  return (
    <p data-scroll-words className={className}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} data-word>
          {word}
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </p>
  );
}
