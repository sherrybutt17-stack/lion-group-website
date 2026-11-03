import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static HTML export: the mockup ships as plain files in out/.
  output: "export",
  // Match the existing WordPress URL style (/about-us/).
  trailingSlash: true,
  // Images are pre-optimized to AVIF/WebP by scripts/optimize-images.mjs.
  images: { unoptimized: true },
  poweredByHeader: false,
  reactStrictMode: true,
};

export default nextConfig;
