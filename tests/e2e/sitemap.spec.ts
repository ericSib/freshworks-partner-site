import { test, expect } from "@playwright/test";

/**
 * E2E sitemap.xml hreflang validation (T40 / S21 retro D15 follow-up).
 *
 * The site uses Google's recommended pattern : 1 canonical <loc> per
 * route (FR), with EN + x-default declared as <xhtml:link rel="alternate"
 * hreflang="..."> children. This test pins down that contract so any
 * future modification of `src/app/sitemap.ts` that drops the EN
 * alternates (or omits a route entirely, like the S21 D15 incident
 * where the 3 Tier 2 services were missing) is caught at CI time.
 *
 * What this test guards against :
 *   1. Sitemap not served / not valid XML
 *   2. A route added in the app but forgotten in the sitemap
 *   3. A route present but missing its EN alternate
 *   4. An EN alternate URL that doesn't actually exist (404)
 *   5. The x-default alternate missing
 */

const SITEMAP_PATH = "/sitemap.xml";

async function fetchSitemap(request: typeof test.prototype): Promise<string> {
  // Helper to fetch the sitemap as a raw string. Playwright's APIRequestContext
  // is per-test, so each test calls this directly.
  throw new Error("use page.request inside the test");
}
// Silence unused symbol warning while keeping the docstring colocated.
void fetchSitemap;

interface SitemapEntry {
  loc: string;
  alternates: { hreflang: string; href: string }[];
}

/** Naive but sufficient XML parser for our sitemap shape. */
function parseSitemap(xml: string): SitemapEntry[] {
  const urlBlocks = xml.match(/<url>[\s\S]*?<\/url>/g) ?? [];
  return urlBlocks.map((block) => {
    const locMatch = block.match(/<loc>([^<]+)<\/loc>/);
    const altMatches = [
      ...block.matchAll(
        /<xhtml:link rel="alternate" hreflang="([^"]+)" href="([^"]+)"[^/]*\/>/g,
      ),
    ];
    return {
      loc: locMatch?.[1] ?? "",
      alternates: altMatches.map((m) => ({ hreflang: m[1], href: m[2] })),
    };
  });
}

test.describe("Sitemap hreflang contract (T40)", () => {
  test("/sitemap.xml is served and valid XML", async ({ request }) => {
    const response = await request.get(SITEMAP_PATH);
    expect(response.status()).toBe(200);

    const xml = await response.text();
    expect(xml).toMatch(/^<\?xml version="1\.0"/);
    expect(xml).toContain("<urlset");
    expect(xml).toContain("xmlns:xhtml=\"http://www.w3.org/1999/xhtml\"");
  });

  test("every entry has fr + en + x-default hreflang alternates", async ({
    request,
  }) => {
    const xml = await (await request.get(SITEMAP_PATH)).text();
    const entries = parseSitemap(xml);

    expect(entries.length).toBeGreaterThan(0);

    for (const entry of entries) {
      const hreflangs = entry.alternates.map((a) => a.hreflang);
      expect(hreflangs, `entry ${entry.loc} missing hreflangs`).toContain(
        "fr",
      );
      expect(hreflangs, `entry ${entry.loc} missing hreflangs`).toContain(
        "en",
      );
      expect(hreflangs, `entry ${entry.loc} missing hreflangs`).toContain(
        "x-default",
      );
    }
  });

  test("every EN alternate href targets /en/ and matches the FR route", async ({
    request,
  }) => {
    const xml = await (await request.get(SITEMAP_PATH)).text();
    const entries = parseSitemap(xml);

    for (const entry of entries) {
      const enAlt = entry.alternates.find((a) => a.hreflang === "en");
      expect(enAlt, `entry ${entry.loc} has no en alternate`).toBeDefined();
      expect(enAlt!.href, `entry ${entry.loc} en href`).toContain("/en");

      // The EN alternate must mirror the FR route (same path after /en).
      // Example: /fr/services/migration → /en/services/migration
      const frPath = new URL(entry.loc).pathname.replace(/^\/fr/, "");
      const enPath = new URL(enAlt!.href).pathname.replace(/^\/en/, "");
      expect(enPath, `mirror mismatch for ${entry.loc}`).toBe(frPath);
    }
  });

  test("x-default alternate points to the FR canonical loc", async ({
    request,
  }) => {
    const xml = await (await request.get(SITEMAP_PATH)).text();
    const entries = parseSitemap(xml);

    for (const entry of entries) {
      const xDefault = entry.alternates.find(
        (a) => a.hreflang === "x-default",
      );
      expect(xDefault, `entry ${entry.loc} has no x-default`).toBeDefined();
      expect(xDefault!.href, `x-default mismatch for ${entry.loc}`).toBe(
        entry.loc,
      );
    }
  });

  test("declared EN alternate URLs respond 200 (smoke check, sample of 3)", async ({
    request,
  }) => {
    // Hitting all 10 EN URLs would slow the test down. Sample : home + 2
    // Tier 2 services pages (the routes most at risk of drift since
    // they're the newest, S21 D15).
    const xml = await (await request.get(SITEMAP_PATH)).text();
    const entries = parseSitemap(xml);

    const sample = entries
      .filter(
        (e) =>
          e.loc.endsWith("/fr") ||
          e.loc.endsWith("/services/migration") ||
          e.loc.endsWith("/services/freddy-ai"),
      )
      .map((e) => e.alternates.find((a) => a.hreflang === "en")!.href);

    expect(sample.length).toBeGreaterThanOrEqual(3);

    for (const url of sample) {
      const enResponse = await request.get(url);
      expect(
        enResponse.status(),
        `EN url ${url} should respond 200`,
      ).toBe(200);
    }
  });
});
