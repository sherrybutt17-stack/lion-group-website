"use client";

import dynamic from "next/dynamic";
import { useMotionPaused, useIdleMotionReady } from "./motionPreference";

// Each effect is code-split and only downloaded when it is about to run.
const effects = {
  "light-rays": dynamic(() => import("@/vendor/react-bits/LightRays"), { ssr: false }),
  threads: dynamic(() => import("@/vendor/react-bits/Threads"), { ssr: false }),
  grainient: dynamic(() => import("@/vendor/react-bits/Grainient"), { ssr: false }),
  molten: dynamic(() => import("@/vendor/react-bits/MoltenMetal"), { ssr: false }),
  topography: dynamic(() => import("@/vendor/react-bits/Topography"), { ssr: false }),
} as const;

export type ShaderEffect = keyof typeof effects;

interface ShaderStageProps {
  effect: ShaderEffect;
  /** Props passed to the React Bits component (colours, speed, …). */
  settings?: Record<string, unknown>;
  /** Static background shown before, instead of, and underneath the effect. */
  fallbackClassName?: string;
  className?: string;
}

/**
 * Decorative WebGL background. The static fallback is server-rendered; the
 * effect mounts only after load + idle, never for reduced motion, and unmounts
 * when the visitor pauses animation. Never carries content.
 */
export function ShaderStage({ effect, settings = {}, fallbackClassName = "", className = "" }: ShaderStageProps) {
  const ready = useIdleMotionReady();
  const paused = useMotionPaused();
  const Effect = effects[effect] as React.ComponentType<Record<string, unknown>>;

  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <div className={`absolute inset-0 ${fallbackClassName}`} />
      {ready && !paused && (
        <div className="shader-fade-in pointer-events-auto absolute inset-0">
          <Effect {...settings} />
        </div>
      )}
    </div>
  );
}
