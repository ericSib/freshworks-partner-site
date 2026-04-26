/**
 * Site-wide constants.
 * Single source of truth for URL, brand name, and locale metadata.
 */

// D14 — Custom Vercel domain (replaces default .vercel.app)
export const SITE_URL = "https://freshworks.whataservice.fr";
export const SITE_NAME = "What A Service";
export const CALENDLY_URL = "https://calendly.com/whataservice/demo";

/** Maps routing locales to OpenGraph locale codes */
export const OG_LOCALES: Record<string, string> = {
  fr: "fr_FR",
  en: "en_US",
};

/**
 * Google Search Console site verification token (US-S20-1 follow-up).
 *
 * Public token by design — Google reads it from the rendered <meta>
 * tag to confirm domain ownership. Not a secret; safe to commit.
 * Issued via search.google.com/search-console for
 * https://freshworks.whataservice.fr.
 */
export const GOOGLE_SITE_VERIFICATION =
  "OqXkg8XyZSh8be19kzQ_GdTC6ev0GjZuexBJnDJ3c38";
