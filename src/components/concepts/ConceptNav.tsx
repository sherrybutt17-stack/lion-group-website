"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { primaryNav } from "@/content/site";
import { withConcept, type ConceptId } from "@/concepts/config";

const normalize = (path: string) => (path.length > 1 ? path.replace(/\/+$/, "") : path);

/** Desktop navigation for a concept, with aria-current on the active page. */
export function ConceptNav({ concept, linkClassName }: { concept: ConceptId; linkClassName: string }) {
  const pathname = normalize(usePathname() ?? "/");
  return (
    <ul className="flex items-center gap-1">
      {primaryNav
        .filter((item) => item.href !== "/contact-us/")
        .map((item) => {
          const href = withConcept(concept, item.href);
          return (
            <li key={item.href}>
              <Link
                prefetch={false}
                href={href}
                aria-current={normalize(href) === pathname ? "page" : undefined}
                className={`group relative inline-flex min-h-11 items-center whitespace-nowrap px-3 ${linkClassName}`}
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className="absolute inset-x-3 bottom-2 h-px origin-left scale-x-0 bg-current transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100 group-aria-[current=page]:scale-x-100"
                />
              </Link>
            </li>
          );
        })}
    </ul>
  );
}
