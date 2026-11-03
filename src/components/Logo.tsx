import Link from "next/link";
import { Picture } from "./Picture";

export function Logo({ tone = "light", href = "/" }: { tone?: "light" | "dark"; href?: string }) {
  return (
    <Link
      prefetch={false}
      href={href}
      aria-label="The Lion Group home"
      className="inline-flex min-h-11 shrink-0 items-center gap-2.5 no-underline sm:gap-3"
    >
      <Picture name="logo-lion-L" alt="" sizes="48px" priority className="h-9 w-auto min-[360px]:h-10 sm:h-11" />
      <span
        className={`whitespace-nowrap font-serif text-base leading-none min-[360px]:text-[1.0625rem] min-[400px]:text-[1.25rem] sm:text-[1.375rem] ${tone === "dark" ? "text-white" : "text-ink"}`}
      >
        The Lion Group
      </span>
    </Link>
  );
}
