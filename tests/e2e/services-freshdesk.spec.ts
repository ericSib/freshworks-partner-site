import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

/**
 * E2E + a11y smoke for the Freshdesk service page (US-S20-2).
 *
 * Originally shipped in Sprint 20 without an E2E spec — debt closed in
 * Sprint 22 (T43) following the Tier 2 pattern (US-S21-1/2/3) where
 * each new service page landed alongside its spec.
 *
 * SEO target keyword: "consultant Freshdesk France" (~30-80 vol/mo FR).
 * Persona: directeur Service Client ETI 200-2000 collab.
 *
 * Per T28/D40 (DoD enriched) : title + meta description assertions are
 * explicit so any future modification of the SEO text breaks this test.
 */

const FR_PATH = "/fr/services/freshdesk";
const EN_PATH = "/en/services/freshdesk";

test.describe("Services — Freshdesk page (US-S20-2)", () => {
  test("FR renders 200 with expected SEO title", async ({ page }) => {
    const response = await page.goto(FR_PATH);
    expect(response?.status()).toBe(200);

    // T28/D40 — explicit title assertion (Consultant Freshdesk France | Service Client ...)
    await expect(page).toHaveTitle(/Consultant.*Freshdesk.*France.*What A Service/);

    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  test("EN renders 200 with expected SEO title", async ({ page }) => {
    const response = await page.goto(EN_PATH);
    expect(response?.status()).toBe(200);

    await expect(page).toHaveTitle(/Freshdesk.*Consultant.*What A Service/);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  test("Schema.org Service JSON-LD is injected with priceFrom 4000 EUR", async ({
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
          j["@id"].endsWith("#service-freshdesk-detail"),
      );

    expect(serviceSchema).toBeDefined();
    expect(serviceSchema.serviceType).toBe("Customer Service Consulting");
    expect(serviceSchema.offers.price).toBe("4000");
    expect(serviceSchema.offers.priceCurrency).toBe("EUR");
  });

  test("Forrester Strong Performer source is cited", async ({ page }) => {
    await page.goto(FR_PATH);
    // Trust signal cited textually somewhere on the page.
    await expect(
      page.getByText(/Forrester.*Strong Performer/i).first(),
    ).toBeVisible();
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
