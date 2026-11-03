// Browser QA for the static build: breakpoints, overflow, headings, console,
// axe (WCAG 2.2 AA), no-JS behavior, reduced motion, keyboard, and forms.
// Usage: npm run build && npm run start (in another terminal) && npm run qa
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { chromium } from "@playwright/test";
import { AxeBuilder } from "@axe-core/playwright";

const root = path.resolve(import.meta.dirname, "..");
const BASE = process.env.QA_BASE_URL ?? "http://localhost:4173";
const PAGES = ["/", "/dodd-agency-provider/", "/health-care-consultant/", "/careers/", "/about-us/", "/contact-us/"];
// Baseline site plus the three design concepts (/a/, /b/, /c/).
const SITE_ROUTES = [...PAGES, ...["a", "d"].flatMap((c) => PAGES.map((p) => (p === "/" ? `/${c}/` : `/${c}${p}`)))];
const ROUTES = [...SITE_ROUTES, "/missing-page/"];
const HIDDEN_CHECK = "[data-reveal], [data-reveal-item], [data-word]";
const isHidden = (el) => {
  const s = getComputedStyle(el);
  return Number(s.opacity) < 0.99 || (s.clipPath !== "none" && !/inset\(0(px|%)?( 0(px|%)?)*\)/.test(s.clipPath));
};
const WIDTHS = [320, 375, 768, 1024, 1440];
const ZOOM_WIDTH = 640; // a 1280px window at 200% zoom
const AXE_WIDTHS = new Set([375, 1440]);
const AXE_TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"];
const SCREEN_DIR = path.join(root, "reports/screens");

const failures = [];
const notes = [];
const fail = (msg) => failures.push(msg);
const slug = (route) => (route === "/" ? "home" : route.replace(/^\/|\/$/g, "").replace(/\//g, "-"));

await mkdir(SCREEN_DIR, { recursive: true });
const browser = await chromium.launch();

async function openPage(context, route, consoleErrors) {
  const page = await context.newPage();
  page.on("console", (m) => {
    // The 404 route is expected to report its own 404 document status.
    if (route === "/missing-page/" && /status of 404/.test(m.text())) return;
    if (m.type() === "error") consoleErrors.push(`${route}: ${m.text()}`);
  });
  page.on("pageerror", (e) => consoleErrors.push(`${route}: ${e.message}`));
  // Wait for load, then give the network a moment to settle (best effort), retrying once on a stalled navigation.
  let response = null;
  for (let attempt = 0; attempt < 2 && !response; attempt++) {
    response = await page.goto(BASE + route, { waitUntil: "load", timeout: 30000 }).catch(() => null);
  }
  await page.waitForLoadState("networkidle", { timeout: 5000 }).catch(() => {});
  return { page, status: response?.status() ?? 0 };
}

// 1. Breakpoints: overflow, one h1, status, console, axe, screenshots (reduced motion so nothing is mid-reveal).
const consoleErrors = [];
for (const width of [...WIDTHS, ZOOM_WIDTH]) {
  const context = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: "reduce" });
  for (const route of ROUTES) {
    const { page, status } = await openPage(context, route, consoleErrors);
    const expected = route === "/missing-page/" ? 404 : 200;
    if (status !== expected) fail(`${route} @${width}: HTTP ${status}, expected ${expected}`);

    const overflow = await page.evaluate(() => {
      const vw = document.documentElement.clientWidth;
      if (document.documentElement.scrollWidth <= vw) return null;
      const offenders = [...document.querySelectorAll("body *")]
        .filter((el) => el.getBoundingClientRect().right > vw + 1)
        .slice(0, 5)
        .map((el) => `${el.tagName.toLowerCase()}.${String(el.className).slice(0, 60)}`);
      return { scrollWidth: document.documentElement.scrollWidth, vw, offenders };
    });
    if (overflow) fail(`${route} @${width}: horizontal overflow ${JSON.stringify(overflow)}`);

    const h1s = await page.locator("h1").count();
    if (h1s !== 1) fail(`${route} @${width}: ${h1s} h1 elements`);

    if (AXE_WIDTHS.has(width)) {
      const results = await new AxeBuilder({ page }).withTags(AXE_TAGS).analyze();
      for (const v of results.violations) {
        fail(`${route} @${width}: axe ${v.id} (${v.impact}) x${v.nodes.length}: ${v.nodes[0]?.target.join(" ")}`);
      }
      if (results.incomplete.length) {
        notes.push(`${route} @${width}: axe needs manual review: ${results.incomplete.map((i) => i.id).join(", ")}`);
      }
    }

    if (width !== ZOOM_WIDTH) {
      await page.screenshot({ path: path.join(SCREEN_DIR, `${slug(route)}-${width}.png`), fullPage: true });
    }
    await page.close();
  }
  await context.close();
}

// 2. JavaScript disabled: content visible, menu opens, forms never navigate.
{
  const context = await browser.newContext({ viewport: { width: 375, height: 800 }, javaScriptEnabled: false });
  for (const route of SITE_ROUTES) {
    const page = await context.newPage();
    await page.goto(BASE + route);
    const hidden = await page.$$eval(HIDDEN_CHECK, (els, fn) => els.filter(new Function(`return ${fn}`)()).length, isHidden.toString());
    if (hidden) fail(`no-JS ${route}: ${hidden} animated elements not fully visible`);
    await page.close();
  }
  const page = await context.newPage();
  for (const route of ["/", "/a/", "/d/"]) {
    await page.goto(BASE + route);
    await page.locator("header summary", { hasText: "Menu" }).click();
    if (!(await page.locator("header details[open] nav[aria-label='Primary'] a", { hasText: "Careers" }).isVisible())) {
      fail(`no-JS ${route}: mobile menu did not open`);
    }
  }
  for (const [route, fill] of [
    ["/careers/", async (p) => {
      await p.fill("#fullName", "Test Person");
      await p.fill("#email", "test@example.com");
      await p.fill("#phone", "216 555 0123");
      await p.fill("#position", "General application");
      await p.check("#consent");
      await p.check("#acknowledge");
    }],
    ["/contact-us/", async (p) => {
      await p.fill("#name", "Test Person");
      await p.fill("#email", "test@example.com");
      await p.fill("#message", "Hello");
    }],
  ]) {
    await page.goto(BASE + route);
    await fill(page);
    let requested = false;
    page.on("request", (r) => r.isNavigationRequest() && (requested = true));
    await page.locator("form button[type=submit]").click();
    await page.waitForTimeout(500);
    if (requested || page.url() !== BASE + route) fail(`no-JS ${route}: form submit navigated to ${page.url()}`);
  }
  await context.close();
}

// 3. Motion allowed: after scrolling through, every reveal has finished.
{
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: "no-preference" });
  for (const route of SITE_ROUTES) {
    const { page } = await openPage(context, route, consoleErrors);
    // axe with motion on catches states reduced-motion runs never show (e.g. dimmed scroll-lit words).
    if (/^\/[ad]\/$/.test(route)) {
      const results = await new AxeBuilder({ page }).withTags(AXE_TAGS).analyze();
      for (const v of results.violations) {
        fail(`${route} (motion on): axe ${v.id} (${v.impact}) x${v.nodes.length}: ${v.nodes[0]?.target.join(" ")}`);
      }
    }
    const height = await page.evaluate(() => document.body.scrollHeight);
    for (let y = 0; y <= height; y += 400) {
      await page.mouse.wheel(0, 400);
      await page.waitForTimeout(80);
    }
    await page.waitForTimeout(900);
    const pending = await page.$$eval(HIDDEN_CHECK, (els, fn) => els.filter(new Function(`return ${fn}`)()).map((el) => el.outerHTML.slice(0, 80)), isHidden.toString());
    if (pending.length) fail(`motion ${route}: ${pending.length} animated elements still hidden after scrolling, e.g. ${pending[0]}`);
    await page.close();
  }
  await context.close();
}

// 4. Keyboard: skip link, focus visibility, mobile menu, FAQ, forms with JS.
{
  const desktop = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
  const { page } = await openPage(desktop, "/", consoleErrors);
  await page.keyboard.press("Tab");
  const first = await page.evaluate(() => ({
    text: document.activeElement?.textContent?.trim(),
    visible: (() => {
      const r = document.activeElement?.getBoundingClientRect();
      return !!r && r.width > 0 && r.top >= 0 && r.top < innerHeight;
    })(),
  }));
  if (first.text !== "Skip to main content" || !first.visible) fail(`keyboard: first Tab stop is "${first.text}" (visible: ${first.visible})`);
  await page.keyboard.press("Enter");
  await page.keyboard.press("Tab");
  const afterSkip = await page.evaluate(() => document.activeElement?.closest("main") !== null);
  if (!afterSkip) fail("keyboard: skip link does not move focus into main");

  await page.goto(BASE + "/");
  const outlines = [];
  for (let i = 0; i < 12; i++) {
    await page.keyboard.press("Tab");
    outlines.push(
      await page.evaluate(() => {
        const el = document.activeElement;
        const s = getComputedStyle(el);
        return { tag: el.tagName, text: el.textContent?.trim().slice(0, 30), outline: s.outlineStyle !== "none" && parseFloat(s.outlineWidth) >= 2 };
      }),
    );
  }
  const noOutline = outlines.filter((o) => !o.outline);
  if (noOutline.length) fail(`keyboard: no visible focus outline on ${JSON.stringify(noOutline)}`);
  await desktop.close();

  const mobile = await browser.newContext({ viewport: { width: 375, height: 800 }, reducedMotion: "reduce" });
  const m = (await openPage(mobile, "/dodd-agency-provider/", consoleErrors)).page;
  await m.locator("summary", { hasText: "Menu" }).focus();
  await m.keyboard.press("Enter");
  if (!(await m.locator("header details").evaluate((d) => d.open))) fail("keyboard: Enter does not open the mobile menu");
  await m.keyboard.press("Escape");
  const closed = await m.evaluate(() => !document.querySelector("header details").open && document.activeElement?.tagName === "SUMMARY");
  if (!closed) fail("keyboard: Escape does not close the mobile menu and return focus");

  for (const route of ["/a/", "/d/"]) {
    await m.goto(BASE + route, { waitUntil: "networkidle" });
    await m.locator("header summary", { hasText: "Menu" }).focus();
    await m.keyboard.press("Enter");
    await m.waitForTimeout(150); // the <details> toggle event fires asynchronously
    const opened = await m.evaluate(() => document.querySelector("header details")?.open && document.body.classList.contains("menu-open"));
    await m.keyboard.press("Escape");
    const closedAgain = await m.evaluate(
      () => !document.querySelector("header details")?.open && !document.body.classList.contains("menu-open") && document.activeElement?.tagName === "SUMMARY",
    );
    if (!opened || !closedAgain) fail(`keyboard ${route}: concept menu open=${opened} closed=${closedAgain}`);
  }
  await m.goto(BASE + "/dodd-agency-provider/", { waitUntil: "networkidle" });

  const faq = m.locator("main details summary").first();
  await faq.focus();
  await m.keyboard.press("Enter");
  if (!(await m.locator("main details").first().evaluate((d) => d.open))) fail("keyboard: FAQ does not open with Enter");

  // Careers form with JS: empty submit shows a focused summary; valid submit shows the preview status.
  await m.goto(BASE + "/careers/", { waitUntil: "networkidle" });
  await m.locator("form button[type=submit]").click();
  await m.waitForTimeout(200);
  const summary = await m.evaluate(() => {
    const el = document.querySelector("[aria-labelledby=error-summary-title]");
    return { focused: document.activeElement === el, links: el?.querySelectorAll("a").length ?? 0, invalid: document.querySelector("#fullName")?.getAttribute("aria-invalid") };
  });
  if (!summary.focused || summary.links !== 6 || summary.invalid !== "true") fail(`forms: careers error summary ${JSON.stringify(summary)}`);
  await m.locator("[aria-labelledby=error-summary-title] a").first().click();
  if ((await m.evaluate(() => document.activeElement?.id)) !== "fullName") fail("forms: error summary link does not focus the field");
  await m.fill("#fullName", "Test Person");
  await m.fill("#email", "test@example.com");
  await m.fill("#phone", "(216) 555-0123");
  await m.fill("#position", "General application");
  await m.check("#consent");
  await m.check("#acknowledge");
  await m.setInputFiles("#resume", { name: "resume.txt", mimeType: "text/plain", buffer: Buffer.from("x") });
  await m.locator("form button[type=submit]").click();
  await m.waitForTimeout(200);
  if (!(await m.locator("#resume-error").isVisible())) fail("forms: wrong resume file type not flagged");
  await m.setInputFiles("#resume", { name: "resume.pdf", mimeType: "application/pdf", buffer: Buffer.from("%PDF-1.4") });
  await m.locator("form button[type=submit]").click();
  await m.waitForTimeout(200);
  const status = await m.locator("[role=status]").innerText();
  if (!/nothing was sent/i.test(status)) fail(`forms: careers preview status missing (got "${status}")`);
  if (m.url() !== BASE + "/careers/") fail(`forms: careers submit changed URL to ${m.url()}`);

  await m.goto(BASE + "/contact-us/?service=health-care-consultant", { waitUntil: "networkidle" });
  if ((await m.locator("#topic").inputValue()) !== "health-care-consultant") fail("forms: contact topic not preselected from ?service=");
  await mobile.close();

  // WebGL effects: mount after idle, stop on "Pause animation" (remembered), never for reduced motion.
  const fx = await browser.newContext({ viewport: { width: 1280, height: 800 }, reducedMotion: "no-preference" });
  const fp = (await openPage(fx, "/d/", consoleErrors)).page;
  await fp.mouse.move(400, 300); // effects start on first interaction (or after 6s)
  await fp.mouse.move(420, 320);
  const mounted = await fp.waitForSelector("main canvas", { timeout: 15000 }).then(() => true).catch(() => false);
  if (!mounted) fail("effects: WebGL canvas never mounted on /d/");
  await fp.getByRole("button", { name: "Pause animation" }).click();
  await fp.waitForTimeout(300);
  const pausedState = await fp.evaluate(() => ({ canvases: document.querySelectorAll("main canvas").length, cls: document.documentElement.classList.contains("motion-paused") }));
  if (pausedState.canvases !== 0 || !pausedState.cls) fail(`effects: pause did not stop WebGL ${JSON.stringify(pausedState)}`);
  await fp.goto(BASE + "/a/", { waitUntil: "load" });
  await fp.waitForTimeout(3000);
  const persisted = await fp.evaluate(() => ({ canvases: document.querySelectorAll("main canvas").length, cls: document.documentElement.classList.contains("motion-paused") }));
  if (persisted.canvases !== 0 || !persisted.cls) fail(`effects: pause not remembered across pages ${JSON.stringify(persisted)}`);
  await fp.getByRole("button", { name: "Play animation" }).click();
  await fx.close();
  const calm = await browser.newContext({ viewport: { width: 1280, height: 800 }, reducedMotion: "reduce" });
  const cp = (await openPage(calm, "/d/", consoleErrors)).page;
  await cp.waitForTimeout(3500);
  const calmState = await cp.evaluate(() => ({ canvases: document.querySelectorAll("canvas").length, pauseButton: !!document.querySelector("button[aria-pressed]") }));
  if (calmState.canvases || calmState.pauseButton) fail(`effects: reduced motion still animates ${JSON.stringify(calmState)}`);
  await calm.close();

}

await browser.close();

for (const e of consoleErrors) fail(`console: ${e}`);
const summary = [
  `# QA summary (${new Date().toISOString()})`,
  "",
  `Base URL: ${BASE}`,
  `Routes: ${ROUTES.join(", ")}`,
  `Widths: ${WIDTHS.join(", ")} + ${ZOOM_WIDTH} (200% zoom). axe tags: ${AXE_TAGS.join(", ")} at ${[...AXE_WIDTHS].join(", ")}px.`,
  "",
  failures.length ? `## Failures (${failures.length})` : "## Failures: none",
  ...failures.map((f) => `- ${f}`),
  "",
  notes.length ? "## Needs manual review" : "",
  ...notes.map((n) => `- ${n}`),
].join("\n");
await writeFile(path.join(root, "reports/qa-summary.md"), summary + "\n");
console.log(summary);
process.exit(failures.length ? 1 : 0);
