"use client";

import { useEffect, useRef, useState } from "react";
import { animate, scroll, type AnimationPlaybackControls } from "motion";
import { useMotionPaused } from "../../effects/motionPreference";
import { Pause, Play } from "lucide-react";

interface MarqueeProps {
  items: string[];
  label: string;
  className?: string;
  itemClassName?: string;
  /** Speed up (and reverse) with scroll velocity. */
  velocity?: boolean;
}

/**
 * Slow, looping text band. Moving content gets a visible pause control
 * (WCAG 2.2.2), stops on hover/focus, and is static for reduced motion or
 * without JavaScript. The moving copy is hidden from screen readers; the
 * items are provided once as plain text instead.
 */
export function Marquee({ items, label, className = "", itemClassName = "", velocity = false }: MarqueeProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const controls = useRef<AnimationPlaybackControls | null>(null);
  const [enabled, setEnabled] = useState(false);
  const [paused, setPaused] = useState(false);
  const globalPaused = useMotionPaused();

  useEffect(() => {
    const track = trackRef.current;
    if (!track || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    controls.current = animate(track, { transform: ["translateX(0%)", "translateX(-50%)"] }, { duration: 38, repeat: Infinity, ease: "linear" });
    // Show the pause control only once there is an animation to pause.
    setEnabled(true);
    let stopScroll: (() => void) | undefined;
    if (velocity) {
      stopScroll = scroll((_, info) => {
        if (!controls.current) return;
        const v = info.y.velocity;
        const target = Math.max(-6, Math.min(6, 1 + v / 450));
        controls.current.speed = Math.abs(target) < 0.4 ? (target < 0 ? -0.4 : 1) : target;
      });
    }
    return () => {
      stopScroll?.();
      controls.current?.stop();
    };
  }, [velocity]);

  useEffect(() => {
    if (!controls.current) return;
    if (globalPaused || paused) controls.current.pause();
    else controls.current.play();
  }, [globalPaused, paused]);

  const toggle = () => setPaused(!paused);

  const hold = (stop: boolean) => {
    if (!controls.current || paused || globalPaused) return;
    if (stop) controls.current.pause();
    else controls.current.play();
  };

  const row = items.map((item, i) => (
    <span key={`${item}-${i}`} className={`flex shrink-0 items-center gap-8 pr-8 ${itemClassName}`}>
      {item}
      <span aria-hidden="true" className="text-c-accent">
        ✦
      </span>
    </span>
  ));

  return (
    <div
      role="region"
      aria-label={label}
      className={`relative overflow-hidden ${className}`}
      onPointerEnter={() => hold(true)}
      onPointerLeave={() => hold(false)}
    >
      <p className="sr-only">{items.join(", ")}</p>
      <div ref={trackRef} aria-hidden="true" className="flex w-max">
        {row}
        {row}
      </div>
      {enabled && (
        <button
          type="button"
          onClick={toggle}
          aria-pressed={paused}
          className="absolute right-3 top-1/2 z-10 inline-flex min-h-11 -translate-y-1/2 items-center gap-2 rounded-full border border-c-line bg-c-bg px-4 font-ui text-sm font-semibold text-c-ink"
        >
          {paused ? <Play aria-hidden="true" className="size-4" /> : <Pause aria-hidden="true" className="size-4" />}
          {paused ? "Play" : "Pause"}
          <span className="sr-only"> scrolling text</span>
        </button>
      )}
    </div>
  );
}
