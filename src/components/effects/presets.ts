// Brand-tuned settings for the React Bits WebGL backgrounds (palette only:
// #311c20 #38272a #7e6821 #bd9337 #dcad18 #f2d471 #fbfbfb).

export const LIGHT_RAYS = {
  raysOrigin: "top-center",
  raysColor: "#f2d471",
  raysSpeed: 0.6,
  lightSpread: 0.85,
  rayLength: 1.6,
  fadeDistance: 1.1,
  followMouse: true,
  mouseInfluence: 0.08,
  noiseAmount: 0.06,
  distortion: 0.05,
};

// Threads take an RGB triple (0–1): brand gold #dcad18.
export const GOLD_THREADS = { color: [0.86, 0.68, 0.09], amplitude: 1.1, distance: 0.15, enableMouseInteraction: true };

export const GOLD_GRAIN = {
  color1: "#311c20",
  color2: "#7e6821",
  color3: "#dcad18",
  timeSpeed: 0.16,
  warpStrength: 1.1,
  warpSpeed: 1.6,
  grainAmount: 0.07,
  contrast: 1.25,
  zoom: 0.85,
};

export const MOLTEN_GOLD = {
  color1: "#0a0a0a",
  color2: "#bd9337",
  color3: "#fff6d6",
  speed: 0.26,
  scale: 3.2,
  glow: 1.25,
  brightness: 1.05,
  blackPoint: 0.08,
  grainIntensity: 0.04,
  mouseStrength: 0.22,
};

export const GOLD_TOPOGRAPHY = {
  lowColor: "#bd9337",
  midColor: "#dcad18",
  highColor: "#7e6821",
  speed: 0.22,
  bands: 2.4,
  thickness: 0.009,
  glow: 0.15,
  contrast: 2.6,
  opacity: 0.55,
  grain: false,
  mouseStrength: 0.3,
};
