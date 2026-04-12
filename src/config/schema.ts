/**
 * Structured data constants for JSON-LD schemas.
 * Single source of truth for Organization, Person, and Service metadata.
 *
 * These values power the JSON-LD structured data injected in the <head>
 * for SEO (Google Rich Results) and GEO (AI engine citation).
 */

import { SITE_URL, SITE_NAME } from "./site";

// ---------------------------------------------------------------------------
// Organization
// ---------------------------------------------------------------------------

export const ORGANIZATION = {
  "@type": "Organization" as const,
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  url: SITE_URL,
  logo: {
    "@type": "ImageObject" as const,
    url: `${SITE_URL}/images/logo-was.png`,
    width: 512,
    height: 512,
  },
  description:
    "Cabinet de conseil Freshworks : déploiement, migration et optimisation Freshservice (ITSM) et Freshdesk (CX).",
  foundingDate: "2024",
  areaServed: {
    "@type": "GeoCircle" as const,
    geoMidpoint: {
      "@type": "GeoCoordinates" as const,
      latitude: 48.8566,
      longitude: 2.3522,
    },
    geoRadius: "500 km",
  },
  sameAs: [
    "https://www.linkedin.com/company/what-a-service/",
    "https://www.linkedin.com/in/ericsibomana/",
  ],
  contactPoint: {
    "@type": "ContactPoint" as const,
    contactType: "customer service",
    availableLanguage: ["French", "English"],
    url: `${SITE_URL}/fr#contact`,
  },
} as const;

// ---------------------------------------------------------------------------
// Person — Founder / Lead Consultant
// ---------------------------------------------------------------------------

export const FOUNDER = {
  "@type": "Person" as const,
  "@id": `${SITE_URL}/#founder`,
  name: "Eric Sibomana",
  jobTitle: "Consultant Transformation & Performance Opérationnelle",
  url: "https://www.linkedin.com/in/ericsibomana/",
  image: `${SITE_URL}/images/eric-sib.png`,
  worksFor: { "@id": `${SITE_URL}/#organization` },
  sameAs: ["https://www.linkedin.com/in/ericsibomana/"],
  knowsAbout: [
    "ITSM",
    "Freshservice",
    "Freshdesk",
    "Customer Experience",
    "Enterprise Service Management",
    "ITIL 4",
    "DORA",
    "Service Desk Optimization",
    "IT Asset Management",
  ],
  hasCredential: [
    {
      "@type": "EducationalOccupationalCredential" as const,
      name: "ICCF — HEC Paris",
      credentialCategory: "Executive Education",
    },
    {
      "@type": "EducationalOccupationalCredential" as const,
      name: "ITIL 4 Foundation",
      credentialCategory: "Professional Certification",
    },
    {
      "@type": "EducationalOccupationalCredential" as const,
      name: "PRINCE2 Foundation",
      credentialCategory: "Professional Certification",
    },
    {
      "@type": "EducationalOccupationalCredential" as const,
      name: "DORA Lead Auditor",
      credentialCategory: "Professional Certification",
    },
    {
      "@type": "EducationalOccupationalCredential" as const,
      name: "Professional Scrum Master I",
      credentialCategory: "Professional Certification",
    },
    {
      "@type": "EducationalOccupationalCredential" as const,
      name: "Professional Scrum Product Owner I",
      credentialCategory: "Professional Certification",
    },
    {
      "@type": "EducationalOccupationalCredential" as const,
      name: "Freshworks Advanced Partner Certification",
      credentialCategory: "Vendor Certification",
    },
  ],
} as const;

// ---------------------------------------------------------------------------
// Service definitions — used to generate Service schemas dynamically
// ---------------------------------------------------------------------------

export interface ServiceDefinition {
  /** i18n key path inside "services.cards[index]" */
  nameKey: string;
  descriptionKey: string;
  /** Stable slug for the @id anchor */
  slug: string;
}

/**
 * Service slugs for JSON-LD schema generation.
 * Re-exported from the canonical offers config (D18).
 */
export { OFFER_SLUGS as SERVICE_SLUGS } from "./offers";
