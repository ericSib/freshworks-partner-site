import type { MetadataRoute } from "next";
import { SITE_URL } from "@/config/site";

/**
 * Dynamic sitemap — lists all public routes with i18n alternates.
 *
 * Every route is declared once (FR canonical) with language alternates.
 * Priority reflects business value: homepage > quiz > legal.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_URL;
  const lastModified = new Date();

  /** Helper to build a bilingual sitemap entry */
  function bilingualEntry(
    path: string,
    priority: number,
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]
  ): MetadataRoute.Sitemap[number] {
    const frUrl = `${baseUrl}/fr${path}`;
    const enUrl = `${baseUrl}/en${path}`;
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
    // Homepage — highest priority
    bilingualEntry("", 1.0, "weekly"),

    // Quiz — lead generation funnel, high value
    bilingualEntry("/quiz", 0.9, "monthly"),

    // Legal — required but low SEO value
    bilingualEntry("/mentions-legales", 0.3, "yearly"),

    // Maturity landing pages — SEO content (E18+)
    bilingualEntry("/maturite/itsm/level-1", 0.8, "monthly"),
    bilingualEntry("/maturite/cx/level-1", 0.8, "monthly"),
  ];
}
