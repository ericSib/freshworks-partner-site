/**
 * Tests for sitemap.ts and robots.ts output compliance.
 *
 * US-22.6 — Sitemap complet + robots.txt AI crawlers
 */

import { describe, it, expect } from "vitest";
import sitemap from "@/app/sitemap";
import robots from "@/app/robots";

// ---------------------------------------------------------------------------
// Sitemap
// ---------------------------------------------------------------------------

describe("Sitemap (US-22.6)", () => {
  const entries = sitemap();

  it("includes homepage entry", () => {
    const home = entries.find((e) => e.url.endsWith("/fr"));
    expect(home).toBeDefined();
    expect(home?.priority).toBe(1.0);
  });

  it("includes quiz entry", () => {
    const quiz = entries.find((e) => e.url.includes("/quiz"));
    expect(quiz).toBeDefined();
    expect(quiz?.priority).toBeGreaterThanOrEqual(0.5);
  });

  it("includes mentions-legales entry", () => {
    const legal = entries.find((e) => e.url.includes("/mentions-legales"));
    expect(legal).toBeDefined();
  });

  it("all entries have lastModified", () => {
    entries.forEach((e) => {
      expect(e.lastModified).toBeInstanceOf(Date);
    });
  });

  it("all entries have language alternates with fr and en", () => {
    entries.forEach((e) => {
      const langs = e.alternates?.languages;
      expect(langs).toBeDefined();
      expect(langs?.fr).toBeTruthy();
      expect(langs?.en).toBeTruthy();
    });
  });

  it("all entries have x-default alternate", () => {
    entries.forEach((e) => {
      const langs = e.alternates?.languages as Record<string, string> | undefined;
      expect(langs?.["x-default"]).toBeTruthy();
    });
  });
});

// ---------------------------------------------------------------------------
// Robots.txt
// ---------------------------------------------------------------------------

describe("Robots.txt (US-22.6)", () => {
  const config = robots();

  it("has multiple rules (general + AI crawlers)", () => {
    expect(Array.isArray(config.rules)).toBe(true);
    expect((config.rules as unknown[]).length).toBeGreaterThanOrEqual(2);
  });

  it("has a general wildcard rule allowing /", () => {
    const rules = config.rules as Array<{ userAgent: string; allow?: string | string[] }>;
    const general = rules.find((r) => r.userAgent === "*");
    expect(general).toBeDefined();
    expect(general?.allow).toContain("/");
  });

  it("blocks /api/ for all agents", () => {
    const rules = config.rules as Array<{
      userAgent: string;
      disallow?: string | string[];
    }>;
    const general = rules.find((r) => r.userAgent === "*");
    expect(general?.disallow).toContain("/api/");
  });

  it("explicitly allows GPTBot", () => {
    const rules = config.rules as Array<{ userAgent: string; allow?: string | string[] }>;
    const gpt = rules.find((r) => r.userAgent === "GPTBot");
    expect(gpt).toBeDefined();
    expect(gpt?.allow).toContain("/");
  });

  it("explicitly allows PerplexityBot", () => {
    const rules = config.rules as Array<{ userAgent: string }>;
    const perplexity = rules.find((r) => r.userAgent === "PerplexityBot");
    expect(perplexity).toBeDefined();
  });

  it("explicitly allows ClaudeBot", () => {
    const rules = config.rules as Array<{ userAgent: string }>;
    const claude = rules.find((r) => r.userAgent === "ClaudeBot");
    expect(claude).toBeDefined();
  });

  it("includes sitemap URL", () => {
    expect(config.sitemap).toContain("/sitemap.xml");
  });
});
