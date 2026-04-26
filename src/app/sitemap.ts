import type { MetadataRoute } from "next";
import { SITE_URL } from "@/config/site";

/**
 * Dynamic sitemap — lists all public routes with i18n alternates.
 *
 * Every route is declared once (FR canonical) with language alternates.
 * Priority reflects business value: homepage > quiz > maturity > legal.
 *
 * `lastModified` is **frozen per route content** — update the value here
 * when a route's content changes. Avoids the bruit crawler caused by
 * `new Date()` at build time, where every deploy bumps every `lastmod`
 * even when content hasn't moved (audit SEO 26/04, US-S20-1).
 */

/** ISO date of last meaningful content change per route. Update on edit. */
const LAST_MODIFIED: Record<string, string> = {
  "": "2026-04-25", // home — refonte SMI complete
  "/quiz": "2026-04-25", // quiz — ESM segment + ROI band + offer recommendation
  "/mentions-legales": "2026-04-12", // legal — initial publication
  "/maturite/itsm/level-1": "2026-04-25", // maturity ITSM lvl1 — refonte SMI
  "/maturite/cx/level-1": "2026-04-25", // maturity CX lvl1 — refonte SMI
};

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_URL;

  function bilingualEntry(
    path: string,
    priority: number,
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]
  ): MetadataRoute.Sitemap[number] {
    const frUrl = `${baseUrl}/fr${path}`;
    const enUrl = `${baseUrl}/en${path}`;
    const lastModified = new Date(LAST_MODIFIED[path] ?? "2026-04-26");
    return {
      url: frUrl,
      lastModified,
      changeFrequency,
      priority,
      alternates: {
        languages: {
          fr: frUrl,
          en: enUrl,
          "x-default": frUrl,
        },
      },
    };
  }

  return [
    bilingualEntry("", 1.0, "weekly"),
    bilingualEntry("/quiz", 0.9, "monthly"),
    bilingualEntry("/mentions-legales", 0.3, "yearly"),
    bilingualEntry("/maturite/itsm/level-1", 0.8, "monthly"),
    bilingualEntry("/maturite/cx/level-1", 0.8, "monthly"),
  ];
}
