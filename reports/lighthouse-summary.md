# Lighthouse results (2026-11-03T01:44:48.795Z)

- Lighthouse 13.6.0, 1 runs per page, median shown (all performance runs in brackets).
- Target: http://localhost:4173 (static `out/` build served locally by `serve`). Lab data, not field Core Web Vitals.
- Mobile: Lighthouse default emulation (Moto G Power, slow 4G, 4x CPU slowdown, simulate throttling). Desktop: `--preset=desktop`.
- Browser: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/156.0.0.0 Safari/537.36
- Machine: Apple M2, 8 cores, darwin 23.5.0.
- SEO is expected to lose points: the mockup is deliberately `noindex, nofollow`.

| Device | Page | Perf | A11y | Best pr. | SEO | FCP | LCP | TBT | CLS | Speed Index | LCP element |
|---|---|---|---|---|---|---|---|---|---|---|---|
| mobile | `/` | **96** (96) | 100 | 100 | 63 | 0.91 s | 2.85 s | 45 ms | 0.001 | 0.91 s | Support for developmental disability services and  |
| mobile | `/a/` | **100** (100) | 100 | 100 | 63 | 0.90 s | 0.90 s | 27 ms | 0.000 | 0.90 s | Support for developmental disability services and  |
| mobile | `/d/` | **100** (100) | 100 | 100 | 63 | 0.91 s | 0.91 s | 34 ms | 0.000 | 0.91 s | Support for developmental disability services and  |
| mobile | `/a/dodd-agency-provider/` | **93** (93) | 100 | 100 | 63 | 0.91 s | 3.13 s | 76 ms | 0.000 | 0.91 s | Home
/
DODD Agency Provider

SERVICE 01

DODD Agen |
| mobile | `/d/dodd-agency-provider/` | **100** (100) | 100 | 100 | 63 | 0.90 s | 0.90 s | 67 ms | 0.000 | 0.90 s | The Lion Group |
| mobile | `/a/careers/` | **93** (93) | 100 | 100 | 63 | 0.90 s | 3.15 s | 100 ms | 0.000 | 0.90 s | Home
/
Careers

CAREERS

Careers at The Lion Group |
| mobile | `/d/contact-us/` | **99** (99) | 100 | 100 | 63 | 0.91 s | 0.91 s | 129 ms | 0.000 | 0.91 s | Contact The Lion Group |
| desktop | `/` | **100** (100) | 100 | 100 | 63 | 0.24 s | 0.24 s | 0 ms | 0.000 | 0.24 s | Support for developmental disability services and  |
| desktop | `/a/` | **100** (100) | 100 | 100 | 63 | 0.24 s | 0.24 s | 0 ms | 0.000 | 0.37 s | Support for developmental disability services and  |
| desktop | `/d/` | **100** (100) | 100 | 100 | 63 | 0.25 s | 0.25 s | 0 ms | 0.000 | 0.27 s | Support for developmental disability services and  |
| desktop | `/a/dodd-agency-provider/` | **100** (100) | 100 | 100 | 63 | 0.25 s | 0.69 s | 0 ms | 0.000 | 0.25 s | About this service |
| desktop | `/d/dodd-agency-provider/` | **100** (100) | 100 | 100 | 63 | 0.25 s | 0.25 s | 0 ms | 0.000 | 0.26 s | DODD Agency Provider |
| desktop | `/a/careers/` | **100** (100) | 100 | 100 | 63 | 0.25 s | 0.68 s | 0 ms | 0.000 | 0.27 s | How applications work |
| desktop | `/d/contact-us/` | **100** (100) | 100 | 100 | 63 | 0.25 s | 0.25 s | 0 ms | 0.000 | 0.25 s | Contact The Lion Group |
