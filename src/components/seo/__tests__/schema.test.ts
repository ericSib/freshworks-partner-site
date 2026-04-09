/**
 * Tests for SEO structured data configuration.
 *
 * Validates JSON-LD schema compliance:
 * - Organization schema (US-22.1)
 * - Person schema (US-22.2)
 * - Service definitions (US-22.3)
 * - Sitemap completeness (US-22.6)
 */

import { describe, it, expect } from "vitest";
import {
  ORGANIZATION,
  FOUNDER,
  SERVICE_SLUGS,
} from "@/config/schema";
import { SITE_URL, SITE_NAME } from "@/config/site";

// ---------------------------------------------------------------------------
// US-22.1 — Organization Schema
// ---------------------------------------------------------------------------

describe("Organization schema (US-22.1)", () => {
  it("has required @type and @id", () => {
    expect(ORGANIZATION["@type"]).toBe("Organization");
    expect(ORGANIZATION["@id"]).toBe(`${SITE_URL}/#organization`);
  });

  it("includes name matching SITE_NAME", () => {
    expect(ORGANIZATION.name).toBe(SITE_NAME);
  });

  it("includes url matching SITE_URL", () => {
    expect(ORGANIZATION.url).toBe(SITE_URL);
  });

  it("has a logo with ImageObject type", () => {
    expect(ORGANIZATION.logo["@type"]).toBe("ImageObject");
    expect(ORGANIZATION.logo.url).toContain("/images/logo-was.png");
    expect(ORGANIZATION.logo.width).toBeGreaterThan(0);
    expect(ORGANIZATION.logo.height).toBeGreaterThan(0);
  });

  it("has a non-empty description", () => {
    expect(ORGANIZATION.description).toBeTruthy();
    expect(ORGANIZATION.description.length).toBeGreaterThan(20);
  });

  it("has sameAs with at least one LinkedIn URL", () => {
    expect(ORGANIZATION.sameAs.length).toBeGreaterThan(0);
    expect(ORGANIZATION.sameAs.some((url) => url.includes("linkedin.com"))).toBe(true);
  });

  it("has a contactPoint", () => {
    expect(ORGANIZATION.contactPoint["@type"]).toBe("ContactPoint");
    expect(ORGANIZATION.contactPoint.availableLanguage).toContain("French");
    expect(ORGANIZATION.contactPoint.availableLanguage).toContain("English");
  });

  it("has areaServed with GeoCircle", () => {
    expect(ORGANIZATION.areaServed["@type"]).toBe("GeoCircle");
    expect(ORGANIZATION.areaServed.geoMidpoint.latitude).toBeCloseTo(48.8566, 2);
  });
});

// ---------------------------------------------------------------------------
// US-22.2 — Person Schema
// ---------------------------------------------------------------------------

describe("Person schema (US-22.2)", () => {
  it("has required @type and @id", () => {
    expect(FOUNDER["@type"]).toBe("Person");
    expect(FOUNDER["@id"]).toBe(`${SITE_URL}/#founder`);
  });

  it("includes name and jobTitle", () => {
    expect(FOUNDER.name).toBeTruthy();
    expect(FOUNDER.jobTitle).toBeTruthy();
  });

  it("references Organization via worksFor", () => {
    expect(FOUNDER.worksFor).toEqual({ "@id": `${SITE_URL}/#organization` });
  });

  it("has knowsAbout with relevant ITSM/CX topics", () => {
    expect(FOUNDER.knowsAbout.length).toBeGreaterThanOrEqual(5);
    expect(FOUNDER.knowsAbout).toContain("ITSM");
    expect(FOUNDER.knowsAbout).toContain("Freshservice");
    expect(FOUNDER.knowsAbout).toContain("Freshdesk");
  });

  it("has credentials with EducationalOccupationalCredential type", () => {
    expect(FOUNDER.hasCredential.length).toBeGreaterThanOrEqual(5);
    FOUNDER.hasCredential.forEach((cred) => {
      expect(cred["@type"]).toBe("EducationalOccupationalCredential");
      expect(cred.name).toBeTruthy();
      expect(cred.credentialCategory).toBeTruthy();
    });
  });

  it("includes ITIL certification", () => {
    const itil = FOUNDER.hasCredential.find((c) => c.name.includes("ITIL"));
    expect(itil).toBeDefined();
  });

  it("includes Freshworks certification", () => {
    const fw = FOUNDER.hasCredential.find((c) => c.name.includes("Freshworks"));
    expect(fw).toBeDefined();
  });

  it("has sameAs with LinkedIn profile", () => {
    expect(FOUNDER.sameAs.some((url) => url.includes("linkedin.com"))).toBe(true);
  });

  it("has an image URL", () => {
    expect(FOUNDER.image).toContain("/images/eric-sib.png");
  });
});

// ---------------------------------------------------------------------------
// US-22.3 — Service Definitions
// ---------------------------------------------------------------------------

describe("Service definitions (US-22.3)", () => {
  it("has 6 service slugs matching the 6 service cards", () => {
    expect(SERVICE_SLUGS.length).toBe(6);
  });

  it("all slugs are kebab-case strings", () => {
    SERVICE_SLUGS.forEach((slug) => {
      expect(slug).toMatch(/^[a-z][a-z0-9-]+$/);
    });
  });

  it("includes core services", () => {
    expect(SERVICE_SLUGS).toContain("implementation-freshservice");
    expect(SERVICE_SLUGS).toContain("implementation-freshdesk");
    expect(SERVICE_SLUGS).toContain("migration");
  });
});
