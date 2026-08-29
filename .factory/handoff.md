# Camera FX Cues — adversarial review 5 handoff

## Result

**FAIL** at commit `fc4b956ccc0da82d1916bfe45572de18e1a72090` and the live site. Review 5 found one blocking defect: the shared header visibly renders **How it works** on `/demo`, `/camera`, `/privacy`, and `/terms`, where `#how` does not exist. Clicking it only appends the fragment and does not navigate, scroll, or focus a destination.

The full finding, copy audit, claim evidence, route checks, and earlier-finding matrix are in `.factory/review-5.md`. Product code was not changed.

## Verification performed

From clean clone `/tmp/tmp.oPNpCLOlcr/clone`:

```text
npm ci                                                    PASS; 0 vulnerabilities
all 10 commands in .factory/claims.json, separately       PASS
npm test                                                  PASS; 23/23
npm run lint                                              PASS
npm run build                                             PASS; dist/ produced
```

Against `https://camera-fx-cues.sociobot.in`:

```text
PLAYWRIGHT_BASE_URL=https://camera-fx-cues.sociobot.in npm test  PASS; 23/23
factory verify-url check                                  PASS
cold 390 × 844 and 1440 × 900 first-read checks           PASS
one-click demo, Reset, Start for real, storage isolation  PASS
same-origin request/privacy logging                       PASS
route metadata, 404, non-fragment URL crawl               PASS
visible same-page fragment crawl                          FAIL; F-5-1
```

The Playwright Axe integration reports zero serious or critical violations. The standalone Axe CLI could not launch because its downloaded ChromeDriver 152 did not match preinstalled Chromium 145; the repository's equivalent Playwright integration ran locally and live.

The production build is 169,669 bytes. JavaScript is 20.05 kB raw / 7.47 kB gzip; CSS is 13.14 kB raw / 3.70 kB gzip. Local and live shell, hashed JavaScript/CSS, service worker, and 404 hashes match.

## Required next step

Conditionally omit the **How it works** anchor outside the landing route, or enforce `[hidden] { display: none !important; }`. Add a Playwright test that asserts every visible fragment link resolves to an element on its current page. Then repeat the full zero-finding review; do not mark the product complete from the existing 23-test suite alone because that suite excludes fragment links.
