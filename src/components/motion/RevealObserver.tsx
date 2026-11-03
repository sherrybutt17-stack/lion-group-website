"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { inView } from "motion";
import { animate } from "motion/mini";

/**
 * One-time reveal for elements marked [data-reveal]. CSS hides them only after
 * JS has run and when motion is allowed; reduced-motion users and no-JS
 * visitors always see the content immediately.
 */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("reveal-ready");
    if (root.classList.contains("reveal-off") || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const targets = document.querySelectorAll<HTMLElement>("[data-reveal]:not([data-revealed])");
    const stops = Array.from(targets).map((el) =>
      inView(
        el,
        () => {
          el.setAttribute("data-revealed", "");
          animate(
            el,
            { opacity: [0, 1], transform: ["translateY(12px)", "translateY(0)"] },
            { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
          );
        },
        { amount: 0.1 },
      ),
    );
    return () => stops.forEach((stop) => stop());
  }, [pathname]);

  return null;
}
