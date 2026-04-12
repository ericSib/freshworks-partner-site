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
    // Navigate with domcontentloaded (instead of the default "load" event)
    // because mobile viewport + third-party assets (Calendly, analytics)
    // can delay the load event beyond the default test timeout.
    await page.goto("/fr", { waitUntil: "domcontentloaded" });

    // US-21.1: deterministic wait on the React-driven aria-expanded flip,
    // instead of a fixed delay waiting for the bg-deep CSS transition to
    // complete. We do not depend on the visual transition here because
    // color-contrast is disabled on the mobile menu scan below.
    //
    // Click + assert inside toPass() handles the React hydration race: the
    // <button> is rendered by SSR and visible immediately, but its onClick
    // handler only attaches after hydration. If the first click fires
    // before hydration, the event is lost; the retry clicks again until
    // aria-expanded flips to "true".
    const hamburger = page.getByRole("button", { name: "Menu" });
    await expect(hamburger).toHaveAttribute("aria-expanded", "false");

    await expect(async () => {
      await hamburger.click();
      await expect(hamburger).toHaveAttribute("aria-expanded", "true", {
        timeout: 500,
      });
    }).toPass({ timeout: 5000 });

    const mobileLinks = page.locator("#mobile-menu a");
    await expect(mobileLinks.last()).toBeVisible({ timeout: 2000 });

    // Scan the mobile menu — disable color-contrast because axe-core
    // miscomputes oklch colors behind backdrop-blur/opacity parents
    // (known false positive with Tailwind v4 oklch + axe 4.x).
    // Manually verified: slate-300 (#CBD5E1) on deep (#0C1220) = 12.59:1
    // contrast ratio, well above WCAG AA 4.5:1 threshold (Sprint 15).
    const results = await new AxeBuilder({ page })
      .include("#mobile-menu")
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .disableRules(["color-contrast"])
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

    const results = await new AxeBuilder({ page })
      .include("#contact")
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
      expect(
        critical,
        `A11y violations in contact form with errors:\n${summary.join("\n")}`
      ).toHaveLength(0);
    }
  });
});
