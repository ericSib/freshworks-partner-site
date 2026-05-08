import { test, expect } from "@playwright/test";

/**
 * E2E cache-control contract (HOTFIX-S22.0a).
 *
 * GSC export 2026-05-08 revealed all 10 indexable routes were
 * desindexed within 24h after the first successful indexation
 * (7 → 0 between 02/05 and 03/05). Root cause : every locale-
 * prefixed route was served with `cache-control: private,
 * no-cache, no-store, max-age=0, must-revalidate` — Vercel auto-
 * applies that when a Set-Cookie header is present, and the
 * next-intl middleware sets NEXT_LOCALE on every response.
 * Googlebot reads `private/no-store` as "do not index".
 *
 * This test pins down the contract going forward : every URL
 * declared in the sitemap MUST be served with a public, cachable
 * cache-control header so Google can index and re-crawl it.
 */

const SITEMAP_PATH = "/sitemap.xml";

interface SitemapEntry {
  loc: string;
  alternates: { hreflang: string; href: string }[];
}

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

/** Convert absolute prod URLs from the sitemap to baseURL-relative paths. */
function toRelativePath(url: string): string {
  return new URL(url).pathname;
}

test.describe("SEO cache-control contract (HOTFIX-S22.0a)", () => {
  test("every sitemap FR canonical URL is served as public cachable", async ({
    request,
  }) => {
    const xml = await (await request.get(SITEMAP_PATH)).text();
    const entries = parseSitemap(xml);

    expect(entries.length).toBeGreaterThan(0);

    for (const entry of entries) {
      const path = toRelativePath(entry.loc);
      const response = await request.get(path);
      const cacheControl = response.headers()["cache-control"] ?? "";

      expect(
        cacheControl,
        `${path} must not be private — Google reads private as no-index`,
      ).not.toMatch(/\bprivate\b/);

      expect(
        cacheControl,
        `${path} must not declare no-store — Google reads no-store as do-not-index`,
      ).not.toMatch(/\bno-store\b/);

      expect(
        cacheControl,
        `${path} must declare public for shared caches`,
      ).toMatch(/\bpublic\b/);
    }
  });

  test("every sitemap EN alternate URL is served as public cachable", async ({
    request,
  }) => {
    const xml = await (await request.get(SITEMAP_PATH)).text();
    const entries = parseSitemap(xml);

    for (const entry of entries) {
      const enAlt = entry.alternates.find((a) => a.hreflang === "en");
      expect(enAlt, `entry ${entry.loc} missing en alternate`).toBeDefined();

      const path = toRelativePath(enAlt!.href);
      const response = await request.get(path);
      const cacheControl = response.headers()["cache-control"] ?? "";

      expect(cacheControl, `${path} must not be private`).not.toMatch(
        /\bprivate\b/,
      );
      expect(cacheControl, `${path} must not declare no-store`).not.toMatch(
        /\bno-store\b/,
      );
      expect(cacheControl, `${path} must declare public`).toMatch(
        /\bpublic\b/,
      );
    }
  });

  test("indexable routes declare a non-zero s-maxage so CDNs cache", async ({
    request,
  }) => {
    // Sample : home FR — the highest-priority route. If this one is
    // configured correctly, the regex covers the rest.
    const response = await request.get("/fr");
    const cacheControl = response.headers()["cache-control"] ?? "";

    const sMaxAgeMatch = cacheControl.match(/s-maxage=(\d+)/);
    expect(
      sMaxAgeMatch,
      `home FR must declare s-maxage so the CDN can cache; got: ${cacheControl}`,
    ).not.toBeNull();

    const sMaxAge = Number(sMaxAgeMatch![1]);
    expect(
      sMaxAge,
      "s-maxage must be > 0 so the CDN actually caches",
    ).toBeGreaterThan(0);
  });

  test("security headers remain present (CSP non-regression)", async ({
    request,
  }) => {
    // Pin down that adding cache-control did not displace existing
    // security headers from next.config.ts. We sample one route — the
    // headers() rule with source "/(.*)" applies uniformly.
    const response = await request.get("/fr");
    const headers = response.headers();

    expect(headers["x-frame-options"]).toBe("DENY");
    expect(headers["x-content-type-options"]).toBe("nosniff");
    expect(headers["strict-transport-security"]).toContain("max-age=");
    expect(headers["content-security-policy"]).toContain("default-src 'self'");
  });
});
