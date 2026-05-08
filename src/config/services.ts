/**
 * Single source of truth for the dedicated service pages slug catalog.
 *
 * Adding a new service slug here automatically:
 *   - extends generateStaticParams() in [locale]/services/[slug]/page.tsx
 *     (Next.js builds the route)
 *   - extends sitemap.xml (the sitemap loops on VALID_SLUGS — T41)
 *
 * The price + service type metadata live alongside the page that
 * consumes them (for JSON-LD Schema.org generation). Sitemap-specific
 * metadata (priority + lastModified) lives here because the sitemap
 * is the consumer.
 *
 * This eliminates the bug class detected by the S21 D15 audit (T35) :
 * 3 Tier 2 routes were added to page.tsx but forgotten in sitemap.ts,
 * caught only post-deploy. With this refactor (T41 acquis S22), it's
 * structurally impossible to add a service that isn't in the sitemap.
 */

export const VALID_SLUGS = [
  "freshservice",
  "freshdesk",
  "migration",
  "freddy-ai",
  "audit-optimisation",
] as const;

export type ServiceSlug = (typeof VALID_SLUGS)[number];

/**
 * Sitemap priority per service slug. Tier 1 (highest direct-search
 * intent on the FR market) ranks 0.9 ; Tier 2 ranks 0.85. New slugs
 * default to 0.85 if not declared (cf. SERVICE_DEFAULT_PRIORITY).
 */
export const SERVICE_PRIORITY: Record<ServiceSlug, number> = {
  freshservice: 0.9,
  freshdesk: 0.9,
  migration: 0.85,
  "freddy-ai": 0.85,
  "audit-optimisation": 0.85,
};

export const SERVICE_DEFAULT_PRIORITY = 0.85;

/**
 * ISO date of last meaningful content change per service. Update on
 * edit. The sitemap reads this so Googlebot can detect real changes
 * without bruit (lastmod doesn't drift on every deploy — US-S20-1).
 */
export const SERVICE_LAST_MODIFIED: Record<ServiceSlug, string> = {
  freshservice: "2026-04-26", // US-S20-2
  freshdesk: "2026-04-26", // US-S20-2
  migration: "2026-04-28", // US-S21-1
  "freddy-ai": "2026-04-28", // US-S21-2
  "audit-optimisation": "2026-04-28", // US-S21-3
};
