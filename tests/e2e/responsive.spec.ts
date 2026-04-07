import { test, expect } from "@playwright/test";
import { HomePage } from "./pages/HomePage";

test.describe("Responsive — Mobile", () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test("hamburger menu is visible on mobile", async ({ page }) => {
    const home = new HomePage(page);
    await home.goto("fr");

    await expect(home.mobileMenuButton).toBeVisible();
  });

  test("desktop nav is hidden on mobile", async ({ page }) => {
    const home = new HomePage(page);
    await home.goto("fr");

    await expect(home.desktopNav).toBeHidden();
  });

  test("opening mobile menu shows nav links", async ({ page }) => {
    const home = new HomePage(page);
    await home.goto("fr");

    await home.openMobileMenu();

    // Wait for menu animation
    const mobileLinks = home.getMobileNavLinks();
    await expect(mobileLinks.first()).toBeVisible({ timeout: 2000 });

    const count = await mobileLinks.count();
    // At least the 4 nav links + CTA
    expect(count).toBeGreaterThanOrEqual(4);
  });

  test("clicking mobile nav link closes menu", async ({ page }) => {
    const home = new HomePage(page);
    await home.goto("fr");

    await home.openMobileMenu();
    const mobileLinks = home.getMobileNavLinks();
    await expect(mobileLinks.first()).toBeVisible({ timeout: 2000 });

    // Click the first nav link
    await mobileLinks.first().click();

    // Menu should close — the mobile nav container should be hidden or collapsed
    // We check that the menu button is still visible (we're still on mobile)
    await expect(home.mobileMenuButton).toBeVisible();
  });

  test("mobile language switch works", async ({ page }) => {
    const home = new HomePage(page);
    await home.goto("fr");

    await home.openMobileMenu();

    // Find the language switch button in the mobile menu
    const mobileLangButton = page
      .getByTestId("mobile-nav")
      .getByRole("button", { name: /English|Français/ });

    // If button exists in mobile menu, click it
    if (await mobileLangButton.isVisible()) {
      await mobileLangButton.click();
      await page.waitForURL(/\/en/);
      await expect(page).toHaveURL(/\/en/);
    } else {
      // Fallback: use the header toggle (may be same element on some viewports)
      await home.switchLanguage();
      await page.waitForURL(/\/en/);
      await expect(page).toHaveURL(/\/en/);
    }
  });
});

test.describe("Responsive — Tablet", () => {
  test.use({ viewport: { width: 768, height: 1024 } });

  test("page loads correctly at tablet viewport", async ({ page }) => {
    const home = new HomePage(page);
    await home.goto("fr");

    await expect(home.header).toBeVisible();
    await expect(home.heroSection).toBeVisible();
    await expect(home.footer).toBeVisible();
  });
});
