// Guards the two-service scope. Fails if any removed service, or an
// unverified claim, appears in the source or the built pages, and checks that
// navigation and the footer's Useful Links contain only approved items.
// Usage: npm run build && npm run check:services
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const OUT = path.join(root, "out");
const SRC = path.join(root, "src");

// Services that were removed from the site. Checked everywhere, including
// metadata, structured data and the inline React payload.
const SERVICE_TERMS = [
  /real\s+estate/i,
  /realtor/i,
  /\binvest(ing|ment|ments|or|ors)?\b/i,
  /faith/i,
  /fortune\s+club/i,
  /business\s+development/i,
  /business\s+(&|&amp;|and)\s+life/i,
  /learn(ing)?\s+to\s+lead/i,
  /extreme\s+relation/i,
  /strategy\s+planning/i,
  /business\s+counsel/i,
  /media\s+stream/i,
  /live\s+(media|stream)/i,
  /mental\s+wellness/i,
  /life\s+coach/i,
  /success\s+coach/i,
  /business\s+coach/i,
  /\bour\s+program\b/i,
  /life\s+solution/i,
  /life\s+services/i,
  /marketing/i,
  /instructor/i,
  /student\s+registration/i,
  /checkout/i,
  /\bcart\b/i,
  /get\s+a\s+quote/i,
  /join\s+now/i,
  /make\s+an\s+appointment/i,
];

// Unverified claims. Checked in visible page text and in the content source,
// with reviewer notes (role="note") removed because they describe what is withheld.
const CLAIM_TERMS = [
  /\blicensed\b/i,
  /\blicensure\b/i,
  /\b\d+\s*\+?\s*(years|yrs)\b/i,
  /24\s*\/\s*7/,
  /\b24\s*(hrs|hours)\b/i,
  /round-the-clock/i,
  /on-call/i,
  /\bemergency\b/i,
  /\bproven\b/i,
  /track\s+record/i,
  /medicaid/i,
  /\bwaiver\b/i,
  /therapist/i,
  /counselor/i,
  /transportation/i,
  /\bcertified\b/i,
  /guaranteed?\s+(approval|results|outcomes)/i,
];
// Questions that mention a claim only to ask the client to verify it.
const CLAIM_ALLOW = ["Is The Lion Group a certified DODD provider?"];

const USEFUL_LINKS = [
  { label: "DODD Agency Provider", href: "/dodd-agency-provider/" },
  { label: "Health Care Consultant", href: "/health-care-consultant/" },
];
const PRIMARY_NAV = ["/", "/dodd-agency-provider/", "/health-care-consultant/", "/careers/", "/about-us/", "/contact-us/"];
// Design concepts render the same site under /a/, /b/ and /c/.
const CONCEPTS = ["a", "d"]; // active concepts (see src/concepts/config.ts)
const withPrefix = (concept, href) => (concept ? (href === "/" ? `/${concept}/` : `/${concept}${href}`) : href);
// The root is a design chooser; every site page lives under a concept prefix.
const ROUTES = new Set(["/", ...CONCEPTS.flatMap((c) => PRIMARY_NAV.map((h) => withPrefix(c, h)))]);

const problems = [];

async function walk(dir, exts) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map((e) => {
      const full = path.join(dir, e.name);
      if (e.isDirectory()) return walk(full, exts);
      return exts.some((x) => e.name.endsWith(x)) ? [full] : [];
    }),
  );
  return files.flat();
}

const decode = (s) =>
  s.replace(/&amp;/g, "&").replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&nbsp;/g, " ");

function visibleText(html) {
  return decode(
    html
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<div role="note"[^>]*>[\s\S]*?<\/div>/gi, " ")
      .replace(/<[^>]+>/g, " "),
  ).replace(/\s+/g, " ");
}

function scan(label, text, terms, allow = []) {
  let t = text;
  for (const a of allow) t = t.split(a).join(" ");
  for (const re of terms) {
    const m = t.match(re);
    if (m) {
      const i = m.index ?? 0;
      problems.push(`${label}: "${m[0]}" in "…${t.slice(Math.max(0, i - 50), i + 50).replace(/\s+/g, " ")}…"`);
    }
  }
}

// Builds for sub-path hosting (GitHub Pages) prefix every internal link.
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const stripBase = (href) => (BASE_PATH && (href === BASE_PATH || href.startsWith(`${BASE_PATH}/`)) ? href.slice(BASE_PATH.length) || "/" : href);

function links(html) {
  return [...html.matchAll(/<a\b[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi)].map((m) => ({
    href: stripBase(decode(m[1])),
    label: decode(m[2].replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim(),
  }));
}

// 1. Source files.
for (const file of await walk(SRC, [".ts", ".tsx", ".css"])) {
  const text = await readFile(file, "utf8");
  const rel = path.relative(root, file);
  scan(rel, text, SERVICE_TERMS);
  if (rel.startsWith(path.join("src", "content"))) {
    scan(rel, text, CLAIM_TERMS, CLAIM_ALLOW);
  }
}

// 2. Built pages.
const pages = await walk(OUT, [".html"]);
if (pages.length === 0) problems.push("out/: no HTML found. Run `npm run build` first.");

for (const file of pages) {
  const html = await readFile(file, "utf8");
  const rel = path.relative(root, file);
  const isChooser = rel === path.join("out", "index.html");
  // 404 pages use the Heritage header and footer.
  const concept = rel.match(/^out\/([ad])\//)?.[1] ?? (/404|_not-found/.test(rel) ? "a" : undefined);
  const expectedUseful = USEFUL_LINKS.map((l) => ({ ...l, href: withPrefix(concept, l.href) }));
  const expectedNav = PRIMARY_NAV.map((h) => withPrefix(concept, h));
  scan(rel, html, SERVICE_TERMS);
  scan(`${rel} (visible text)`, visibleText(html), CLAIM_TERMS, CLAIM_ALLOW);

  const useful = html.match(/<nav aria-labelledby="footer-useful-links"[\s\S]*?<\/nav>/i);
  if (isChooser) {
    // The chooser has no site navigation; only content and links are checked.
  } else if (!useful) {
    problems.push(`${rel}: footer Useful Links nav not found`);
  } else {
    const found = links(useful[0]);
    const ok =
      found.length === expectedUseful.length &&
      expectedUseful.every((exp, i) => found[i].label === exp.label && found[i].href === exp.href);
    if (!ok) problems.push(`${rel}: Useful Links must be exactly ${JSON.stringify(expectedUseful)}, found ${JSON.stringify(found)}`);
  }

  const navs = isChooser ? [] : [...html.matchAll(/<nav aria-label="Primary"[\s\S]*?<\/nav>/gi)];
  if (!isChooser && navs.length !== 2) problems.push(`${rel}: expected desktop + mobile primary nav, found ${navs.length}`);
  for (const nav of navs) {
    const hrefs = links(nav[0])
      .map((l) => l.href)
      .filter((h) => h.startsWith("/"));
    const unexpected = hrefs.filter((h) => !expectedNav.includes(h));
    const missing = expectedNav.filter((h) => !hrefs.includes(h));
    if (unexpected.length || missing.length) {
      problems.push(`${rel}: primary nav unexpected ${JSON.stringify(unexpected)} missing ${JSON.stringify(missing)}`);
    }
  }

  // Internal links must point at a page that exists in this build.
  for (const { href } of links(html)) {
    if (!href.startsWith("/") || href.startsWith("//")) continue;
    const pathname = href.split(/[?#]/)[0];
    if (!ROUTES.has(pathname)) problems.push(`${rel}: link to unknown route ${href}`);
  }
}

if (problems.length) {
  console.error(`check:services found ${problems.length} problem(s):\n- ${problems.join("\n- ")}`);
  process.exit(1);
}
console.log(
  `check:services passed: ${pages.length} pages and src/ contain no removed services or unverified claims; ` +
    "Useful Links = DODD Agency Provider + Health Care Consultant; primary nav = 6 approved items; all internal links resolve " +
    "(baseline and concepts A and D).",
);
