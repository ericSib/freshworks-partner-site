/**
 * Catalogue d'offres WaS — source de verite.
 *
 * Architecture complexity-first (D18) :
 *   Tier Premium : sujets strategiques et complexes en tete
 *   Tier Implement : deploiement et operations
 *   Tier Recurring : managed services (abonnement mensuel)
 *
 * Pricing "a partir de" (D15) sur toutes les offres.
 * Offres premium affichent le prix le plus eleve en premier (price anchoring).
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface Offer {
  /** Stable ID — used as i18n key and slug */
  id: string;
  /** i18n key for icon lookup in service-icons */
  icon: string;
  /** Tier for visual grouping */
  tier: "premium" | "implement" | "recurring";
  /** Price display (EUR) — "a partir de" prefix added by i18n */
  priceFrom: number;
  /** Price unit — "projet" or "mois" */
  priceUnit: "projet" | "mois";
  /** SEO slug for future dedicated page */
  slug: string;
  /** SEO keywords (used in schema + meta) */
  seoKeywords: string[];
  /** Whether to show a badge (e.g. "Recommande") */
  badge?: "recommended" | "new" | "popular";
}

// ---------------------------------------------------------------------------
// Catalogue
// ---------------------------------------------------------------------------

export const OFFERS: Offer[] = [
  // ── Tier Premium (complexity-first) ──────────────────────────────────
  {
    id: "cx-esm-transformation",
    icon: "transformation",
    tier: "premium",
    priceFrom: 40_000,
    priceUnit: "projet",
    slug: "transformation-cx-esm",
    seoKeywords: [
      "customer experience transformation",
      "ESM beyond IT",
      "agentic AI strategy",
    ],
  },
  {
    id: "migration",
    icon: "migration",
    tier: "premium",
    priceFrom: 10_000,
    priceUnit: "projet",
    slug: "migration-strategique",
    badge: "recommended",
    seoKeywords: [
      "Freshservice vs ServiceNow",
      "migrate from Zendesk",
      "ITSM migration",
    ],
  },
  {
    id: "freddy-ai",
    icon: "ia",
    tier: "premium",
    priceFrom: 8_000,
    priceUnit: "projet",
    slug: "freddy-ai",
    badge: "new",
    seoKeywords: [
      "agentic AI customer service",
      "Freddy AI setup",
      "virtual agent",
      "AI governance ITSM",
    ],
  },

  // ── Tier Implement ───────────────────────────────────────────────────
  {
    id: "freshservice",
    icon: "freshservice",
    tier: "implement",
    priceFrom: 5_000,
    priceUnit: "projet",
    slug: "implementation-freshservice",
    seoKeywords: [
      "Freshservice implementation",
      "ITSM deployment",
      "CMDB setup",
    ],
  },
  {
    id: "freshdesk",
    icon: "freshdesk",
    tier: "implement",
    priceFrom: 4_000,
    priceUnit: "projet",
    slug: "implementation-freshdesk",
    seoKeywords: [
      "omnichannel support",
      "Freshdesk setup",
      "help desk software",
    ],
  },
  {
    id: "esm-sprints",
    icon: "esm",
    tier: "implement",
    priceFrom: 5_000,
    priceUnit: "projet",
    slug: "esm-expansion",
    seoKeywords: [
      "enterprise service management",
      "employee experience",
      "digital workplace",
    ],
  },
  {
    id: "audit-optimisation",
    icon: "optimisation",
    tier: "implement",
    priceFrom: 3_000,
    priceUnit: "projet",
    slug: "audit-optimisation",
    seoKeywords: [
      "ITSM optimization",
      "Freshservice audit",
      "CSAT improvement",
    ],
  },

  // ── Tier Recurring ───────────────────────────────────────────────────
  {
    id: "managed-excellence",
    icon: "managed",
    tier: "recurring",
    priceFrom: 2_000,
    priceUnit: "mois",
    slug: "managed-services",
    seoKeywords: [
      "ITSM managed services",
      "continuous improvement",
    ],
  },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

export const PREMIUM_OFFERS = OFFERS.filter((o) => o.tier === "premium");
export const IMPLEMENT_OFFERS = OFFERS.filter((o) => o.tier === "implement");
export const RECURRING_OFFERS = OFFERS.filter((o) => o.tier === "recurring");

/** Slugs for Service schema JSON-LD */
export const OFFER_SLUGS = OFFERS.map((o) => o.slug);
