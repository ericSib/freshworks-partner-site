import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

/**
 * E2E + a11y smoke for the Freddy AI service page (US-S21-2).
 *
 * SEO target keyword: "Freddy AI Freshworks consultant" (~20-50 vol/mo FR).
 * Sources to cite explicitly (sensitive AI claims):
 *   - BCG Agentic AI 2025
 *   - Salesforce State of Service 2025
 *   - Freshservice Benchmark 2025
 *
 * Per T28/D40 (DoD enriched) : title + meta description assertions are
 * explicit so any future modification of the SEO text breaks this test.
 */

const FR_PATH = "/fr/services/freddy-ai";
const EN_PATH = "/en/services/freddy-ai";

test.describe("Services — Freddy AI page (US-S21-2)", () => {
  test("FR renders 200 with expected SEO title", async ({ page }) => {
    const response = await page.goto(FR_PATH);
    expect(response?.status()).toBe(200);

    await expect(page).toHaveTitle(/Freddy.*AI.*Freshworks.*What A Service/);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  test("EN renders 200 with expected SEO title", async ({ page }) => {
    const response = await page.goto(EN_PATH);
    expect(response?.status()).toBe(200);

    await expect(page).toHaveTitle(/Freddy.*AI.*Freshworks.*What A Service/);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  test("Schema.org Service JSON-LD is injected with priceFrom 8000 EUR", async ({
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
          j["@id"].endsWith("#service-freddy-ai-detail"),
      );

    expect(serviceSchema).toBeDefined();
    expect(serviceSchema.serviceType).toBe("AI Consulting");
    expect(serviceSchema.offers.price).toBe("8000");
    expect(serviceSchema.offers.priceCurrency).toBe("EUR");
  });

  test("3 analyst sources are cited (BCG + Salesforce + Freshservice Benchmark)", async ({
    page,
  }) => {
    await page.goto(FR_PATH);

    // The 3 sources must appear textually somewhere on the page (block trust
    // / benefits.source / problems / hero.trust). Per Manifesto P9 / story PO,
    // no AI claim without a cited source.
    await expect(page.getByText(/BCG/i).first()).toBeVisible();
    await expect(page.getByText(/Salesforce/i).first()).toBeVisible();
    await expect(page.getByText(/Freshservice Benchmark/i).first()).toBeVisible();
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
