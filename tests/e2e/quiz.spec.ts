import { test, expect } from "@playwright/test";

test.describe("Quiz — Full ITSM Flow", () => {
  test("completes ITSM quiz and shows results with score", async ({ page }) => {
    await page.goto("/fr/quiz");
    await page.waitForLoadState("domcontentloaded");

    // Step 1: Selector — choose ITSM
    const itsmCard = page.getByRole("button", { name: /Services IT/i });
    await expect(itsmCard).toBeVisible();
    await itsmCard.click();

    // Step 2: Demographics — fill and start
    await expect(page.getByText("Quelques informations")).toBeVisible();

    await page.selectOption("#quiz-company-size", "200_499");
    await page.selectOption("#quiz-industry", "tech");
    await page.selectOption("#quiz-role", "itDirector");

    const startBtn = page.getByRole("button", { name: /marrer/i });
    await expect(startBtn).toBeEnabled();
    await startBtn.click();

    // Step 3: Answer 9 questions (always pick the 3rd option = score 3)
    //
    // Auto-advance detection (US-21.1): we wait for an observable state change
    // instead of a fixed delay, to keep the suite deterministic:
    //   - Questions 1..8 → the step label increments ("1 / 9" → "2 / 9", ...)
    //   - Question 9     → handled by the expect(getByText("/100")) below
    for (let i = 0; i < 9; i++) {
      const options = page.locator("button[aria-pressed]");
      await expect(options.first()).toBeVisible({ timeout: 3000 });
      // Click 3rd option (index 2) = score 3 "Established"
      await options.nth(2).click();
      if (i < 8) {
        await expect(
          page.getByText(`${i + 2} / 9`, { exact: true })
        ).toBeVisible({ timeout: 2000 });
      }
    }

    // Step 4: Results should be visible (not blank!)
    await expect(page.getByText("/100")).toBeVisible({ timeout: 5000 });
    await expect(page.getByText("Level 3")).toBeVisible();
    await expect(page.getByText("Established")).toBeVisible();

    // Radar chart should be present
    const radar = page.locator("svg[role='img']");
    await expect(radar).toBeVisible();

    // Quick wins section should show 3 recommendations
    await expect(page.getByText("Quick wins")).toBeVisible();

    // Email gate should be present
    await expect(page.getByPlaceholder("votre@email.pro")).toBeVisible();
    await expect(page.getByRole("button", { name: /bloquer/i })).toBeVisible();
  });

  test("CX selector leads to CX quiz", async ({ page }) => {
    await page.goto("/fr/quiz");
    await page.waitForLoadState("domcontentloaded");

    // Choose CX
    const cxCard = page.getByRole("button", { name: /Support Client/i });
    await expect(cxCard).toBeVisible();
    await cxCard.click();

    // Should show demographics (CX path loaded)
    await expect(page.getByText("Quelques informations")).toBeVisible();
  });

  test("ESM selector leads to ESM quiz (SMI-esm)", async ({ page }) => {
    await page.goto("/fr/quiz");
    await page.waitForLoadState("domcontentloaded");

    // Choose ESM (third card, D20)
    const esmCard = page.getByRole("button", {
      name: /Services aux employés/i,
    });
    await expect(esmCard).toBeVisible();
    await esmCard.click();

    // Should show demographics (ESM path loaded)
    await expect(page.getByText("Quelques informations")).toBeVisible();
  });

  test("restart button returns to segment selector", async ({ page }) => {
    await page.goto("/fr/quiz");
    await page.waitForLoadState("domcontentloaded");

    // Choose ITSM
    await page.getByRole("button", { name: /Services IT/i }).click();

    // Fill demographics and start
    await page.selectOption("#quiz-company-size", "200_499");
    await page.selectOption("#quiz-industry", "tech");
    await page.selectOption("#quiz-role", "itDirector");
    await page.getByRole("button", { name: /marrer/i }).click();

    // Answer all 9 questions (see US-21.1 — auto-advance via step label change)
    for (let i = 0; i < 9; i++) {
      const options = page.locator("button[aria-pressed]");
      await expect(options.first()).toBeVisible({ timeout: 3000 });
      await options.nth(0).click(); // Pick first option each time
      if (i < 8) {
        await expect(
          page.getByText(`${i + 2} / 9`, { exact: true })
        ).toBeVisible({ timeout: 2000 });
      }
    }

    // Wait for results
    await expect(page.getByText("/100")).toBeVisible({ timeout: 5000 });

    // Click restart
    await page.getByRole("button", { name: /Recommencer/i }).click();

    // Should return to selector
    await expect(
      page.getByRole("button", { name: /Services IT/i })
    ).toBeVisible();
  });
});
