/**
 * Certification keys used in Hero trust bar and Footer.
 * Each value is a key inside the "certifications" translation namespace.
 */

export const CERT_KEYS = [
  "itil",
  "prince2",
  "psm",
  "pspo",
  "freshworks",
] as const;

export type CertKey = (typeof CERT_KEYS)[number];
