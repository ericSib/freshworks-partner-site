/**
 * SEO metadata length tests — guards against SERP truncation.
 *
 * Google truncates titles around 60 characters and descriptions around
 * 155 characters in SERPs. Anything longer is cut with "...", reducing
 * CTR and keyword visibility (US-S20-4, audit SEO 26/04).
 */

import { describe, it, expect } from "vitest";
import frMessages from "../../messages/fr.json";
import enMessages from "../../messages/en.json";
import { GOOGLE_SITE_VERIFICATION } from "../../config/site";

const TITLE_MAX = 60;
const DESCRIPTION_MAX = 155;

describe("SEO metadata length budget (US-S20-4)", () => {
  describe("FR", () => {
    it(`metadata.title is ≤ ${TITLE_MAX} chars`, () => {
      const title = (frMessages as { metadata: { title: string } }).metadata.title;
      expect(title.length).toBeLessThanOrEqual(TITLE_MAX);
    });

    it(`metadata.description is ≤ ${DESCRIPTION_MAX} chars`, () => {
      const description = (frMessages as { metadata: { description: string } }).metadata
        .description;
      expect(description.length).toBeLessThanOrEqual(DESCRIPTION_MAX);
    });

    it("description includes the primary keyword 'Freshworks'", () => {
      const description = (frMessages as { metadata: { description: string } }).metadata
        .description;
      expect(description).toMatch(/Freshworks/i);
    });
  });

  describe("EN", () => {
    it(`metadata.title is ≤ ${TITLE_MAX} chars`, () => {
      const title = (enMessages as { metadata: { title: string } }).metadata.title;
      expect(title.length).toBeLessThanOrEqual(TITLE_MAX);
    });

    it(`metadata.description is ≤ ${DESCRIPTION_MAX} chars`, () => {
      const description = (enMessages as { metadata: { description: string } }).metadata
        .description;
      expect(description.length).toBeLessThanOrEqual(DESCRIPTION_MAX);
    });

    it("description includes the primary keyword 'Freshworks'", () => {
      const description = (enMessages as { metadata: { description: string } }).metadata
        .description;
      expect(description).toMatch(/Freshworks/i);
    });
  });

  describe("Google Search Console site verification (US-S20-1)", () => {
    it("token is present and matches Google's expected format", () => {
      // GSC tokens are URL-safe base64-ish, length 40+ — guards against
      // accidental empty string or truncated paste from the dashboard.
      expect(GOOGLE_SITE_VERIFICATION).toMatch(/^[A-Za-z0-9_-]{40,}$/);
    });
  });
});
