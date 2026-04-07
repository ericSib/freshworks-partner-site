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

test.describe("Keyboard Navigation — Mobile Menu", () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test("Escape closes mobile menu and returns focus to hamburger", async ({
    page,
  }) => {
    const home = new HomePage(page);
    await home.goto("fr");

    await home.openMobileMenu();
    const mobileLinks = home.getMobileNavLinks();
    await expect(mobileLinks.first()).toBeVisible({ timeout: 2000 });

    // Press Escape
    await page.keyboard.press("Escape");

    // Menu should close
    await expect(home.mobileMenu).toHaveAttribute("aria-hidden", "true");

    // Focus should return to hamburger button
    const focused = page.locator(":focus");
    await expect(focused).toHaveAttribute("aria-label", "Menu");
  });

  test("Tab is trapped inside mobile menu", async ({ page }) => {
    const home = new HomePage(page);
    await home.goto("fr");

    await home.openMobileMenu();
    const mobileLinks = home.getMobileNavLinks();
    await expect(mobileLinks.first()).toBeVisible({ timeout: 2000 });

    // Focus the first link
    await mobileLinks.first().focus();

    // Count focusable items in mobile menu
    const focusableCount = await home.mobileNav.evaluate((nav) => {
      return nav.querySelectorAll("a[href], button:not([disabled])").length;
    });

    // Tab through all items — should cycle back
    for (let i = 0; i < focusableCount + 1; i++) {
      await page.keyboard.press("Tab");
    }

    // Focus should still be inside the mobile menu (trapped)
    const focusedInMenu = await page.evaluate(() => {
      const focused = document.activeElement;
      const menu = document.getElementById("mobile-menu");
      return menu?.contains(focused) ?? false;
    });
    expect(focusedInMenu).toBe(true);
  });
});
