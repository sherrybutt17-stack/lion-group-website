# The Lion Group website mockup: items needing client approval

Everything below must be confirmed by The Lion Group before the site is published.

**How pending items appear on the pages.** Pages no longer carry "pending approval" tags. Where content is missing, the site shows placeholders instead:
- **Copy placeholders**, in [brackets] and styled as dashed boxes. Examples: the Health Care Consultant scope, FAQ answers about certification and service area, open positions, and the careers privacy wording.
- **Image placeholders**, labelled "Image placeholder", marking where real photography goes. On the service pages and Concept B's homepage they mark photos of programs, homes, team members, and consulting sessions.

All other copy on the pages is a draft adapted from the current website. It is listed below and still needs the client's sign-off.

**Design concepts.** Two shortlisted design directions are live: `/a/` Heritage and `/d/` Gilded, both black with gold gradients. The root page lets you choose between them. Public preview: https://sherrybutt17-stack.github.io/lion-group-website/ (not indexed by search engines). All four share the same copy, so every item below applies to all of them. Choosing a direction is itself an approval item (section 8).

## 1. Services and scope

The site promotes only **DODD Agency Provider** and **Health Care Consultant**. Everything else on the current site was removed: Real Estate, Faith Fortune Club, Business/Life Development, Learn to Lead, Extreme Relation, Strategy Planning, Business Counseling, Media Stream, Mental Wellness, and Life Coach.

- [ ] Approve the description of **DODD Agency Provider** (`src/content/services.ts`), adapted from the current /health-care/ and /lion-group-agency/ pages.
- [ ] Approve the description of **Health Care Consultant**. The current site has almost no copy for this service; please supply what it includes, what clients receive, and how engagements work.
- [ ] Confirm which supports belong to DODD Agency Provider: HPC/DSP support, respite/in-home/drop-in support, shared living and respite housing, day program, community accessibility and adaptations, behavior support and developmental coaching.
- [ ] Should **childcare centers** and **transportation** appear anywhere? They are on the current site but were left out.
- [ ] Confirm "person-centered planning" and "multidisciplinary coordination" describe Health Care Consultant.
- [ ] Approve the audiences: adults and youth with developmental and behavioral needs, families and guardians, counties, and organizations.
- [ ] Answer or remove the FAQ placeholders: certification, service area, housing availability, and what a consulting engagement looks like.
- [ ] Approve the homepage headline: "Support for developmental disability services and health care consulting."

## 2. Claims that must be verified before they can appear

None of these appear on the mockup pages. Each one was on the current site and can be added back only with evidence.

| Claim on current site | Where it was | What we need |
|---|---|---|
| DODD provider status / "Cuyahoga County DODD" | /lion-group-agency/ | DODD certification record (a public search found no confirmation) |
| "Licensed shared living & respite housing" | /health-care/ | License type and number |
| "15+ years serving developmental & behavioral health needs" | /health-care/, /lion-group-agency/ | Confirmation of start date |
| "24/7" care, "on-call coverage", "emergency backup coverage" | /health-care/ | Confirmation that this is offered today |
| "Proven transformations" / "proven track record" | /health-care/, /lion-group-agency/ | Evidence, or drop the wording |
| "Transportation available" | /health-care/ | Confirmation |
| "Staff of licensed and professional therapists, counselors…" | Home (Health Care card) | Removed as a clinical claim tied to a removed service |
| "All queries are replied within 24hrs" | Home, Contact | Removed: a response-time promise |
| "Dr." title for Romey Coles Jr. | Home, About | Confirm the degree, or use "Romey Coles Jr." |

Also note: the mockup does not mention Medicaid, waivers, government affiliation, or guaranteed approval.

## 3. Contact details and company facts

- [ ] Address: 1486 East 55th St, Cleveland, OH 44103.
- [ ] Phone: (216) 551-7270.
- [ ] Email: liongroup700@gmail.com. Consider a domain address (e.g. info@theliongroup.us) for trust and deliverability.
- [ ] Office hours: Monday–Friday, 9:00 AM–4:00 PM.
- [ ] Service area. Only the office location (Cleveland, Ohio) is stated.
- [ ] Legal entity name for the © line (currently "The Lion Group").
- [ ] Social profiles: Facebook (facebook.com/LIONGROUPLLC) is linked. The current footer's "Twitter" link points to Facebook, and the header links to twitter.com/LionGroupLLC. Confirm the X/Twitter handle, or leave it off.

## 4. Imagery and brand

- [ ] Approve use of Dr. Coles's photos and their alt text. Three come from the current site: the portrait on the gold shape, the plain cutout portrait, and the speaking photo (used in Concept C).
- [ ] Supply a vector (SVG) version of the lion "L" logo. Only PNG files exist today.
- [ ] Supply a higher-resolution portrait if available. The current file is 600px wide.
- [ ] Supply an image for social sharing (Open Graph), or approve using the logo.
- [ ] Real photography (team, programs, homes) would strengthen the service pages. The current /health-care/ photos look like stock images and were not used.
- [ ] Testimonials: none are used. The six on the current site can't be verified and mostly refer to removed services. Supply real, consented testimonials if you want them.
- [ ] Optional: the slogan "Live A Roaring Life!" was left out because it was tied to coaching programs. Say if you want it back.

## 5. Careers

- [ ] Current open positions: title, type, location, and a short description.
- [ ] Final application fields. The mockup asks for: name, email, phone, position, employment type, start date, experience, resume, and two required checkboxes.
- [ ] **Where applications go**: a hiring inbox, an applicant tracking system, or WordPress.
- [ ] **Secure resume storage** before the upload field is switched on.
- [ ] Privacy wording: who reviews applications, how long they are kept, and how to request deletion. A privacy policy page is also recommended.
- [ ] Equal Opportunity Employer statement (adapted from the current PDF).
- [ ] The current PDF application asks for a **Social Security number** and felony history. We recommend not collecting SSNs by web or email. Collect them only after an offer, through a secure onboarding process. Should the PDF stay linked anywhere?
- [ ] Spam protection for the form. The current site uses reCAPTCHA through MetForm.

## 6. Contact form

- [ ] Where messages go: the existing MetForm entries, email, or a CRM.
- [ ] Spam protection.

## 7. Going live

- [ ] Choose the production path: host this static build, or rebuild the approved design in Elementor on the existing WordPress site.
- [ ] Approve redirects for removed pages. Suggested: 301 to the homepage, or 410 Gone. Affected pages: `/real-estate/`, `/faith-fortune-club/`, `/business-life-development/`, `/learning-to-lead/`, `/extreme-relation/`, `/strategy-planning/`, `/business-counseling/`, `/media-stream/`, `/lion-group-agency/`, `/cart/`, `/checkout/`, `/dashboard/`, `/student-registration/`, `/instructor-registration/`, `/test-page/`. Also `/mental-wellness/` and `/life-coach/` (linked from the old footer).
- [ ] Decide where `/health-care/` should redirect. Both old footer service links pointed there.
- [ ] At launch, remove `noindex` and the form "preview only" notices once the forms are connected.
- [ ] Authorize production access. Nothing will be published without your written approval.

## 8. Design direction

- [ ] Choose between the shortlisted directions, **A · Heritage** (`/a/`) or **D · Gilded** (`/d/`), both black with gold gradients. Elements can be mixed, e.g. D's molten hero with A's services index. (B, C, and E were set aside on 2026-11-03.)
- [ ] Approve the motion level. Every concept respects the visitor's "reduce motion" setting, works without JavaScript, and has a "Pause animation" button (bottom-right) that stops all ambient animation and is remembered.
- [ ] Note that the animated backgrounds use the visitor's graphics hardware (WebGL). They load only after the page is ready, pause when off-screen, and fall back to a static gold gradient.
- [ ] Supply real photography for the labelled image placeholders (homepage gallery and service pages), or approve removing those frames.
- [ ] Supply a real, consented testimonial for the "Client stories" slot, or approve removing it.
