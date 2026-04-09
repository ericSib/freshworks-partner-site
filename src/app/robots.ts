import type { MetadataRoute } from "next";
import { SITE_URL } from "@/config/site";

/**
 * Robots.txt — controls crawler access.
 *
 * Strategy:
 * - Allow all crawlers on public pages
 * - Explicitly welcome AI crawlers (GEO optimization)
 * - Block API routes and Next.js internals
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
      // AI crawlers — explicitly allowed for GEO visibility
      {
        userAgent: "GPTBot",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: "ChatGPT-User",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: "PerplexityBot",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: "ClaudeBot",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: "Google-Extended",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
