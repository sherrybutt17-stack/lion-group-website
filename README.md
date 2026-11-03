# The Lion Group — website redesign

A redesigned website for The Lion Group, built around two services, **DODD Agency Provider** and **Health Care Consultant**, plus a Careers section. There are two design directions, each a complete site:

- **Heritage** (`/a/`): black and gold editorial, with gold light rays and a mane-ray lion.
- **Gilded** (`/d/`): cinematic molten gold, with a liquid-metal lion.

Both use black backgrounds with gold and warm-brown gradients. The root page lets you choose between them.

> **Status: design preview.** All copy is draft and awaits client approval. Bracketed text and "Image placeholder" frames mark content the client still needs to supply. The forms do not send data yet. The site is marked `noindex`. See [docs/APPROVALS.md](docs/APPROVALS.md).

## Run locally

```bash
npm install
npm run verify   # lint, typecheck, static build (out/), scope guard
npm run start    # http://localhost:4173
npm run qa       # browser QA (needs the server running)
npm run lighthouse
```

## Stack

- Next.js 16 static export, React 19, and Tailwind CSS 4.
- [Motion](https://github.com/motiondivision/motion) for scroll and pointer animation.
- WebGL effects adapted from [React Bits](https://github.com/DavidHDev/react-bits) (MIT + Commons Clause) on [ogl](https://github.com/oframe/ogl). They start after the visitor first interacts, never run for reduced-motion users, and can be paused.

See [docs/HANDOFF.md](docs/HANDOFF.md) for the full handoff and [CLAUDE.md](CLAUDE.md) for the project rules.

## Deployment

Every push to `main` runs [.github/workflows/deploy-pages.yml](.github/workflows/deploy-pages.yml), which builds with the repository name as the base path and publishes the preview to GitHub Pages.
