import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface ConceptButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost";
  magnetic?: boolean;
  className?: string;
  icon?: React.ReactNode;
}

/** Pill button with a sliding arrow. `magnetic` adds a subtle pointer pull on desktop. */
export function ConceptButton({ href, children, variant = "primary", magnetic = false, className = "", icon }: ConceptButtonProps) {
  const classes = `btn-c ${variant === "primary" ? "btn-c-primary" : "btn-c-ghost"} ${className}`;
  const content = (
    <>
      <span>{children}</span>
      <span className="btn-c-arrow" aria-hidden="true">
        {icon ?? <ArrowRight className="size-4" strokeWidth={2.25} />}
      </span>
    </>
  );
  const magneticProps = magnetic ? { "data-magnetic": "" } : {};

  if (href.startsWith("/")) {
    return (
      <Link prefetch={false} href={href} className={classes} {...magneticProps}>
        {content}
      </Link>
    );
  }
  return (
    <a href={href} className={classes} {...magneticProps}>
      {content}
    </a>
  );
}
