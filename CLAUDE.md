# CLAUDE.md

Project guidance for Claude Code. It holds the working rules and commands, followed by the approved build plan for The Lion Group redesign mockup (approved 2026-11-03). Follow it, and update it when decisions change.

## Working on this project

### Hard rules
- Promote only **DODD Agency Provider** and **Health Care Consultant**, using the exact names. Careers is a section, not a service.
- The footer's **Useful Links** contains exactly those two links.
- Never add unverified claims: certification, licensure, years, 24/7, outcomes, Medicaid/waiver, or response times. Never add fabricated testimonials, people, stats, or badges. Pending items go in `docs/APPROVALS.md`.
- No approval badges, review tooling, or placeholders on pages (user decisions, 2026-11-03).
  - Photo slots use only the client's own photos (`GalleryPhoto`, `PhotoGallery`), reused where needed. Never use stock photos.
  - Where copy is unconfirmed, write neutral wording that makes no claims, or leave the item out. No bracketed slots.
  - No testimonial section until a real, consented testimonial exists. Never invent one.
  - Approval status lives only in `docs/APPROVALS.md`. `ConceptPlaceholder` and `ImagePlaceholder` remain only in the switched-off concepts B and C.
- Motion must respect `prefers-reduced-motion`, keep all content visible without JS, never hide the H1/LCP element behind JS, and give any looping motion a pause control.
- Forms stay non-submitting (`method="dialog"`, `useMockForm`) until the client confirms a destination. No secrets in frontend code.
- Don't publish or deploy without client approval and authorized access.

### Commands
- `npm run dev`: local dev server.
- `npm run images`: regenerate AVIF/WebP from `assets/source/` into `public/images/` and `src/lib/images.generated.ts`.
- `npm run verify`: lint, typecheck, static build to `out/`, and `check:services` (removed-service/claim guard plus nav/footer assertions).
- `npm run start`: serve `out/` on http://localhost:4173 (uses `serve.json` for trailing slashes).
- `npm run qa`: Playwright + axe at 320/375/768/1024/1440/640px, plus no-JS, motion, keyboard, and form checks. Needs `npm run start` running. Writes `reports/qa-summary.md` and screenshots.
- `npm run lighthouse`: Lighthouse 13 mobile + desktop, 3 runs, median. Needs `npm run start` running. Writes `reports/lighthouse-summary.md`.
- `NEXT_PUBLIC_BASE_PATH=/lion-group-website npm run build`: a build for sub-path hosting. GitHub Pages builds this way in CI.

### Repository and preview
- GitHub (public): https://github.com/sherrybutt17-stack/lion-group-website. Push over SSH; `main` auto-deploys.
- Preview (GitHub Pages, `noindex`): https://sherrybutt17-stack.github.io/lion-group-website/
- Commit `0970e13` holds the full earlier state: the baseline site, concepts B/C/E, the design switcher, and the review tags.

### Design concepts (added 2026-11-03, expanded to five, shortlisted to A and D)
**Current state:** the user kept **A · Heritage** and **D · Gilded** and asked for both to be black-themed with gradients everywhere. Only A and D are built (`active` in `src/concepts/config.ts`). B, C and E are switched off but their code is kept and can be re-enabled. A and D use a near-black base (`#0a0a0a`) with gold and warm-brown gradients: `.bg-noir*` classes, a page-wide gradient wash, and `.form-dark` for forms.

The user asked for premium, gradient-rich, "wow factor" design in five variations, using the best GitHub frontend libraries. The same six pages render six ways:
- **Root** (`/`): a chooser between the two designs (`src/app/page.tsx`). The baseline wireframe site was removed; it's in commit `0970e13`.
- **A · Heritage** (`/a/`): dark brown and gold, editorial serif, a mane-ray motion graphic around the logo, a services index, a scroll-lit manifesto.
- **B · Daylight** (`/b/`): warm light, bento hero, a pausable principles marquee, sticky split-scroll services, a drawn careers stepper.
- **C · Momentum** (`/c/`): ink and bright gold, kinetic uppercase type, a pointer spotlight, stacked sticky service panels, a scroll progress line.
- **D · Gilded** (`/d/`): a full-screen molten-gold WebGL hero, a liquid-metal lion logo, glass service panels with pointer edge-glow, a gold gradient band.
- **E · Atelier** (`/e/`): printed editorial on paper, animated gold topographic contours, a halftone portrait reveal, a magazine spread, a classifieds-style careers box.
- Once the client picks a concept, promote it to the root and delete the others.

### Where things live
- Copy and facts: `src/content/site.ts` (nav, footer, contact), `src/content/services.ts`, `src/content/careers.ts`. Shared by the baseline and all concepts.
- Concept routes: `src/app/[concept]/**` (static params a/b/c). Concept list and link helpers are in `src/concepts/config.ts`.
- Concept UI: `src/components/concepts/`.
  - Homes: `HomeA` … `HomeE`.
  - Shell: `ConceptHeader`, `ConceptFooter`, `ConceptMobileMenu`.
  - Inner pages: `inner/` (`PageHero`, `ServiceDetail`, `CareersDetail`, `AboutDetail`, `ContactDetail`).
- Concept theming: `[data-concept]` CSS tokens in `src/app/globals.css`, exposed as `bg-c-bg`, `text-c-ink`, `text-c-accent`, etc., plus `.tone-light`, `.tone-gold`, `.tone-brown` section overrides.
- Brand gradients in `globals.css`. All use palette colours only:
  - backgrounds: `.bg-mesh-dark`, `.bg-mesh-light`, `.bg-mesh-gold`, `.bg-mesh-molten`
  - gold text: `.text-gradient-gold` and `.text-gold-shine` (dark backgrounds only), `.text-gradient-ink` (light)
  - lines, borders and surfaces: `.rule-gold`, `.border-gradient-gold`, `.glass`, `.orb-glow`
  - interaction: `.glow-border`, `.glare`, `.edge-glow`, `.halftone-reveal`
- WebGL effects:
  - Vendored from React Bits in `src/vendor/react-bits/` (MIT + Commons Clause, ogl-based; lint-ignored; keep close to upstream).
  - Always mounted through `src/components/effects/ShaderStage.tsx`: idle-loaded, never under reduced motion, unmounted when paused, over a CSS gradient fallback.
  - Brand settings in `effects/presets.ts`.
  - `MetallicLogo` uses a depth map precomputed by `npm run images`. Don't reintroduce the in-browser solve.
- `effects/MotionPause.tsx` is the site-wide "Pause animation" control (WCAG 2.2.2), remembered in localStorage and restored by the boot script.
- Motion:
  - Concepts: `src/components/concepts/motion/ConceptMotion.tsx` (data-attribute director: reveals, scroll-linked words, parallax, progress, stacked panels, SVG draw, magnetic/tilt/spotlight) and `Marquee.tsx`. Above-the-fold entrances are CSS keyframes, so they run before hydration.
- Handoff and approvals: `docs/HANDOFF.md`, `docs/APPROVALS.md`.

## Plan: The Lion Group — two-service redesign mockup

### Context

The live site (theliongroup.us) promotes many unrelated offers: Real Estate, Faith Fortune Club, Business/Life Development, Learn to Lead, Extreme Relation, Strategy Planning, Business Counseling, Media Stream, Mental Wellness, and Life Coach. The client wants it restructured around exactly two services, **DODD Agency Provider** and **Health Care Consultant**, plus a Careers section. The deliverable is a local, unpublished mockup for client review. It reuses the existing brand, removes every other service, and flags all unapproved copy and unverified claims.

#### Findings from inspection (read-only)
- **Platform:** WordPress 6.9, Hello Elementor theme, Elementor 4.3.5 + Pro 3.11, ElementsKit Lite, LaStudio Element Kit, MetForm (contact forms + reCAPTCHA), YouTube Embed Plus, LiteSpeed server. No GA/GTM/pixel analytics detected.
- **Local folder (at planning time):** `/Users/shaheerbutt/Documents/Lion Website` was empty and not a git repo. There is no WP admin access, so this is a greenfield static mockup. **Decision (user): Next.js static export + Tailwind.**
- **Toolchain:** Node 24.17, npm 11, pnpm 11. Playwright Chromium is cached at `~/Library/Caches/ms-playwright/chromium-1248` and will serve as Lighthouse's `CHROME_PATH`; Chrome.app is not installed. Latest packages: next 16.4.4, tailwindcss 4.3.3, motion 14.9.0, lucide-react 1.66.0, lighthouse 13.6.0.
- **Brand tokens** (Elementor kit `post-17.css`):
  - Golds: `#7E6821` (5.4:1 on white, so usable for text and buttons), `#BD9337`, `#DCAD18`, `#F2D471` (the last three are for accents or on dark backgrounds only).
  - Dark browns: `#311C20` and `#38272A` (footer).
  - Ink and greys: `#1A1A1A`, body `#4F4F4F`, plus `#F4F4F4`, `#DDDDDD`, `#A5A5A5`, `#FBFBFB`.
  - Fonts: **Poly** (headings), **Lato** (body), **Space Grotesk** (nav/UI).
- **Approved-looking assets:**
  - Gold lion-mane "L" logo, available as PNG only, with no SVG: `/2023/03/ff-…-Liongroup-Logo-copy-2-1-1-2.png`, plus favicon crops at 32/180/192/270.
  - CEO portraits (Dr. Romey Coles Jr.): `IMG_3344…removebg…png`, and `2025/10/New-Project-6.png`, which places him on the gold rounded-blob motif.
- **Not reused:** the /health-care/ photos. Their filenames are Unsplash IDs or generic stock (e.g. `photo-1582719478250-…avif`, `two-happy-diverse-senior-couples.jpg`), and the brief bans stock healthcare imagery.
- **Existing copy sources:** `/health-care/` ("Advocacy. Independence. Support." plus service lines), `/lion-group-agency/` (agency letter mentioning HPC, drop-in support, Environmental Accessibility Adaptations, and "Cuyahoga County DODD"), and `/about-us/` (CEO bio). Both footer links ("DODD Agency Provider" and "Health Care Consultant") currently point to `/health-care/`.
- **Careers today:** a 4-page PDF (`2025/12/Liongroup-Agency-Application-Employment-Job-Application.pdf`). It collects SSN, felony history, references, and military service, and includes an EEO disclaimer. These sensitive fields stay out of the web form.
- **Contact facts on the site:** 1486 East 55th St, Cleveland, OH 44103 · (216) 551-7270 · liongroup700@gmail.com · Mon–Fri 9:00 AM–4:00 PM · facebook.com/LIONGROUPLLC. The footer "Twitter" link actually points to Facebook; the header uses twitter.com/LionGroupLLC.
- **Testimonials:** the six current ones are unverifiable, use template-style avatars, and reference removed services. **None will be used.**
- **DODD status:** a public web search found no confirmation. It must be verified via DODD "Find a Provider" or the certification record.

### Approach

#### Stack
- Next.js 16 App Router with `output: 'export'`, `trailingSlash: true`, and `images.unoptimized: true`. The build emits plain static HTML to `out/`.
- Tailwind v4 via `@tailwindcss/postcss`, with brand tokens in `@theme`.
- TypeScript and ESLint (flat config with `eslint-config-next`; `next lint` is gone in v16).
- Fonts via `next/font/google` (self-hosted at build, latin subset only): Poly 400, Lato 400/700, Space Grotesk variable (nav/buttons only, `preload: false`).
- Icons from `lucide-react` (a handful, tree-shaken). Brand/social links use plain text, not brand icons.
- **Motion:** use the `motion` package's vanilla `animate`/`inView` inside one tiny client island instead of the `motion/react` component runtime, which ships less JS. Verify the v14 API at install time. CSS `transition` handles simple hover/focus states.
- Not installed: shadcn/ui, Radix, magicui, motion-primitives. They serve as pattern references only. Native `<details>`/`<summary>` covers the accordions and the mobile menu without JS.
- Package name: `theliongroup-mockup`, since the folder name isn't a valid npm name. Configs are written by hand rather than run through `create-next-app` in ".".

#### Page map (existing slugs kept where they exist)
| Route | Purpose |
|---|---|
| `/` | Hero (draft H1 "Support for developmental disability services and health care consulting."), **exactly two** service cards, Who we are (CEO portrait, flagged), Careers callout, contact CTA |
| `/dodd-agency-provider/` | H1 = exact name; draft description from current-site wording; who it's for; service lines flagged as an assumption; FAQs (questions drafted, answers pending); CTA |
| `/health-care-consultant/` | H1 = exact name; draft summary ("health consulting" for families, counties, organizations); labelled placeholders for scope; FAQs; CTA. No clinical, therapy, or direct-care claims |
| `/careers/` | How it works (submit → client reviews and may shortlist → client contacts shortlisted candidates and handles screening and hiring); open positions (placeholder); application form (non-submitting); how your information is used (placeholder privacy text); EEO statement (from PDF, flagged). No promise of a job, interview, response, or response time |
| `/about-us/` | Concise CEO bio from existing copy, with removed-service mentions stripped; "Dr." title flagged |
| `/contact-us/` | Contact details (flagged "confirm"); contact form (non-submitting; "service of interest" offers only the two services) |
| `404` | `not-found.tsx` |

- **Header:** logo, then Home, DODD Agency Provider, Health Care Consultant, Careers, About, and a "Contact us" button. The horizontal nav appears at a custom breakpoint of about 1200px; below that, a `<details>`-based menu button that works without JS, enhanced to close on Escape and outside click.
- **Footer** (`#311C20`):
  - Brand column
  - **Useful Links: DODD Agency Provider and Health Care Consultant only**
  - Company: Home, About, Careers, Contact
  - Contact details and Facebook. Twitter/X is omitted until confirmed.
  - © line
- No legal/privacy links, because no verified pages exist.

#### Files to create
- **Config:** `package.json`, `next.config.ts`, `tsconfig.json`, `eslint.config.mjs`, `postcss.config.mjs`.
- **`src/app/layout.tsx`:**
  - fonts and skip link ("Skip to main content" → `#main`)
  - header, `<main id="main">`, footer
  - inline head script that swaps `no-js` → `js` on `<html>`
  - `robots: noindex,nofollow` (it's a mockup)
  - minimal `Organization` JSON-LD (name, url, logo, address, phone, email, Facebook `sameAs`). No Service schema until descriptions are approved, and no Medical* types.
- **`src/app/globals.css`:**
  - `@theme` tokens and fluid type via `clamp()`
  - `max-w-[65ch]` prose
  - `:focus-visible` rings (`#7E6821` on light, `#DCAD18` on dark)
  - 44px minimum touch targets
  - reveal styles: `.js [data-reveal]` starts hidden only inside `@media (prefers-reduced-motion: no-preference)`
- **Pages:** `src/app/{page,dodd-agency-provider/page,health-care-consultant/page,careers/page,about-us/page,contact-us/page,not-found}.tsx`, each with its own title and meta description.
- **Content** (single source of truth; each block carries `review?: 'draft' | 'placeholder' | 'assumption'`):
  - `src/content/site.ts`: nav, footer groups, contact facts
  - `src/content/services.ts`: both services, so the copy stays distinct
  - `src/content/careers.ts`
- **`src/components/`:**
  - layout pieces: `SiteHeader`, `MobileMenu` (client), `SiteFooter`, `Breadcrumbs`, `SectionHeading`
  - content pieces: `ServiceCard`, `ServicePage` (shared template for both service routes), `CtaBand`, `Faq`, `ContactDetails`
  - `Picture`: `<picture>` with AVIF/WebP sources and explicit width/height; `priority` sets eager loading plus `fetchpriority="high"`, otherwise `loading="lazy"`
  - `ReviewFlag` (removed later at the user's request; see commit `0970e13`)
  - `forms/Field`, `forms/MockForm` (client), `forms/CareersForm`, `forms/ContactForm`
  - `motion/RevealObserver` (client, mounted once)
- **Scripts:**
  - `scripts/optimize-images.mjs`: sharp turns `assets/source/*` into `public/images/*` AVIF/WebP (+PNG fallback for the transparent logo) at needed widths
  - `scripts/check-excluded.mjs`: see Verification
  - `scripts/qa.mjs`: Playwright QA
  - `scripts/lighthouse.mjs`
- **Assets:** download the logo, favicon crops, and `New-Project-6.png` from the live site into `assets/source/`.
- **Docs:** `docs/APPROVALS.md` (review checklist) and `docs/HANDOFF.md` (files, page map, results, limits).

#### Content rules applied
- Service names are used verbatim. The two descriptions stay distinct:
  - **DODD Agency Provider:** supports for adults and youth with developmental and behavioral needs (current wording).
  - **Health Care Consultant:** consulting for families, counties, and organizations.
- **DODD page** lists the current site's service lines in a block flagged "Assumption: confirm these belong to this service and are currently offered": HPC/DSP support, respite/in-home/drop-in, shared living & respite housing, day program, community accessibility & environmental adaptations, behavior support & developmental coaching.
- **Withheld from pages** (listed in APPROVALS.md):
  - "licensed" shared living
  - "15+ years", "proven transformations / track record"
  - 24/7 / on-call / emergency backup coverage
  - "transportation available"
  - Cuyahoga County DODD provider status
  - "licensed therapists/counselors"
  - "replied within 24hrs"
  - "Transformation Complete"
  - any Medicaid, waiver, or approval language
- **Removed entirely:** all other services and pages, every testimonial, YouTube embeds, the cart/checkout/LMS pages, "Get a Quote"/"Join Now"/"Make An Appointment", and the "Life Solution Program".

#### Forms (no confirmed destination, so non-submitting)
- `<form method="dialog">` outside a `<dialog>` is a spec-level no-op. Without JS, nothing leaves the page and no PII ends up in the URL. Native validation still runs.
- A permanent notice above each form reads "Preview only — this form doesn't send information yet."
- With JS: an error summary with links to fields (USWDS pattern) and `aria-invalid`/`aria-describedby`. On a valid submit, a `role="status"` message reads "Mockup: submission not connected — integration pending." Nothing is sent and file contents are never read.
- **Careers fields** (from the PDF, minimized, flagged for approval):
  - full name*, email*, phone*
  - position of interest* (free text, since openings aren't confirmed)
  - employment desired (full-time / part-time / seasonal fieldset)
  - date available
  - relevant experience (textarea)
  - resume (PDF/DOC/DOCX, ≤5 MB checked locally; marked "secure storage pending")
  - consent checkbox* (placeholder privacy wording)
  - acknowledgment that applying doesn't guarantee an interview or employment*
- **Excluded from the web form:** SSN, felony history, references, military service, and background-check items stay with the client's screening process.
- **Contact fields** (mirroring the current MetForm): name*, email*, phone, service of interest (DODD Agency Provider / Health Care Consultant / General question), message*.

#### Motion (added after static layouts pass QA)
- `RevealObserver` uses `inView` and `animate` for one-time section reveals: opacity plus 12px translate, about 350ms.
- Hero entrance applies to the eyebrow and CTAs only. **The H1/LCP element never starts at opacity 0.**
- The mobile menu panel uses a fade/slide.
- Cards get CSS hover/focus lift.
- Under `prefers-reduced-motion: reduce` or with no JS, everything renders visible and static.
- No parallax, counters, scroll hijacking, or looping decoration.

### Verification
1. **Static checks:** `npm run lint`, `npx tsc --noEmit`, `npm run build` (static export to `out/`).
2. **`npm run check:services`** (`scripts/check-excluded.mjs`) case-insensitively scans `src/` and every `out/**/*.html`. It fails on a deny-list: real estate, realtor, faith fortune, business development, business & life, learn(ing) to lead, extreme relation, strategy planning, business counseling, media stream, live media, live stream, mental wellness, life coach, success coaching, our program, life solution, instructor, student registration, checkout, `\bcart\b`, get a quote, join now, invest. It also parses each page's footer "Useful Links" nav and asserts exactly two links: DODD Agency Provider → `/dodd-agency-provider/` and Health Care Consultant → `/health-care-consultant/`. Finally it checks that the header and mobile nav contain only the six approved items.
3. **`scripts/qa.mjs`** (Playwright + `@axe-core/playwright`, served from `out/`). For each route at 320/375/768/1024/1440:
   - asserts `scrollWidth ≤ innerWidth`
   - saves full-page screenshots to `reports/screens/`
   - checks exactly one `h1`
   - runs axe with WCAG 2.2 AA tags, reporting zero violations as the target
   - collects console errors
   - checks forms in a JS-disabled context: all content is visible, a form submit doesn't navigate or put params in the URL, and the mobile menu opens via `<details>`
   - emulates reduced motion
   - keyboard pass: skip link first, visible focus on nav, menu toggles with Enter/Escape, FAQ toggles, form error summary focus
   - checks 200% zoom, which is equivalent to the 640px viewport check
4. **Lighthouse 13** on the production build (`npx serve out`), with `CHROME_PATH` pointing at Playwright's Chromium. Mobile (default simulated throttling) and desktop (`--preset=desktop`), 3 runs per page, median reported for Home, both service pages, and Careers. Then fix measured bottlenecks and re-run. Report actual scores and conditions (local machine, localhost, lab data, not field CWV). The target is 90+ for both; no score will be claimed before it's measured.
5. **Manual visual review** of the screenshots for spacing, hierarchy, and brand fidelity.

### Approvals the client must provide (also in `docs/APPROVALS.md`)
- **Copy:** homepage headline and all page copy, both service descriptions and which service lines belong to which service (childcare? housing requests?), audiences, FAQ answers, About bio, careers copy, meta descriptions.
- **Claims:** DODD certification/provider status and county, licensure, years of experience, 24/7/emergency coverage, transportation, outcomes, the "Dr." title, service area.
- **Contact:** address, phone, email (consider a domain email instead of Gmail), hours, Twitter/X handle, legal entity name for ©.
- **Imagery:** use of the CEO portrait plus name/alt text, an SVG logo, an OG image, and real (non-stock) photography if wanted.
- **Careers:** open positions; final fields; application destination (inbox/ATS/WP); secure resume storage; privacy/retention language and privacy page; EEO statement; whether to retire the SSN-collecting PDF (recommended); spam protection.
- **Contact form:** destination and spam protection.
- **Production path:** host the static build, or rebuild in Elementor. Also needed: a 301/410 map for removed URLs (`/real-estate/`, `/faith-fortune-club/`, `/business-life-development/`, etc.) and a decision on where `/health-care/` redirects. Nothing will be published without client approval and authorized access.
