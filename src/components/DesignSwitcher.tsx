"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Layers } from "lucide-react";
import { primaryNav } from "@/content/site";
import { concepts, stripConcept, withConcept } from "@/concepts/config";

const knownPaths = new Set(primaryNav.map((item) => item.href));

/**
 * Floating review tool for switching between the baseline and the three design
 * concepts on the equivalent page. Not part of the production site.
 */
export function DesignSwitcher() {
  const pathname = usePathname() ?? "/";
  // Map to the same page in each concept; unknown pages (e.g. 404) go to each homepage.
  const stripped = stripConcept(pathname);
  const withSlash = stripped.endsWith("/") ? stripped : `${stripped}/`;
  const base = knownPaths.has(withSlash) ? withSlash : "/";
  const activeId = pathname.match(/^\/([a-e])(\/|$)/)?.[1] ?? "baseline";
  const options = [
    { id: "baseline", label: "Baseline", href: base },
    ...concepts.map((c) => ({ id: c.id, label: `${c.id.toUpperCase()} · ${c.name}`, href: withConcept(c.id, base) })),
  ];
  const active = options.find((o) => o.id === activeId) ?? options[0];

  return (
    <details className="no-print group fixed bottom-4 left-4 z-[60] font-ui text-sm">
      <summary className="inline-flex min-h-11 list-none items-center gap-2 rounded-full border border-white/15 bg-[#1a1a1a] px-4 font-semibold text-white shadow-lg [&::marker]:hidden">
        <Layers aria-hidden="true" className="size-4 text-gold-400" />
        <span>
          Design: {active.label}
          <span className="sr-only"> (switch design concept)</span>
        </span>
      </summary>
      <nav
        aria-label="Design concepts"
        className="absolute bottom-full left-0 mb-2 w-64 rounded-2xl border border-white/15 bg-[#1a1a1a] p-2 text-white shadow-2xl"
      >
        <ul>
          {options.map((o) => (
            <li key={o.id}>
              <Link
                prefetch={false}
                href={o.href}
                aria-current={o.id === activeId ? "page" : undefined}
                className="flex min-h-11 items-center justify-between rounded-xl px-3 hover:bg-white/10 aria-[current=page]:bg-white/10 aria-[current=page]:text-gold-200"
              >
                {o.label}
                {o.id === activeId && <span aria-hidden="true">●</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </details>
  );
}
