"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Picture } from "../Picture";
import { useIdleMotionReady, useMotionPaused } from "./motionPreference";

const MetallicPaint = dynamic(() => import("@/vendor/react-bits/MetallicPaint"), { ssr: false });

/**
 * The gold lion mark rendered as liquid metal. The real logo image is always
 * server-rendered underneath; the WebGL version cross-fades in once effects may
 * start, on larger fine-pointer screens only, and never for reduced motion or
 * when animation is paused.
 */
export function MetallicLogo({ className = "", sizes = "320px", priority = false }: { className?: string; sizes?: string; priority?: boolean }) {
  const ready = useIdleMotionReady();
  const paused = useMotionPaused();
  const [capable, setCapable] = useState(false);
  useEffect(() => {
    // A second WebGL context is skipped on phones and touch devices.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCapable(window.matchMedia("(min-width: 768px) and (pointer: fine)").matches);
  }, []);
  const live = ready && !paused && capable;

  return (
    <div aria-hidden="true" className={`relative aspect-[825/777] ${className}`}>
      <div className={`absolute inset-0 transition-opacity duration-1000 ${live ? "opacity-0 delay-700" : "opacity-100"}`}>
        <div className="sheen h-full w-full">
          <Picture name="logo-lion-L" alt="" sizes={sizes} priority={priority} className="h-full w-full object-contain" />
        </div>
      </div>
      {live && (
        <div className="shader-fade-in absolute inset-0 [&_canvas]:!h-full [&_canvas]:!w-full">
          <MetallicPaint
            imageSrc="/images/logo-lion-L-depth.png"
            lightColor="#fff6d6"
            darkColor="#311c20"
            tintColor="#dcad18"
            speed={0.25}
            liquid={0.6}
            brightness={1.7}
            contrast={0.6}
            scale={3.5}
            chromaticSpread={0.6}
            fresnel={1.2}
            mouseAnimation={false}
          />
        </div>
      )}
    </div>
  );
}
