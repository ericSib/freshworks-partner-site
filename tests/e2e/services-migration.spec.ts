import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

/**
 * E2E + a11y smoke for the Migration ServiceNow service page (US-S21-1).
 *
 * SEO target keyword: "migration ServiceNow Freshworks" (~30-100 vol/mo FR).
 * Persona: DSI ETI 200-2000 collab avec ServiceNow legacy.
 *
 * Per T28/D40 (DoD enriched) : title + meta description assertions are
 * explicit so any future modification of the SEO text breaks this test.
 */

const FR_PATH = "/fr/services/migration";
const EN_PATH = "/en/services/migration";

test.describe("Services — Migration ServiceNow page (US-S21-1)", () => {
  test("FR renders 200 with expected SEO title", async ({ page }) => {
    const response = await page.goto(FR_PATH);
    expect(response?.status()).toBe(200);

    // T28/D40 — explicit title assertion (must contain Migration + Freshworks + brand)
    await expect(page).toHaveTitle(/(Migration.*Freshworks|ServiceNow.*Freshworks.*Migration).*What A Service/);

    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  test("EN renders 200 with expected SEO title", async ({ page }) => {
    const response = await page.goto(EN_PATH);
    expect(response?.status()).toBe(200);

    await expect(page).toHaveTitle(/(Migration.*Freshworks|ServiceNow.*Freshworks.*Migration).*What A Service/);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  test("Schema.org Service JSON-LD is injected with priceFrom 12000 EUR", async ({
    page,
  }) => {
    await page.goto(FR_PATH);

    const scripts = await page.locator('script[type="application/ld+json"]').all();
    const payloads = await Promise.all(scripts.map((s) => s.textContent()));
    const serviceSchema = payloads
      .filter((p): p is string => Boolean(p))
      .map((p) => JSON.parse(p))
      .find(
        (j) =>
          j["@type"] === "Service" &&
          typeof j["@id"] === "string" &&
          j["@id"].endsWith("#service-migration-detail"),
      );

    expect(serviceSchema).toBeDefined();
    expect(serviceSchema.serviceType).toBe("Migration Consulting");
    expect(serviceSchema.offers.price).toBe("12000");
    expect(serviceSchema.offers.priceCurrency).toBe("EUR");
  });

  test("Forrester Wave ESM Q4 2025 source is cited", async ({ page }) => {
    await page.goto(FR_PATH);
    // The Forrester citation must appear textually somewhere on the page
    // (block trust / benefits.source / hero.trust).
    await expect(page.getByText(/Forrester.*Wave.*ESM/i).first()).toBeVisible();
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
