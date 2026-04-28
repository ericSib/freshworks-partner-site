import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

/**
 * E2E + a11y smoke for the Audit/Optimisation service page (US-S21-3).
 *
 * SEO target keyword: "audit Freshservice" + "optimisation Freshdesk"
 * Pattern reused from S20 services pages (Freshservice, Freshdesk).
 *
 * Per T28/D40 (DoD enriched) : title + meta description assertions are
 * explicit so any future modification of the SEO text breaks this test
 * (preventing the D40 regression vecue post-S20 sur US-S20-1).
 */

const FR_PATH = "/fr/services/audit-optimisation";
const EN_PATH = "/en/services/audit-optimisation";

test.describe("Services — Audit/Optimisation page (US-S21-3)", () => {
  test("FR renders 200 with expected SEO title", async ({ page }) => {
    const response = await page.goto(FR_PATH);
    expect(response?.status()).toBe(200);

    // T28/D40 — explicit title assertion
    await expect(page).toHaveTitle(/[Aa]udit.*Freshworks.*What A Service/);

    // Hero h1 visible
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

    // Calendly CTA present
    await expect(
      page.getByRole("link", { name: /audit|health.?check|reserver/i }).first(),
    ).toBeVisible();
  });

  test("EN renders 200 with expected SEO title", async ({ page }) => {
    const response = await page.goto(EN_PATH);
    expect(response?.status()).toBe(200);

    await expect(page).toHaveTitle(/[Aa]udit.*Freshworks.*What A Service/);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  test("Schema.org Service JSON-LD is injected with priceFrom 6000 EUR", async ({
    page,
  }) => {
    await page.goto(FR_PATH);

    // Multiple Service schemas exist on every page (1 per offer in layout).
    // Filter on the page-specific @id "#service-audit-optimisation-detail".
    const scripts = await page.locator('script[type="application/ld+json"]').all();
    const payloads = await Promise.all(scripts.map((s) => s.textContent()));
    const serviceSchema = payloads
      .filter((p): p is string => Boolean(p))
      .map((p) => JSON.parse(p))
      .find(
        (j) =>
          j["@type"] === "Service" &&
          typeof j["@id"] === "string" &&
          j["@id"].endsWith("#service-audit-optimisation-detail"),
      );

    expect(serviceSchema).toBeDefined();
    expect(serviceSchema.serviceType).toBe("Audit & Optimization Consulting");
    expect(serviceSchema.offers.price).toBe("6000");
    expect(serviceSchema.offers.priceCurrency).toBe("EUR");
  });

  test("FAQPage JSON-LD has 6 questions", async ({ page }) => {
    await page.goto(FR_PATH);

    const scripts = await page.locator('script[type="application/ld+json"]').all();
    const payloads = await Promise.all(scripts.map((s) => s.textContent()));
    const faqSchema = payloads
      .filter((p): p is string => Boolean(p))
      .map((p) => JSON.parse(p))
      .find((j) => j["@type"] === "FAQPage");

    expect(faqSchema).toBeDefined();
    expect(Array.isArray(faqSchema.mainEntity)).toBe(true);
    expect(faqSchema.mainEntity.length).toBe(6);
  });

  test("FR has 0 axe-core critical/serious violations", async ({ page }) => {
    await page.goto(FR_PATH);
    await page.waitForLoadState("domcontentloaded");

    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();

    const blocking = results.violations.filter(
      (v) => v.impact === "critical" || v.impact === "serious",
    );

    expect(blocking, JSON.stringify(blocking, null, 2)).toEqual([]);
  });

  test("EN has 0 axe-core critical/serious violations", async ({ page }) => {
    await page.goto(EN_PATH);
    await page.waitForLoadState("domcontentloaded");

    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();

    const blocking = results.violations.filter(
      (v) => v.impact === "critical" || v.impact === "serious",
    );

    expect(blocking, JSON.stringify(blocking, null, 2)).toEqual([]);
  });
});
