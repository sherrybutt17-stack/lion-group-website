"use client";

import { useEffect, useState } from "react";
import { Pause, Play } from "lucide-react";
import { setMotionPaused, useMotionPaused } from "./motionPreference";

/**
 * Site-wide control to pause ambient animation (WebGL backgrounds, shimmer,
 * marquees) — WCAG 2.2.2 Pause, Stop, Hide. Hidden for reduced-motion users,
 * who never get ambient animation in the first place.
 */
export function MotionPause() {
  const paused = useMotionPaused();
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Shown only where ambient motion can actually run.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setShow(!window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  if (!show) return null;
  return (
    <button
      type="button"
      onClick={() => setMotionPaused(!paused)}
      aria-pressed={paused}
      className="no-print fixed bottom-4 right-4 z-[60] inline-flex min-h-11 items-center gap-2 rounded-full border border-white/15 bg-[#1a1a1a] px-4 font-ui text-sm font-semibold text-white shadow-lg"
    >
      {paused ? <Play aria-hidden="true" className="size-4 text-gold-400" /> : <Pause aria-hidden="true" className="size-4 text-gold-400" />}
      {paused ? "Play animation" : "Pause animation"}
    </button>
  );
}
