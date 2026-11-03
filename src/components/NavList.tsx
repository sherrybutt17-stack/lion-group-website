"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { primaryNav } from "@/content/site";

const normalize = (path: string) => (path.length > 1 ? path.replace(/\/+$/, "") : path);

/** Primary navigation links with aria-current on the active page. */
export function NavList({ variant }: { variant: "desktop" | "mobile" }) {
  const pathname = normalize(usePathname() ?? "/");

  if (variant === "desktop") {
    return (
      <ul className="flex items-center gap-1">
        {primaryNav.map((item) => {
          const current = normalize(item.href) === pathname;
          if (item.href === "/contact-us/") {
            return (
              <li key={item.href} className="ml-3">
                <Link prefetch={false} href={item.href} aria-current={current ? "page" : undefined} className="btn btn-primary">
                  Contact us
                </Link>
              </li>
            );
          }
          return (
            <li key={item.href}>
              <Link
                prefetch={false}
                href={item.href}
                aria-current={current ? "page" : undefined}
                className="relative inline-flex min-h-11 items-center px-3 font-ui text-[0.9375rem] font-medium text-ink no-underline transition-colors hover:text-gold-700 aria-[current=page]:text-gold-700 aria-[current=page]:after:absolute aria-[current=page]:after:inset-x-3 aria-[current=page]:after:bottom-1.5 aria-[current=page]:after:h-0.5 aria-[current=page]:after:bg-gold-700"
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    );
  }

  return (
    <ul className="divide-y divide-line">
      {primaryNav.map((item) => {
        const current = normalize(item.href) === pathname;
        return (
          <li key={item.href}>
            <Link
              prefetch={false}
              href={item.href}
              aria-current={current ? "page" : undefined}
              className="flex min-h-12 items-center py-2 font-ui text-lg font-medium text-ink no-underline hover:text-gold-700 aria-[current=page]:text-gold-700 aria-[current=page]:underline aria-[current=page]:decoration-2 aria-[current=page]:underline-offset-4"
            >
              {item.label === "Contact" ? "Contact us" : item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
