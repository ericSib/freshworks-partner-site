import { test, expect } from "@playwright/test";

/**
 * SMI-esm — End-to-end completion of the ESM (Employee Service Management)
 * assessment path. Validates the third Service Maturity Index track from
 * selector → demographics → 9 scored questions → results.
 *
 * Reference story: docs/stories-ready/SMI-esm.md (D20).
 */

test.describe("Quiz — Full ESM Flow (SMI-esm)", () => {
  test("completes ESM quiz and shows results with score and level", async ({
    page,
  }) => {
    await page.goto("/fr/quiz");
    await page.waitForLoadState("domcontentloaded");

    // Step 1: Selector — choose ESM (the third card, D20)
    const esmCard = page.getByRole("button", {
      name: /Services aux employés/i,
    });
    await expect(esmCard).toBeVisible();
    await esmCard.click();

    // Step 2: Demographics — fill and start
    await expect(page.getByText("Quelques informations")).toBeVisible();

    await page.selectOption("#quiz-company-size", "1000_2000");
    await page.selectOption("#quiz-industry", "services");
    await page.selectOption("#quiz-role", "operations");

    const startBtn = page.getByRole("button", { name: /marrer/i });
    await expect(startBtn).toBeEnabled();
    await startBtn.click();

    // Step 3: Answer 9 questions (always pick the 3rd option = score 3 = Managed)
    for (let i = 0; i < 9; i++) {
      const options = page.locator("button[aria-pressed]");
      await expect(options.first()).toBeVisible({ timeout: 3000 });
      await options.nth(2).click();
      if (i < 8) {
        await expect(
          page.getByText(`${i + 2} / 9`, { exact: true })
        ).toBeVisible({ timeout: 2000 });
      }
    }

    // Step 4: Results — score 60/100 = level 3 = "Managed" (ESM nomenclature)
    await expect(page.getByText("/100")).toBeVisible({ timeout: 5000 });
    await expect(page.getByText("Level 3")).toBeVisible();
    await expect(page.getByText("Managed")).toBeVisible();

    // Radar chart with 5 ESM dimensions
    const radar = page.locator("svg[role='img']");
    await expect(radar).toBeVisible();

    // Quick wins section with ESM-specific recommendations
    await expect(page.getByText("Quick wins")).toBeVisible();

    // Email gate present
    await expect(page.getByPlaceholder("votre@email.pro")).toBeVisible();
    await expect(
      page.getByRole("button", { name: /bloquer/i })
    ).toBeVisible();
  });

  test("ESM low-maturity path lands on Firefighting level", async ({
    page,
  }) => {
    await page.goto("/fr/quiz");
    await page.waitForLoadState("domcontentloaded");

    await page.getByRole("button", { name: /Services aux employés/i }).click();
    await page.selectOption("#quiz-company-size", "200_499");
    await page.selectOption("#quiz-industry", "government");
    await page.selectOption("#quiz-role", "other");
    await page.getByRole("button", { name: /marrer/i }).click();

    // Always pick the 1st option = score 1 = Firefighting
    for (let i = 0; i < 9; i++) {
      const options = page.locator("button[aria-pressed]");
      await expect(options.first()).toBeVisible({ timeout: 3000 });
      await options.nth(0).click();
      if (i < 8) {
        await expect(
          page.getByText(`${i + 2} / 9`, { exact: true })
        ).toBeVisible({ timeout: 2000 });
      }
    }

    await expect(page.getByText("/100")).toBeVisible({ timeout: 5000 });
    await expect(page.getByText("Level 1")).toBeVisible();
    await expect(page.getByText("Firefighting")).toBeVisible();
  });
});
