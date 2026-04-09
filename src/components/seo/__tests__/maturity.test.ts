/**
 * Tests for maturity landing pages i18n data and sitemap inclusion.
 * US-18.7a
 */

import { describe, it, expect } from "vitest";
import frMessages from "@/messages/fr.json";
import enMessages from "@/messages/en.json";
import sitemap from "@/app/sitemap";

const SEGMENTS = ["itsm", "cx"] as const;
const LEVELS = ["level-1"] as const;

describe("Maturity pages i18n (US-18.7a)", () => {
  for (const segment of SEGMENTS) {
    for (const level of LEVELS) {
      const frData =
        frMessages.maturity[segment as keyof typeof frMessages.maturity];
      const enData =
        enMessages.maturity[segment as keyof typeof enMessages.maturity];

      describe(`${segment}/${level}`, () => {
        it(`FR has maturity.${segment}.${level} with all required keys`, () => {
          const fr = frData[level as keyof typeof frData] as Record<
            string,
            unknown
          >;
          expect(fr).toBeDefined();
          expect(fr.headline).toBeTruthy();
          expect(fr.intro).toBeTruthy();
          expect(fr.sectionTag).toBeTruthy();
          expect(fr.cta).toBeTruthy();
          expect(fr.timeframe).toBeTruthy();
          expect(Array.isArray(fr.problems)).toBe(true);
          expect(Array.isArray(fr.recommendations)).toBe(true);
          expect((fr.problems as string[]).length).toBeGreaterThanOrEqual(3);
          expect(
            (fr.recommendations as string[]).length
          ).toBeGreaterThanOrEqual(3);
        });

        it(`EN has maturity.${segment}.${level} with all required keys`, () => {
          const en = enData[level as keyof typeof enData] as Record<
            string,
            unknown
          >;
          expect(en).toBeDefined();
          expect(en.headline).toBeTruthy();
          expect(en.intro).toBeTruthy();
          expect(en.sectionTag).toBeTruthy();
          expect(en.cta).toBeTruthy();
        });

        it(`FR and EN have the same number of problems`, () => {
          const fr = frData[level as keyof typeof frData] as Record<
            string,
            unknown
          >;
          const en = enData[level as keyof typeof enData] as Record<
            string,
            unknown
          >;
          expect((fr.problems as string[]).length).toBe(
            (en.problems as string[]).length
          );
        });

        it(`FR and EN have the same number of recommendations`, () => {
          const fr = frData[level as keyof typeof frData] as Record<
            string,
            unknown
          >;
          const en = enData[level as keyof typeof enData] as Record<
            string,
            unknown
          >;
          expect((fr.recommendations as string[]).length).toBe(
            (en.recommendations as string[]).length
          );
        });

        it(`has meta title and description in FR`, () => {
          const fr = frData[level as keyof typeof frData] as Record<
            string,
            unknown
          >;
          const meta = fr.meta as Record<string, string>;
          expect(meta.title).toBeTruthy();
          expect(meta.description).toBeTruthy();
          expect(meta.description.length).toBeGreaterThan(50);
        });
      });
    }
  }
});

describe("Maturity pages in sitemap (US-18.7a)", () => {
  const entries = sitemap();

  it("sitemap includes ITSM level-1", () => {
    const found = entries.find((e) =>
      e.url.includes("/maturite/itsm/level-1")
    );
    expect(found).toBeDefined();
    expect(found?.priority).toBeGreaterThanOrEqual(0.7);
  });

  it("sitemap includes CX level-1", () => {
    const found = entries.find((e) => e.url.includes("/maturite/cx/level-1"));
    expect(found).toBeDefined();
  });

  it("maturity pages have bilingual alternates", () => {
    const found = entries.find((e) =>
      e.url.includes("/maturite/itsm/level-1")
    );
    const langs = found?.alternates?.languages as
      | Record<string, string>
      | undefined;
    expect(langs?.fr).toContain("/fr/maturite/itsm/level-1");
    expect(langs?.en).toContain("/en/maturite/itsm/level-1");
  });
});
