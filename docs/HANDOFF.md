# Handoff: The Lion Group two-service website mockup

**Status:** design preview. The code is in a public GitHub repo, https://github.com/sherrybutt17-stack/lion-group-website, and the preview is deployed to GitHub Pages at https://sherrybutt17-stack.github.io/lion-group-website/. The preview is `noindex, nofollow` so search engines don't list unapproved copy. The production site (theliongroup.us) is untouched; launching there still needs the client's approval.

## What was built
A redesigned, responsive mockup that promotes only **DODD Agency Provider** and **Health Care Consultant**, plus a Careers section. It reuses The Lion Group's existing brand:
- the gold lion "L" logo
- the gold and deep-brown palette from the live Elementor kit
- Poly, Lato, and Space Grotesk fonts
- the gold rounded-shape motif
- the CEO portraits

Pages carry no approval badges, review tooling, or placeholders. Photo slots use the client's own photos only. Where details are unconfirmed, the copy stays neutral, or the item is left out (the certification FAQ, testimonials, open positions). Everything awaiting sign-off is listed in [APPROVALS.md](APPROVALS.md). Unverified claims are kept off the pages entirely.

### Shortlist: A · Heritage and D · Gilded (black theme)
The team shortlisted **A · Heritage** (`/a/`) and **D · Gilded** (`/d/`). Both now use a **black base with gold and warm-brown gradients in every section**, including the call-to-action bands, footer, inner pages, and dark-styled forms. The root page (`/`) is a chooser between the two. Concepts B, C, and E are switched off; their code is kept and can be re-enabled in `src/concepts/config.ts`. The baseline site and the review switcher were removed; both are preserved in commit `0970e13`.

### Five design concepts (history)
The first build was clean but read as generic. The site now exists in five art directions, each a complete clickable site (all six pages) sharing the same content, with brand gradients and a signature WebGL effect:

| URL | Concept | Look and motion |
|---|---|---|
| `/a/` | **A · Heritage** | Deep brown and gold, large editorial serif with gold italics, film grain. Gold "mane" rays draw out around the lion mark, then turn with scroll. Headline words rise in one by one. Services sit in an editorial index with a hover sweep. The manifesto lights up word by word as you scroll. The leadership photo is revealed with a wipe. A giant outlined wordmark closes the footer. |
| `/b/` | **B · Daylight** | Warm light bento layout: headline tile with a hand-drawn gold underline, a brown lion tile that tilts toward the pointer, and a leadership tile. A slow principles band has a pause button. Service chapters scroll past a sticky index with a progress line, and a careers stepper line draws itself in. |
| `/c/` | **C · Momentum** | Ink and bright gold with kinetic uppercase type and a spotlight that follows the pointer. Full-height service panels stack, each receding as the next slides over it. Giant principle words wipe in, and a scroll-driven progress line runs down the careers steps. |
| `/d/` | **D · Gilded** | Cinematic. A full-screen **molten gold** WebGL surface that reacts to the pointer, with the lion logo rendered as **liquid metal**. Gold-sheen headline, glass service panels with a pointer-tracking gold edge and hover glare, a gold gradient manifesto band, a breathing gold orb behind the portrait, and gradient-bordered careers steps. |
| `/e/` | **E · Atelier** | Printed editorial. Paper and ink rules over **animated gold topographic contours**. A masthead hero with drop caps, and a **halftone portrait** that resolves into a photo (and back to halftone on hover). The services read as a two-column magazine spread, followed by a pull quote and a "classifieds" careers box. |
| `/` | Baseline | The original wireframe-level build, kept for comparison |

**Signature effect added to the first three concepts:**
- A: **gold light rays** pour down onto the mane-ray lion.
- B: a **moving grain-gradient** fills the brown bento tile, and clicking spills **gold sparks**.
- C: **gold threads** react to the pointer, and the service names stream in a **marquee that speeds up and reverses with scroll**.

**Libraries used** (best-in-class open source, adapted to the brand rather than pasted):
- **[React Bits](https://github.com/DavidHDev/react-bits)** (MIT + Commons Clause): the WebGL effects Light Rays, Threads, Grainient, Molten Metal, Topography, and Metallic Paint. They're vendored in `src/vendor/react-bits/` with brand presets.
  - Metallic Paint's heavy pixel solve was moved to build time.
- **[ogl](https://github.com/oframe/ogl)** (Unlicense): a minimal WebGL library (~25 KB).
- **[Motion](https://github.com/motiondivision/motion)**: the single scripted-animation engine.
- **[Magic UI](https://github.com/magicuidesign/magicui)** and **[shadcn/ui](https://github.com/shadcn-ui/ui)**: used as pattern references for the gradient borders, shine, glare, and glow treatments, which were rebuilt in plain CSS. Installing them would have overwritten the brand tokens and added a second React animation runtime.

**How the heavy effects stay fast and accessible:**
- Each WebGL effect is code-split. It's downloaded and started only after the page has loaded **and** the visitor first interacts (pointer, touch, scroll, or key), or after 6 seconds, and then only when the browser is idle. It never competes with the first paint or the first tap.
- **Honest caveat:** because of this deferral, a load-time Lighthouse run doesn't include the effects' start-up cost. Under Lighthouse's 4× CPU throttle with software WebGL, Concept D's two shaders took about 1.7 s of main-thread time before the deferral was added. On real devices with a GPU the cost is far smaller, but it's real, so it's pushed past load and interaction.
- The liquid-metal logo (a second WebGL context) runs only on larger screens with a mouse. Phones get the static logo with a CSS gold sheen.
- Effects render at a capped pixel density (1× on phones, 1.5× elsewhere). The soft shaders don't need retina resolution.
- Effects render only while on screen and the tab is visible.
- They never run for "reduce motion" users, who see a static gold gradient instead.
- A **Pause animation** button (bottom-right) stops all ambient animation (WCAG 2.2.2) and is remembered between pages.

A floating **Design** switcher (bottom-left, every page) jumps to the same page in each concept. It's a review tool, not part of the production site.

**How the motion stays safe:**
- Above-the-fold entrances are CSS keyframes, so they don't wait for JavaScript. The H1 is never hidden behind JS.
- Scroll and pointer effects come from one small client component (`ConceptMotion`) using the Motion library.
- With "reduce motion" turned on, everything is static. Without JavaScript, all content is visible.
- Every looping animation (WebGL backgrounds, gold sheen, glowing borders, orbs, marquees) stops with the site-wide **Pause animation** button. B's marquee also has its own pause control.

### Page map
| URL | Page | Notes |
|---|---|---|
| `/` (and `/a/`, `/b/`, `/c/`) | Home | Draft hero headline, exactly two services, approach, leadership, Careers callout, contact CTA |
| `/dodd-agency-provider/` | DODD Agency Provider | Exact service name; current-site wording as draft; supports flagged as an assumption; no provider-status claim |
| `/health-care-consultant/` | Health Care Consultant | Exact service name; minimal neutral draft; no clinical/direct-care claims |
| `/careers/` | Careers / Job Application | Review → shortlist → client screens and hires; no guarantees; non-submitting form; minimal privacy notes |
| `/about-us/` | About | Leadership bio with removed services stripped out; principles; both services |
| `/contact-us/` | Contact | Contact details (to confirm); non-submitting form; `?service=` preselects the topic |
| any other URL | 404 | Links to the homepage, both services, and contact |

- **Header:** Home, DODD Agency Provider, Health Care Consultant, Careers, About, Contact us. The mobile menu uses `<details>`, so it works without JS.
- **Footer → Useful Links:** DODD Agency Provider, Health Care Consultant (only). This is enforced by `npm run check:services`.

### Stack
- **Framework and styling:** Next.js 16.4 (App Router, static export to `out/`), React 19.3, Tailwind CSS 4.3.
- **Icons:** lucide-react, a handful of icons.
- **Motion:** the `motion` 14 package's vanilla API (`animate`, `inView`, `scroll`, `stagger`) as the single animation engine, plus CSS keyframes for entrances that must run before hydration. It doesn't use the `motion/react` component runtime.
- **Not used:** shadcn/ui, Radix, Magic UI, and motion-primitives were consulted as pattern references only. Native `<details>` covers the accordions and the menu.
- **Images:** generated by sharp from the client's own files into AVIF/WebP with reserved dimensions. The hero logo and header logo load eagerly; everything else is lazy.
- **Analytics:** none. The current site has none, and no real-user monitoring has been approved (`web-vitals` was not added).

## Files
```
CLAUDE.md                     project rules, commands, approved plan
package.json, next.config.ts, tsconfig.json, eslint.config.mjs, postcss.config.mjs
assets/source/                original images downloaded from theliongroup.us (logo, favicons, CEO portraits, gallery photos)
public/images/                generated AVIF/WebP (npm run images)
src/app/                      layout.tsx (root), globals.css (brand + concept tokens, motion CSS), icons, not-found.tsx
src/app/page.tsx              root design chooser (Heritage / Gilded)
src/app/[concept]/            concept pages at /a/, /b/, /c/ (static params)
src/concepts/config.ts        concept list and link helpers
src/content/                  site.ts (nav, footer, contact facts), services.ts, careers.ts  ← all copy lives here
src/components/               SiteHeader, NavList, MobileMenu, SiteFooter, Logo, Picture, ServicePage,
                              ServiceCard, ServiceIcon, SectionHeading, Principles, Faq, CtaBand,
                              ContactDetails, Breadcrumbs, ReviewFlag (ReviewFlag/ReviewNote/Placeholder)
src/components/forms/         Field, FormShell, useMockForm, CareersForm, ContactForm
src/components/concepts/      HomeA/B/C, ConceptHeader/Footer/MobileMenu/Nav, ManeRays, SplitWords, ScrollWords,
                              ServiceIndex, ConceptButton, GalleryPhoto, PhotoGallery, SectionLabel
                              (ImagePlaceholder, ConceptPlaceholder: switched-off B/C only)
src/components/concepts/inner PageHero, ServiceDetail, CareersDetail, AboutDetail, ContactDetail, ConceptFaq, ConceptCta
src/components/concepts/motion ConceptMotion (motion director), Marquee
src/components/effects/       ShaderStage (idle-loaded WebGL), MetallicLogo, MotionPause, motionPreference, presets
src/vendor/react-bits/        LightRays, Threads, Grainient, MoltenMetal, Topography, MetallicPaint (adapted)
src/lib/images.generated.ts   image dimensions (generated)
scripts/                      optimize-images.mjs, check-excluded.mjs, qa.mjs, lighthouse.mjs, serve.mjs (static server)
docs/                         HANDOFF.md (this file), APPROVALS.md
reports/                      qa-summary.md, lighthouse-summary.md, lighthouse/*.json, screens/*.png
```

## How to run
```bash
npm install
npm run verify        # lint + typecheck + static build + removed-service/claim guard
npm run start         # serves out/ at http://localhost:4173
npm run qa            # in a second terminal: browser QA (needs the server)
npm run lighthouse    # in a second terminal: Lighthouse mobile + desktop (needs the server)
NEXT_PUBLIC_BASE_PATH=/lion-group-website npm run build   # build for GitHub Pages sub-path
```

## Validation results: final shortlist build (A + D, black theme)

- `eslint`, `tsc`, `next build`, and `check:services` (21 pages) pass.
- QA covers 19 routes × 6 widths (320/375/768/1024/1440 + 640 at 200% zoom), axe WCAG 2.2 AA with and without motion, no-JS, reduced motion, keyboard, forms, and the WebGL pause. **0 failures.**

Lighthouse 13.6, single run per page (local static build, Apple M2, mobile = simulated slow 4G + 4× CPU). Every page scored **100** for Accessibility and Best Practices.

| Page | Mobile perf | Desktop perf |
|---|---|---|
| `/a/` Heritage home | 100 | 100 |
| `/d/` Gilded home | 100 | 100 |
| `/a/dodd-agency-provider/` | 93 | 100 |
| `/d/dodd-agency-provider/` | 100 | 100 |
| `/a/careers/` | 93 | 100 |
| `/d/contact-us/` | 99 | 100 |
| `/` baseline | 96 | 100 |

These are single runs, so expect a few points of variance. For 3-run medians, run `npm run lighthouse`.

## Validation results (2026-11-03, five-concept build)

| Check | Result |
|---|---|
| `eslint`, `tsc --noEmit`, `next build` | Pass. 40 static pages (baseline + 5 concepts × 6 pages + 404). |
| `check:services` (39 built pages + `src/`) | Pass. No removed services and no unverified claims. Useful Links = exactly DODD Agency Provider + Health Care Consultant. Primary nav = the 6 approved items. All internal links resolve, in the baseline and in concepts A–E. |
| QA: 37 routes × 320/375/768/1024/1440 + 640 (200% zoom) | No horizontal overflow, one `h1` per page, correct HTTP status, no console errors. |
| QA: axe-core WCAG 2.2 AA | **0 violations** at 375 and 1440 (reduced motion), plus a second pass with motion on for each concept homepage. |
| QA: no-JS / reduced motion / motion on | All content visible without JS. Every reveal completes when scrolling with motion on. Reduced motion gets no WebGL and no pause button. |
| QA: effects | WebGL mounts only after interaction. "Pause animation" removes it and is remembered across pages. The marquee pause works. |
| QA: keyboard and forms | Skip link and focus rings work. All six menus open with Enter and close with Escape. FAQs work. Form error summary and fields behave correctly, the forms send nothing, and `?service=` preselects the topic. |

**Lighthouse 13.6** (local static build, Apple M2, headless Chrome 156, mobile = simulated slow 4G + 4× CPU; lab data, not field data)

- **Accessibility 100** and **Best Practices 100** on every page measured.
- **SEO 63** only because the mockup is deliberately `noindex`.

Performance:

| Page | Mobile | Desktop | Notes |
|---|---|---|---|
| `/` baseline | 100 | 100 | 1 run |
| `/a/` Heritage | **100** median (88/100/100) | 100 (×3) | 3 runs, final build |
| `/b/` Daylight | 99 | 100 | 1 run |
| `/c/` Momentum | **100** (×3) | **100** (×3) | 3 runs, final build. Fixed a 0.44 CLS by preloading the headline font. |
| `/d/` Gilded | 100 | 100 | 1 run |
| `/e/` Atelier | 100 | 100 | 1 run |
| `/d/dodd-agency-provider/` | 100 | 100 | 1 run |
| `/e/careers/` | 96 | 100 | 1 run |

The single-run rows were measured just before the final font-preload change, which affects only how early the UI font loads. Re-run `npm run lighthouse` for 3-run medians on every page.

**Fixed during measurement:**
- Concept D's WebGL start-up (mobile 78–82, TBT ≈1 s). Effects now start on first interaction; the liquid-metal logo is desktop-only; pixel density is capped.
- Dimmed scroll-lit words failed contrast (A11y 96). Their minimum opacity went from 22% to 60%.
- An image aspect-ratio flag (Best Practices 96).
- C's font-swap layout shift.
- The test server served stale pages after a rebuild. Lighthouse now preflights every asset.

## Forms
- **No form sends data.** Each form uses `method="dialog"` outside a `<dialog>`, which per the HTML spec is a no-op submit. Without JS nothing leaves the page and nothing is added to the URL.
- With JS, `useMockForm` validates on submit and shows an error summary that links to each field, plus inline errors (`aria-invalid`, `aria-describedby`). A valid submit only shows a `role="status"` message: "Mockup only: nothing was sent."
- The resume field checks only the file's name, type, and size (PDF/DOC/DOCX, ≤5 MB). The file is never read or uploaded.
- The careers fields are a minimized version of the client's PDF application. SSN, felony history, references, military service, and background-check consent were deliberately left out of the web form.
- **To connect later:** replace the `onSubmit` in `useMockForm` with a POST to the approved destination (server-side endpoint, ATS, or WordPress/MetForm). Store resumes in private, access-controlled storage, add spam protection, and complete the privacy text (destination, retention). Keep secrets on the server, never in this frontend.

## Known limits
- **Content is draft.** Service descriptions, FAQs, audiences, About bio, and Careers copy all need approval (see APPROVALS.md).
- **Not WordPress.** The live site is WordPress + Elementor. This mockup is a separate static build. To go live, either host `out/` or rebuild the approved design in Elementor.
- **Static export limits:** no server-side redirects (a redirect map is proposed in APPROVALS.md) and no form handling.
- **Assets:**
  - The logo is a PNG; no SVG exists.
  - The CEO portrait is 600px wide, so it renders at most ~352px.
  - The Health Care page photos on the live site look like stock images and were not used.
- **Lighthouse figures are lab data** from a local machine, not field Core Web Vitals. Field LCP/INP/CLS can only be measured after launch with approved real-user monitoring.
- **Lighthouse SEO** shows < 100 only because the mockup is intentionally `noindex`.
- **Browser coverage:** automated QA ran in Chromium only (Playwright). Safari/Firefox and real-device checks with VoiceOver/TalkBack are recommended before launch.
- **Copy check:** `check:services` matches a deny-list of terms. It can't judge meaning, so a human copy review is still required.
