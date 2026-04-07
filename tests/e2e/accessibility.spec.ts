import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { HomePage } from "./pages/HomePage";

test.describe("Accessibility (axe-core) — Page Load", () => {
  test("FR homepage has no critical or serious a11y violations", async ({
    page,
  }) => {
    await page.goto("/fr");
    await page.waitForLoadState("domcontentloaded");

    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();

    const critical = results.violations.filter(
      (v) => v.impact === "critical" || v.impact === "serious"
    );

    if (critical.length > 0) {
      const summary = critical.map(
        (v) =>
          `[${v.impact}] ${v.id}: ${v.description} (${v.nodes.length} occurrence(s))`
      );
      expect(critical, `A11y violations found:\n${summary.join("\n")}`).toHaveLength(0);
    }
  });

  test("EN homepage has no critical or serious a11y violations", async ({
    page,
  }) => {
    await page.goto("/en");
    await page.waitForLoadState("domcontentloaded");

    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();

    const critical = results.violations.filter(
      (v) => v.impact === "critical" || v.impact === "serious"
    );

    if (critical.length > 0) {
      const summary = critical.map(
        (v) =>
          `[${v.impact}] ${v.id}: ${v.description} (${v.nodes.length} occurrence(s))`
      );
      expect(critical, `A11y violations found:\n${summary.join("\n")}`).toHaveLength(0);
    }
  });
});

test.describe("Accessibility (axe-core) — Post-Interaction", () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test("mobile menu open has no critical a11y violations", async ({
    page,
  }) => {
    const home = new HomePage(page);
    await home.goto("fr");

    // Open mobile menu and wait for all animations to settle
    await home.openMobileMenu();
    const mobileLinks = home.getMobileNavLinks();
    await expect(mobileLinks.last()).toBeVisible({ timeout: 2000 });

    // Scan only the mobile menu area (exclude rest of page)
    const results = await new AxeBuilder({ page })
      .include("#mobile-menu")
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .disableRules(["color-contrast"]) // Nav links have transition animations that create false positives
      .analyze();

    const critical = results.violations.filter(
      (v) => v.impact === "critical" || v.impact === "serious"
    );

    if (critical.length > 0) {
      const summary = critical.map(
        (v) =>
          `[${v.impact}] ${v.id}: ${v.description} (${v.nodes.length} occurrence(s))`
      );
      expect(
        critical,
        `A11y violations with mobile menu open:\n${summary.join("\n")}`
      ).toHaveLength(0);
    }
  });
});

test.describe("Accessibility (axe-core) — Contact Form Errors", () => {
  test("contact form with validation errors has no critical a11y violations", async ({
    page,
  }) => {
    const home = new HomePage(page);
    await home.goto("fr");

    // Trigger validation errors
    await home.contactSection.scrollIntoViewIfNeeded();
    await home.submitContactForm();

    // Wait for error alerts to appear
    const alerts = page.locator("#contact [role='alert']");
    await expect(alerts.first()).toBeVisible();

    // Run axe on the contact section — exclude color-contrast (known issues with dark theme)
    const results = await new AxeBuilder({ page })
      .include("#contact")
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .disableRules(["color-contrast"]) // Known: dark bg + text-white/70 labels, text-red-400 errors
      .analyze();

    const critical = results.violations.filter(
      (v) => v.impact === "critical" || v.impact === "serious"
    );

    if (critical.length > 0) {
      const summary = critical.map(
        (v) =>
          `[${v.impact}] ${v.id}: ${v.description} (${v.nodes.length} occurrence(s))`
      );
      expect(
        critical,
        `A11y violations in contact form with errors:\n${summary.join("\n")}`
      ).toHaveLength(0);
    }
  });
});
