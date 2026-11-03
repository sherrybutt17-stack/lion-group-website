// Runs Lighthouse against the static production build (served by `npm run start`)
// on mobile and desktop, several runs per page, and reports the median.
// Usage: npm run build && npm run start (another terminal) && npm run lighthouse
import { execFile } from "node:child_process";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { promisify } from "node:util";
import { chromium } from "@playwright/test";

const run = promisify(execFile);
const root = path.resolve(import.meta.dirname, "..");
const BASE = process.env.LH_BASE_URL ?? "http://localhost:4173";
// Baseline home plus each concept's home and a service page (override with LH_PAGES="/a/,/b/").
const PAGES = process.env.LH_PAGES?.split(",") ?? ["/", "/a/", "/d/", "/a/dodd-agency-provider/", "/d/dodd-agency-provider/", "/a/careers/", "/d/contact-us/"];
const RUNS = Number(process.env.LH_RUNS ?? 3);
const OUT_DIR = path.join(root, "reports/lighthouse");
const chromePath = process.env.CHROME_PATH ?? chromium.executablePath();
const lighthouseBin = path.join(root, "node_modules/.bin/lighthouse");

await mkdir(OUT_DIR, { recursive: true });

// Preflight: every page and the CSS/JS it references must load, so a stale or
// half-built out/ can never produce (unstyled) numbers.
for (const page of PAGES) {
  const res = await fetch(BASE + page);
  if (!res.ok) throw new Error(`Preflight: ${page} returned ${res.status}`);
  const html = await res.text();
  const assets = [...html.matchAll(/(?:href|src)="(\/_next\/static\/[^"]+\.(?:css|js))"/g)].map((m) => m[1]);
  for (const asset of new Set(assets)) {
    const r = await fetch(BASE + asset);
    if (!r.ok) throw new Error(`Preflight: ${page} references ${asset} which returned ${r.status}. Rebuild and restart the server.`);
  }
}

const median = (xs) => {
  const s = [...xs].sort((a, b) => a - b);
  return s[Math.floor(s.length / 2)];
};

const rows = [];
for (const preset of ["mobile", "desktop"]) {
  for (const page of PAGES) {
    const runs = [];
    for (let i = 0; i < RUNS; i++) {
      const name = `${preset}-${page === "/" ? "home" : page.replace(/^\/|\/$/g, "").replace(/\//g, "-")}-${i + 1}`;
      const outPath = path.join(OUT_DIR, `${name}.json`);
      const args = [
        BASE + page,
        "--output=json",
        `--output-path=${outPath}`,
        "--quiet",
        "--only-categories=performance,accessibility,best-practices,seo",
        "--chrome-flags=--headless=new --no-first-run --no-default-browser-check",
      ];
      if (preset === "desktop") args.push("--preset=desktop");
      await run(lighthouseBin, args, { env: { ...process.env, CHROME_PATH: chromePath }, maxBuffer: 64 * 1024 * 1024 });
      const lhr = JSON.parse(await readFile(outPath, "utf8"));
      const a = lhr.audits;
      runs.push({
        perf: Math.round(lhr.categories.performance.score * 100),
        a11y: Math.round(lhr.categories.accessibility.score * 100),
        bp: Math.round(lhr.categories["best-practices"].score * 100),
        seo: Math.round(lhr.categories.seo.score * 100),
        fcp: a["first-contentful-paint"].numericValue,
        lcp: a["largest-contentful-paint"].numericValue,
        tbt: a["total-blocking-time"].numericValue,
        cls: a["cumulative-layout-shift"].numericValue,
        si: a["speed-index"].numericValue,
        lcpElement: a["lcp-breakdown-insight"]?.details?.items?.find((i) => i.type === "node")?.nodeLabel ?? "",
        lhVersion: lhr.lighthouseVersion,
        chromeUA: lhr.environment?.hostUserAgent ?? "",
        throttling: lhr.configSettings.throttlingMethod,
      });
      process.stdout.write(`${name}: perf ${runs.at(-1).perf}\n`);
    }
    const pick = (k) => median(runs.map((r) => r[k]));
    rows.push({
      preset,
      page,
      perf: pick("perf"),
      perfAll: runs.map((r) => r.perf).join("/"),
      a11y: pick("a11y"),
      bp: pick("bp"),
      seo: pick("seo"),
      fcp: pick("fcp"),
      lcp: pick("lcp"),
      tbt: pick("tbt"),
      cls: pick("cls"),
      si: pick("si"),
      lcpElement: runs[0].lcpElement,
      meta: runs[0],
    });
  }
}

const ms = (v) => `${(v / 1000).toFixed(2)} s`;
const meta = rows[0].meta;
const md = [
  `# Lighthouse results (${new Date().toISOString()})`,
  "",
  `- Lighthouse ${meta.lhVersion}, ${RUNS} runs per page, median shown (all performance runs in brackets).`,
  `- Target: ${BASE} (static \`out/\` build served locally by \`serve\`). Lab data, not field Core Web Vitals.`,
  `- Mobile: Lighthouse default emulation (Moto G Power, slow 4G, 4x CPU slowdown, ${meta.throttling} throttling). Desktop: \`--preset=desktop\`.`,
  `- Browser: ${meta.chromeUA}`,
  `- Machine: ${os.cpus()[0]?.model ?? "unknown CPU"}, ${os.cpus().length} cores, ${os.platform()} ${os.release()}.`,
  "- SEO is expected to lose points: the mockup is deliberately `noindex, nofollow`.",
  "",
  "| Device | Page | Perf | A11y | Best pr. | SEO | FCP | LCP | TBT | CLS | Speed Index | LCP element |",
  "|---|---|---|---|---|---|---|---|---|---|---|---|",
  ...rows.map(
    (r) =>
      `| ${r.preset} | \`${r.page}\` | **${r.perf}** (${r.perfAll}) | ${r.a11y} | ${r.bp} | ${r.seo} | ${ms(r.fcp)} | ${ms(r.lcp)} | ${Math.round(r.tbt)} ms | ${r.cls.toFixed(3)} | ${ms(r.si)} | ${r.lcpElement.slice(0, 50)} |`,
  ),
].join("\n");

await writeFile(path.join(root, "reports/lighthouse-summary.md"), md + "\n");
console.log("\n" + md);
