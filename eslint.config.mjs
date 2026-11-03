import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  // Third-party components vendored from React Bits are kept close to upstream.
  globalIgnores([".next/**", "out/**", "reports/**", "next-env.d.ts", "src/vendor/**"]),
]);
