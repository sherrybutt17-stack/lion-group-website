"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { animate } from "motion/mini";
import { Mail, Menu, Phone, X } from "lucide-react";
import { site } from "@/content/site";
import { NavList } from "./NavList";

/**
 * Mobile navigation built on <details>/<summary> so it opens without JavaScript.
 * With JS it also closes on Escape, outside click and navigation, and fades in.
 */
export function MobileMenu() {
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    detailsRef.current?.removeAttribute("open");
  }, [pathname]);

  useEffect(() => {
    const details = detailsRef.current;
    const panel = panelRef.current;
    if (!details || !panel) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && details.open) {
        details.open = false;
        details.querySelector("summary")?.focus();
      }
    };
    const onClick = (event: MouseEvent) => {
      if (details.open && !details.contains(event.target as Node)) details.open = false;
    };
    const onToggle = () => {
      if (details.open && !reduceMotion.matches) {
        animate(panel, { opacity: [0, 1], transform: ["translateY(-6px)", "translateY(0)"] }, { duration: 0.2, ease: "easeOut" });
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("click", onClick);
    details.addEventListener("toggle", onToggle);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("click", onClick);
      details.removeEventListener("toggle", onToggle);
    };
  }, []);

  return (
    <details ref={detailsRef} className="group nav:hidden">
      <summary className="btn btn-secondary list-none gap-1.5 px-3 min-[360px]:gap-2 min-[360px]:px-4 [&::marker]:hidden">
        <Menu aria-hidden="true" className="size-5 group-open:hidden" />
        <X aria-hidden="true" className="hidden size-5 group-open:block" />
        <span>Menu</span>
      </summary>
      <div
        ref={panelRef}
        className="absolute inset-x-0 top-full z-50 border-y border-line bg-white shadow-[0_18px_30px_-20px_rgb(49_28_32/0.45)]"
      >
        <nav aria-label="Primary" className="container-page pb-6 pt-2">
          <NavList variant="mobile" />
          <ul className="mt-4 space-y-1 border-t border-line pt-4 text-[0.9375rem]">
            <li>
              <a href={site.contact.phoneHref} className="inline-flex min-h-11 items-center gap-2 text-ink">
                <Phone aria-hidden="true" className="size-4 text-gold-700" />
                {site.contact.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.contact.email}`} className="inline-flex min-h-11 items-center gap-2 [overflow-wrap:anywhere] text-ink">
                <Mail aria-hidden="true" className="size-4 shrink-0 text-gold-700" />
                {site.contact.email}
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </details>
  );
}
