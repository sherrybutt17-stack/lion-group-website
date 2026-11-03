"use client";

import { useEffect, useState } from "react";

export const MOTION_KEY = "tlg-motion-paused";
const EVENT = "tlg-motion-change";

export function isMotionPaused() {
  return typeof document !== "undefined" && document.documentElement.classList.contains("motion-paused");
}

export function setMotionPaused(paused: boolean) {
  document.documentElement.classList.toggle("motion-paused", paused);
  try {
    localStorage.setItem(MOTION_KEY, paused ? "1" : "0");
  } catch {
    // Storage can be unavailable (private mode); the class still applies for this page.
  }
  window.dispatchEvent(new CustomEvent(EVENT, { detail: paused }));
}

/** True when the visitor paused animation with the site's pause control. */
export function useMotionPaused() {
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    // Sync with the class the boot script set before paint.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPaused(isMotionPaused());
    const onChange = (e: Event) => setPaused((e as CustomEvent<boolean>).detail);
    window.addEventListener(EVENT, onChange);
    return () => window.removeEventListener(EVENT, onChange);
  }, []);
  return paused;
}

/**
 * True once ambient effects may start: motion allowed, page loaded, and either
 * the visitor has interacted (pointer, touch, scroll, key) or 6s have passed.
 * Heavy WebGL setup therefore never competes with loading or the first tap.
 */
export function useIdleMotionReady() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const events = ["pointermove", "pointerdown", "touchstart", "keydown", "scroll", "wheel"] as const;
    let done = false;
    let idleId = 0;
    let timer = 0;
    const idle = (window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number }).requestIdleCallback;
    const start = () => {
      if (done) return;
      done = true;
      events.forEach((e) => window.removeEventListener(e, start));
      window.clearTimeout(timer);
      if (idle) idleId = idle(() => setReady(true), { timeout: 1500 });
      else timer = window.setTimeout(() => setReady(true), 300);
    };
    const arm = () => {
      events.forEach((e) => window.addEventListener(e, start, { passive: true, once: true }));
      timer = window.setTimeout(start, 6000);
    };
    if (document.readyState === "complete") arm();
    else window.addEventListener("load", arm, { once: true });
    return () => {
      done = true;
      window.removeEventListener("load", arm);
      events.forEach((e) => window.removeEventListener(e, start));
      const cancel = (window as Window & { cancelIdleCallback?: (id: number) => void }).cancelIdleCallback;
      if (idleId && cancel) cancel(idleId);
      window.clearTimeout(timer);
    };
  }, []);
  return ready;
}
