"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { animate, inView, scroll, stagger } from "motion";

type Cleanup = () => void;

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Motion director for the design concepts. Pages stay server-rendered and opt
 * in with data attributes:
 *   data-header            header gets data-scrolled after scrolling
 *   data-reveal            fade/slide in once ("clip" = wipe up)
 *   data-reveal-group      staggers its [data-reveal-item] children
 *   data-scroll-words      words brighten as the block scrolls through
 *   data-parallax="-40"    translateY in px across the section's scroll
 *   data-scroll-rotate     rotates (deg) across the page scroll
 *   data-progress="y|x"    scales 0 → 1 across its section
 *   data-stack-panel       previous panel recedes as the next one covers it
 *   data-draw              SVG paths draw in once
 *   data-magnetic          button follows the pointer slightly (fine pointers)
 *   data-tilt              card tilts toward the pointer (fine pointers)
 *   data-spotlight         radial glow follows the pointer
 *   data-click-spark       gold sparks burst from each click inside the element
 * Nothing is hidden without JS, and reduced-motion users get static content.
 */
export function ConceptMotion() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("reveal-ready");
    const cleanups: Cleanup[] = [];
    const all = (selector: string) => Array.from(document.querySelectorAll<HTMLElement>(selector));

    // Header state is useful even with reduced motion.
    const header = document.querySelector<HTMLElement>("[data-header]");
    const onScroll = () => header?.toggleAttribute("data-scrolled", window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    cleanups.push(() => window.removeEventListener("scroll", onScroll));

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || root.classList.contains("reveal-off") || root.classList.contains("motion-paused")) {
      return () => cleanups.forEach((c) => c());
    }

    // One-time reveals. Clipped elements are observed through their parent:
    // IntersectionObserver treats a fully clipped target as not visible.
    for (const el of all("[data-reveal]:not([data-revealed])")) {
      const target = el.dataset.reveal === "clip" ? (el.parentElement ?? el) : el;
      cleanups.push(
        inView(
          target,
          () => {
            el.setAttribute("data-revealed", "");
            if (el.dataset.reveal === "clip") {
              animate(el, { clipPath: ["inset(100% 0 0 0)", "inset(0% 0 0 0)"] }, { duration: 1.1, ease: EASE });
            } else {
              animate(el, { opacity: [0, 1], transform: ["translateY(28px)", "translateY(0)"] }, { duration: 0.9, ease: EASE });
            }
          },
          { amount: 0.12 },
        ),
      );
    }

    for (const group of all("[data-reveal-group]")) {
      const items = Array.from(group.querySelectorAll<HTMLElement>("[data-reveal-item]:not([data-revealed])"));
      if (!items.length) continue;
      cleanups.push(
        inView(
          group,
          () => {
            items.forEach((item) => item.setAttribute("data-revealed", ""));
            animate(items, { opacity: [0, 1], transform: ["translateY(24px)", "translateY(0)"] }, { duration: 0.8, ease: EASE, delay: stagger(0.09) });
          },
          { amount: 0.15 },
        ),
      );
    }

    // Scroll-linked effects.
    for (const block of all("[data-scroll-words]")) {
      const words = Array.from(block.querySelectorAll<HTMLElement>("[data-word]"));
      if (!words.length) continue;
      const step = 1 / words.length;
      const animation = animate(words, { opacity: [0.6, 1] }, { duration: step * 4, delay: stagger(step), ease: "linear" });
      cleanups.push(scroll(animation, { target: block, offset: ["start 85%", "end 55%"] }));
    }

    for (const el of all("[data-parallax]")) {
      const distance = Number(el.dataset.parallax) || -40;
      const target = el.closest("section") ?? el;
      const animation = animate(el, { transform: ["translateY(0px)", `translateY(${distance}px)`] }, { ease: "linear" });
      cleanups.push(scroll(animation, { target, offset: ["start start", "end start"] }));
    }

    for (const el of all("[data-scroll-rotate]")) {
      const degrees = Number(el.getAttribute("data-scroll-rotate")) || 12;
      const animation = animate(el, { transform: ["rotate(0deg)", `rotate(${degrees}deg)`] }, { ease: "linear" });
      cleanups.push(scroll(animation, { offset: ["start start", "end end"] }));
    }

    for (const el of all("[data-progress]")) {
      const axis = el.dataset.progress === "x" ? "scaleX" : "scaleY";
      const target = el.closest("section") ?? el;
      const animation = animate(el, { transform: [`${axis}(0)`, `${axis}(1)`] }, { ease: "linear" });
      cleanups.push(scroll(animation, { target, offset: ["start 65%", "end 70%"] }));
    }

    const panels = all("[data-stack-panel]");
    panels.forEach((panel, index) => {
      const next = panels[index + 1];
      if (!next) return;
      const animation = animate(panel, { transform: ["scale(1)", "scale(0.93)"], opacity: [1, 0.55] }, { ease: "linear" });
      cleanups.push(scroll(animation, { target: next, offset: ["start end", "start 96px"] }));
    });

    for (const svg of all("[data-draw]")) {
      cleanups.push(
        inView(
          svg,
          () => {
            svg.setAttribute("data-revealed", "");
            animate(Array.from(svg.querySelectorAll("path")), { strokeDashoffset: [1, 0] }, { duration: 1.4, ease: EASE, delay: stagger(0.2) });
          },
          { amount: 0.4 },
        ),
      );
    }

    // Pointer effects: only for devices with a precise pointer.
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      for (const el of all("[data-magnetic]")) {
        const move = (e: PointerEvent) => {
          const r = el.getBoundingClientRect();
          const x = (e.clientX - (r.left + r.width / 2)) * 0.22;
          const y = (e.clientY - (r.top + r.height / 2)) * 0.32;
          animate(el, { transform: `translate(${x}px, ${y}px)` }, { duration: 0.35, ease: EASE });
        };
        const leave = () => animate(el, { transform: "translate(0px, 0px)" }, { duration: 0.6, ease: EASE });
        el.addEventListener("pointermove", move);
        el.addEventListener("pointerleave", leave);
        cleanups.push(() => {
          el.removeEventListener("pointermove", move);
          el.removeEventListener("pointerleave", leave);
        });
      }

      for (const el of all("[data-tilt]")) {
        const move = (e: PointerEvent) => {
          const r = el.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width - 0.5;
          const py = (e.clientY - r.top) / r.height - 0.5;
          animate(el, { transform: `perspective(900px) rotateX(${(-py * 6).toFixed(2)}deg) rotateY(${(px * 8).toFixed(2)}deg)` }, { duration: 0.4, ease: EASE });
        };
        const leave = () => animate(el, { transform: "perspective(900px) rotateX(0deg) rotateY(0deg)" }, { duration: 0.8, ease: EASE });
        el.addEventListener("pointermove", move);
        el.addEventListener("pointerleave", leave);
        cleanups.push(() => {
          el.removeEventListener("pointermove", move);
          el.removeEventListener("pointerleave", leave);
        });
      }

      for (const el of all("[data-spotlight]")) {
        let frame = 0;
        const move = (e: PointerEvent) => {
          cancelAnimationFrame(frame);
          frame = requestAnimationFrame(() => {
            const r = el.getBoundingClientRect();
            el.style.setProperty("--mx", `${e.clientX - r.left}px`);
            el.style.setProperty("--my", `${e.clientY - r.top}px`);
          });
        };
        el.addEventListener("pointermove", move);
        cleanups.push(() => el.removeEventListener("pointermove", move));
      }
    }

    // Gold click sparks (decorative, pointer-only).
    for (const area of all("[data-click-spark]")) {
      const onClick = (e: MouseEvent) => {
        if (e.detail === 0) return; // keyboard "clicks"
        for (let i = 0; i < 8; i++) {
          const spark = document.createElement("span");
          spark.setAttribute("aria-hidden", "true");
          spark.className = "pointer-events-none fixed z-[70] h-3 w-0.5 rounded-full bg-gold-400";
          spark.style.left = `${e.clientX}px`;
          spark.style.top = `${e.clientY}px`;
          const angle = (i / 8) * 360;
          document.body.appendChild(spark);
          animate(
            spark,
            {
              transform: [`translate(-50%,-50%) rotate(${angle}deg) translateY(0px) scaleY(1)`, `translate(-50%,-50%) rotate(${angle}deg) translateY(-26px) scaleY(0.2)`],
              opacity: [1, 0],
            },
            { duration: 0.45, ease: "easeOut" },
          ).then(() => spark.remove());
        }
      };
      area.addEventListener("click", onClick);
      cleanups.push(() => area.removeEventListener("click", onClick));
    }

    return () => cleanups.forEach((c) => c());
  }, [pathname]);

  return null;
}
