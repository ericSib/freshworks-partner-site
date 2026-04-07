import { test, expect } from "@playwright/test";
import { HomePage } from "./pages/HomePage";

test.describe("Homepage — Smoke Tests", () => {
  test("loads in FR (default locale)", async ({ page }) => {
    const home = new HomePage(page);
    await home.goto("fr");

    await expect(page).toHaveURL(/\/fr/);
    await expect(home.header).toBeVisible();
    await expect(home.heroSection).toBeVisible();
  });

  test("loads in EN", async ({ page }) => {
    const home = new HomePage(page);
    await home.goto("en");

    await expect(page).toHaveURL(/\/en/);
    await expect(home.header).toBeVisible();
    await expect(home.heroSection).toBeVisible();
  });

  test("page title is correct in FR", async ({ page }) => {
    const home = new HomePage(page);
    await home.goto("fr");

    await expect(page).toHaveTitle(/What A Service/);
  });

  test("page title is correct in EN", async ({ page }) => {
    const home = new HomePage(page);
    await home.goto("en");

    await expect(page).toHaveTitle(/What A Service/);
  });

  test("all main sections are rendered in FR", async ({ page }) => {
    const home = new HomePage(page);
    await home.goto("fr");

    await expect(home.heroSection).toBeVisible();
    await expect(home.problemsSection).toBeAttached();
    await expect(home.clientLogosSection).toBeAttached();
    await expect(home.metricsSection).toBeAttached();
    await expect(home.processSection).toBeAttached();
    await expect(home.servicesSection).toBeAttached();
    await expect(home.caseStudiesSection).toBeAttached();
    await expect(home.freshworksProductsSection).toBeAttached();
    await expect(home.aboutSection).toBeAttached();
    await expect(home.contactSection).toBeAttached();
  });

  test("logo is visible in header", async ({ page }) => {
    const home = new HomePage(page);
    await home.goto("fr");

    await expect(home.logo).toBeVisible();
  });

  test("footer renders with nav links", async ({ page }) => {
    const home = new HomePage(page);
    await home.goto("fr");

    await expect(home.footer).toBeVisible();
    const footerLinks = home.getFooterNavLinks();
    await expect(footerLinks.first()).toBeVisible();
  });

  test("footer displays certifications", async ({ page }) => {
    const home = new HomePage(page);
    await home.goto("fr");

    await expect(home.footer.getByText("ITIL 4")).toBeVisible();
    await expect(home.footer.getByText("PRINCE2")).toBeVisible();
    await expect(home.footer.getByText("Freshworks Partner")).toBeVisible();
  });
});
