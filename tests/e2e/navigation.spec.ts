import { test, expect } from "@playwright/test";
import { HomePage } from "./pages/HomePage";

test.describe("Navigation — Desktop", () => {
  test.beforeEach(({ isMobile }) => {
    test.skip(!!isMobile, "Desktop-only tests");
  });

  test("desktop nav links are visible in FR", async ({ page }) => {
    const home = new HomePage(page);
    await home.goto("fr");

    await expect(home.getNavLink("Services")).toBeVisible();
    await expect(home.getNavLink("Cas clients")).toBeVisible();
    await expect(home.getNavLink("À propos")).toBeVisible();
    await expect(home.getNavLink("Contact")).toBeVisible();
  });

  test("clicking Services nav link scrolls to services section", async ({
    page,
  }) => {
    const home = new HomePage(page);
    await home.goto("fr");

    await home.getNavLink("Services").click();
    await expect(home.servicesSection).toBeInViewport({ timeout: 3000 });
  });

  test("clicking 'Book a Call' CTA scrolls to contact section", async ({
    page,
  }) => {
    const home = new HomePage(page);
    await home.goto("fr");

    await home.bookCallCta.first().click();
    await expect(home.contactSection).toBeInViewport({ timeout: 3000 });
  });

  test("nav links are correct in EN", async ({ page }) => {
    const home = new HomePage(page);
    await home.goto("en");

    await expect(home.getNavLink("Services")).toBeVisible();
    await expect(home.getNavLink("Case Studies")).toBeVisible();
    await expect(home.getNavLink("About")).toBeVisible();
    await expect(home.getNavLink("Contact")).toBeVisible();
  });
});

test.describe("Navigation — Footer", () => {
  test("footer contains navigation links", async ({ page }) => {
    const home = new HomePage(page);
    await home.goto("fr");

    const footerLinks = home.getFooterNavLinks();
    const count = await footerLinks.count();
    expect(count).toBeGreaterThanOrEqual(4);
  });
});
