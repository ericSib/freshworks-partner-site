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
