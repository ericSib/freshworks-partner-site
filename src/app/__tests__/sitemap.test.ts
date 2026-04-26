import { describe, it, expect } from "vitest";
import sitemap from "../sitemap";
import { SITE_URL } from "@/config/site";

describe("sitemap", () => {
  it("emits 5 routes (home, quiz, mentions-legales, maturite/itsm, maturite/cx)", () => {
    const entries = sitemap();
    expect(entries).toHaveLength(5);

    const urls = entries.map((e) => e.url);
    expect(urls).toContain(`${SITE_URL}/fr`);
    expect(urls).toContain(`${SITE_URL}/fr/quiz`);
    expect(urls).toContain(`${SITE_URL}/fr/mentions-legales`);
    expect(urls).toContain(`${SITE_URL}/fr/maturite/itsm/level-1`);
    expect(urls).toContain(`${SITE_URL}/fr/maturite/cx/level-1`);
  });

  it("attaches bilingual fr/en/x-default alternates to each entry", () => {
    const entries = sitemap();
    for (const entry of entries) {
      expect(entry.alternates?.languages).toBeDefined();
      const langs = entry.alternates!.languages!;
      expect(langs.fr).toMatch(/\/fr/);
      expect(langs.en).toMatch(/\/en/);
      expect(langs["x-default"]).toMatch(/\/fr/);
    }
  });

  it("uses a frozen lastModified per route, not the build time (no Date() drift)", () => {
    const before = Date.now();
    const entries1 = sitemap();
    const entries2 = sitemap();
    const after = Date.now();

    // 1. Same call returns the same lastModified timestamps (deterministic)
    for (let i = 0; i < entries1.length; i++) {
      const t1 = (entries1[i].lastModified as Date).getTime();
      const t2 = (entries2[i].lastModified as Date).getTime();
      expect(t1).toBe(t2);
    }

    // 2. lastModified is in the past (content date), not "now" — guards
    //    against accidental reintroduction of `new Date()` at the call site.
    for (const entry of entries1) {
      const lm = (entry.lastModified as Date).getTime();
      expect(lm).toBeLessThan(before);
      expect(lm).toBeLessThan(after);
    }
  });

  it("ranks priorities by business value: home > quiz > maturity > legal", () => {
    const entries = sitemap();
    const byPath = (suffix: string) => entries.find((e) => e.url.endsWith(suffix));

    expect(byPath("/fr")?.priority).toBe(1.0);
    expect(byPath("/quiz")?.priority).toBe(0.9);
    expect(byPath("/maturite/itsm/level-1")?.priority).toBe(0.8);
    expect(byPath("/maturite/cx/level-1")?.priority).toBe(0.8);
    expect(byPath("/mentions-legales")?.priority).toBe(0.3);
  });
});
