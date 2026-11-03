"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { animate, stagger } from "motion";
import { Mail, Menu, Phone, X } from "lucide-react";
import { primaryNav, site } from "@/content/site";
import { withConcept, type ConceptId } from "@/concepts/config";

const normalize = (path: string) => (path.length > 1 ? path.replace(/\/+$/, "") : path);

/**
 * Full-screen mobile menu on <details>/<summary> (works without JS). With JS it
 * locks page scroll while open, closes on Escape and navigation, and staggers
 * the links in.
 */
export function ConceptMobileMenu({ concept, buttonClassName }: { concept: ConceptId; buttonClassName: string }) {
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const current = normalize(pathname ?? "/");

  useEffect(() => {
    const details = detailsRef.current;
    if (details?.open) details.open = false;
    document.body.classList.remove("menu-open");
  }, [pathname]);

  useEffect(() => {
    const details = detailsRef.current;
    const panel = panelRef.current;
    if (!details || !panel) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");

    const onToggle = () => {
      document.body.classList.toggle("menu-open", details.open);
      if (details.open && !reduce.matches) {
        animate(panel, { opacity: [0, 1] }, { duration: 0.25 });
        animate(Array.from(panel.querySelectorAll("[data-menu-item]")), { opacity: [0, 1], transform: ["translateY(18px)", "translateY(0)"] }, { duration: 0.6, delay: stagger(0.05, { startDelay: 0.05 }), ease: [0.22, 1, 0.36, 1] });
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && details.open) {
        details.open = false;
        details.querySelector("summary")?.focus();
      }
    };
    details.addEventListener("toggle", onToggle);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      details.removeEventListener("toggle", onToggle);
      document.removeEventListener("keydown", onKeyDown);
      document.body.classList.remove("menu-open");
    };
  }, []);

  return (
    <details ref={detailsRef} className="group nav:hidden">
      <summary className={`inline-flex min-h-11 list-none items-center gap-2 rounded-full px-4 font-ui font-semibold [&::marker]:hidden ${buttonClassName}`}>
        <Menu aria-hidden="true" className="size-5 group-open:hidden" />
        <X aria-hidden="true" className="hidden size-5 group-open:block" />
        <span>Menu</span>
      </summary>
      <div ref={panelRef} className="fixed inset-x-0 bottom-0 top-[var(--header-h,4.5rem)] z-50 overflow-y-auto bg-c-bg">
        <nav aria-label="Primary" className="container-page flex min-h-full flex-col justify-between gap-10 pb-10 pt-6">
          <ul>
            {primaryNav.map((item, i) => {
              const href = withConcept(concept, item.href);
              return (
                <li key={item.href} data-menu-item className="border-b border-c-line">
                  <Link
                    prefetch={false}
                    href={href}
                    aria-current={normalize(href) === current ? "page" : undefined}
                    className="flex min-h-16 items-baseline gap-4 py-3 font-serif text-[clamp(1.75rem,7vw,2.5rem)] leading-tight text-c-ink aria-[current=page]:text-c-accent"
                  >
                    <span aria-hidden="true" className="font-ui text-sm text-c-accent">
                      0{i + 1}
                    </span>
                    {item.label === "Contact" ? "Contact us" : item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <ul data-menu-item className="space-y-1 text-c-muted">
            <li>
              <a href={site.contact.phoneHref} className="inline-flex min-h-11 items-center gap-3 text-c-ink">
                <Phone aria-hidden="true" className="size-4 text-c-accent" />
                {site.contact.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.contact.email}`} className="inline-flex min-h-11 items-center gap-3 text-c-ink [overflow-wrap:anywhere]">
                <Mail aria-hidden="true" className="size-4 shrink-0 text-c-accent" />
                {site.contact.email}
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </details>
  );
}
