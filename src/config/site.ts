/**
 * Site-wide constants.
 * Single source of truth for URL, brand name, and locale metadata.
 */

export const SITE_URL = "https://whataservice.fr";
export const SITE_NAME = "What A Service";

/** Maps routing locales to OpenGraph locale codes */
export const OG_LOCALES: Record<string, string> = {
  fr: "fr_FR",
  en: "en_US",
};
