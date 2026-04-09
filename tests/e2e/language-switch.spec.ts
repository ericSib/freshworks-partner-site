import { test, expect } from "@playwright/test";
import { HomePage } from "./pages/HomePage";

test.describe("Language Switching — Desktop", () => {
  test.beforeEach(({ isMobile }) => {
    test.skip(!!isMobile, "Desktop-only language switch tests");
  });

  test("FR → EN switches URL", async ({ page }) => {
    const home = new HomePage(page);
    await home.goto("fr");

    await expect(page).toHaveURL(/\/fr/);
    await home.switchLanguage();
    await page.waitForURL(/\/en/);
    await expect(page).toHaveURL(/\/en/);
  });

  test("EN → FR switches URL", async ({ page }) => {
    const home = new HomePage(page);
    await home.goto("en");

    await expect(page).toHaveURL(/\/en/);
    await home.switchLanguage();
    await page.waitForURL(/\/fr/);
    await expect(page).toHaveURL(/\/fr/);
  });

  test("language button label changes after switch", async ({ page }) => {
    const home = new HomePage(page);
    await home.goto("fr");

    await expect(page.getByRole("button", { name: "English" })).toBeVisible();
    await home.switchLanguage();
    await page.waitForURL(/\/en/);
    await expect(
      page.getByRole("button", { name: "Français" })
    ).toBeVisible();
  });
});

test.describe("Language Switching — Content", () => {
  test("CTA text changes with locale", async ({ page }) => {
    const home = new HomePage(page);

    // FR CTA
    await home.goto("fr");
    await expect(
      page.getByRole("link", { name: "Diagnostic gratuit en 30 min" })
    ).toBeVisible();

    // EN CTA
    await home.goto("en");
    await expect(
      page.getByRole("link", { name: "Free 30-min diagnostic" })
    ).toBeVisible();
  });
});
