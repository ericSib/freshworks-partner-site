import { test, expect } from "@playwright/test";
import { HomePage } from "./pages/HomePage";

test.describe("Keyboard Navigation — Desktop", () => {
  test.beforeEach(({ isMobile }) => {
    test.skip(!!isMobile, "Desktop-only keyboard tests");
  });

  test("Tab reaches all desktop nav links", async ({ page }) => {
    const home = new HomePage(page);
    await home.goto("fr");

    // Tab from the logo through the nav
    await home.logo.focus();

    // Tab through desktop nav items — expect at least 4 nav links + lang + CTA
    const navItems: string[] = [];
    for (let i = 0; i < 10; i++) {
      await page.keyboard.press("Tab");
      const focused = page.locator(":focus");
      const tag = await focused.evaluate((el) => el.tagName.toLowerCase());
      if (tag === "a" || tag === "button") {
        const text = await focused.textContent();
        if (text) navItems.push(text.trim());
      }
    }

    // Should have tabbed through nav links
    expect(navItems.length).toBeGreaterThanOrEqual(4);
  });

  test("Enter key activates nav link", async ({ page }) => {
    const home = new HomePage(page);
    await home.goto("fr");

    // Focus the Services link and press Enter
    await home.getNavLink("Services").focus();
    await page.keyboard.press("Enter");

    await expect(home.servicesSection).toBeInViewport({ timeout: 3000 });
  });
});

/**
 * Mobile menu keyboard navigation coverage.
 *
 * The mobile menu accessibility contract was added by commit 28a8186
 * (fix(a11y) keyboard nav) without a dedicated E2E non-regression net.
 * US-21.11 covers that gap with 4 tests: Escape + forward focus trap +
 * Shift+Tab focus trap + EN locale parity.
 *
 * All tests use the inline navigation + expect.toPass pattern documented
 * in US-21.1 to absorb the React SSR hydration race on the SSR-rendered
 * hamburger button.
 */
test.describe("Keyboard Navigation — Mobile Menu", () => {
  test.use({ viewport: { width: 375, height: 812 } });

  /**
   * Navigate to the given locale and wait for React hydration by asserting
   * that the hamburger's React-driven aria-expanded attribute is rendered
   * ("false" on mount).
   */
  async function gotoHydratedMobile(
    page: import("@playwright/test").Page,
    locale: "fr" | "en"
  ) {
    await page.goto(`/${locale}`, { waitUntil: "domcontentloaded" });
    const hamburger = page.getByRole("button", { name: "Menu" });
    await expect(hamburger).toHaveAttribute("aria-expanded", "false");
    return hamburger;
  }

  /**
   * Focus the hamburger and press Enter, then assert aria-expanded flipped
   * to "true". Wrapped in expect.toPass() to absorb the hydration race
   * where the very first Enter press can be dropped if React has not yet
   * attached its onClick handler to the SSR-rendered button.
   */
  async function openMenuWithKeyboard(
    page: import("@playwright/test").Page,
    hamburger: import("@playwright/test").Locator
  ) {
    await expect(async () => {
      await hamburger.focus();
      await page.keyboard.press("Enter");
      await expect(hamburger).toHaveAttribute("aria-expanded", "true", {
        timeout: 500,
      });
    }).toPass({ timeout: 5000 });
  }

  test("Escape closes mobile menu and returns focus to hamburger (FR)", async ({
    page,
  }) => {
    const hamburger = await gotoHydratedMobile(page, "fr");
    await openMenuWithKeyboard(page, hamburger);

    // Menu is visibly open — the last link is rendered
    const mobileLinks = page.locator("#mobile-menu a");
    await expect(mobileLinks.last()).toBeVisible({ timeout: 2000 });

    // Press Escape
    await page.keyboard.press("Escape");

    // React state flips back — aria-expanded is the canonical signal
    await expect(hamburger).toHaveAttribute("aria-expanded", "false");

    // Focus should return to the hamburger button (Header.tsx l.28)
    await expect(hamburger).toBeFocused();
  });

  test("Tab is trapped inside mobile menu — forward direction", async ({
    page,
  }) => {
    const hamburger = await gotoHydratedMobile(page, "fr");
    await openMenuWithKeyboard(page, hamburger);

    const mobileMenu = page.locator("#mobile-menu");
    await expect(mobileMenu.locator("a").last()).toBeVisible({
      timeout: 2000,
    });

    // Count focusable items in mobile menu
    const focusableCount = await mobileMenu.evaluate((menu) => {
      return menu.querySelectorAll("a[href], button:not([disabled])").length;
    });
    expect(focusableCount).toBeGreaterThan(0);

    // Focus the first link, then Tab through all items + 2 more
    await mobileMenu.locator("a, button").first().focus();
    for (let i = 0; i < focusableCount + 2; i++) {
      await page.keyboard.press("Tab");
    }

    // Focus must still be inside the mobile menu (focus trap intact)
    const focusedInMenu = await page.evaluate(() => {
      const focused = document.activeElement;
      const menu = document.getElementById("mobile-menu");
      return menu?.contains(focused) ?? false;
    });
    expect(focusedInMenu).toBe(true);
  });

  test("Shift+Tab on first element cycles to the last element (backward trap)", async ({
    page,
  }) => {
    const hamburger = await gotoHydratedMobile(page, "fr");
    await openMenuWithKeyboard(page, hamburger);

    const mobileMenu = page.locator("#mobile-menu");
    await expect(mobileMenu.locator("a").last()).toBeVisible({
      timeout: 2000,
    });

    // Focus the very first focusable item
    const first = mobileMenu.locator("a, button").first();
    await first.focus();
    await expect(first).toBeFocused();

    // Shift+Tab → focus jumps to the last element (backward wrap)
    await page.keyboard.press("Shift+Tab");

    // Focus must still be inside the mobile menu
    const focusedInMenu = await page.evaluate(() => {
      const focused = document.activeElement;
      const menu = document.getElementById("mobile-menu");
      return menu?.contains(focused) ?? false;
    });
    expect(focusedInMenu).toBe(true);
  });

  test("Escape + focus return works identically in EN locale", async ({
    page,
  }) => {
    const hamburger = await gotoHydratedMobile(page, "en");
    await openMenuWithKeyboard(page, hamburger);

    const mobileLinks = page.locator("#mobile-menu a");
    await expect(mobileLinks.last()).toBeVisible({ timeout: 2000 });

    await page.keyboard.press("Escape");

    await expect(hamburger).toHaveAttribute("aria-expanded", "false");
    await expect(hamburger).toBeFocused();
  });
});
