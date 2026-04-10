import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

/**
 * US-21.2 — Smoke + axe-core coverage for the legal notice page.
 *
 * The /mentions-legales page is a legal requirement (RGPD + LCEN).
 * It must stay bilingual, structurally correct, and WCAG 2.1 AA compliant.
 */

/** Section headings in source order (locale-independent structure). */
const EXPECTED_H2_COUNT = 6;

function filterCritical(
  violations: Array<{
    impact?: string | null;
    id: string;
    description: string;
    nodes: unknown[];
  }>
) {
  return violations.filter(
    (v) => v.impact === "critical" || v.impact === "serious"
  );
}

function formatViolations(
  violations: ReturnType<typeof filterCritical>
): string {
  return violations
    .map(
      (v) =>
        `[${v.impact}] ${v.id}: ${v.description} (${v.nodes.length} occurrence(s))`
    )
    .join("\n");
}

test.describe("Legal notice — FR smoke", () => {
  test("FR page structure: h1, 6 h2 sections, breadcrumb", async ({ page }) => {
    await page.goto("/fr/mentions-legales", {
      waitUntil: "domcontentloaded",
    });

    // H1 with the translated title (FR: "Mentions légales")
    const h1 = page.getByRole("heading", { level: 1 });
    await expect(h1).toBeVisible();
    await expect(h1).toHaveText(/mentions légales/i);

    // Exactly 6 section headings
    const h2s = page.getByRole("heading", { level: 2 });
    await expect(h2s).toHaveCount(EXPECTED_H2_COUNT);

    // Each section is rendered (FR canonical headings)
    const frExpectedHeadings = [
      /éditeur/i,
      /hébergement/i,
      /propriété intellectuelle/i,
      /données personnelles/i,
      /cookies/i,
      /contact/i,
    ];
    for (const pattern of frExpectedHeadings) {
      await expect(
        page.getByRole("heading", { level: 2, name: pattern })
      ).toBeVisible();
    }

    // Breadcrumb: nav[aria-label="breadcrumb"] with a link to /fr
    const breadcrumb = page.getByRole("navigation", { name: "breadcrumb" });
    await expect(breadcrumb).toBeVisible();
    const homeLink = breadcrumb.getByRole("link", { name: /accueil/i });
    await expect(homeLink).toHaveAttribute("href", "/fr");

    // The current page is marked via aria-current="page"
    await expect(breadcrumb.locator('[aria-current="page"]')).toHaveText(
      /mentions légales/i
    );
  });
});

test.describe("Legal notice — EN smoke", () => {
  test("EN page structure: h1, 6 h2 sections, breadcrumb", async ({ page }) => {
    await page.goto("/en/mentions-legales", {
      waitUntil: "domcontentloaded",
    });

    // H1 with the translated title (EN: "Legal Notice")
    const h1 = page.getByRole("heading", { level: 1 });
    await expect(h1).toBeVisible();
    await expect(h1).toHaveText(/legal notice/i);

    // Exactly 6 section headings
    const h2s = page.getByRole("heading", { level: 2 });
    await expect(h2s).toHaveCount(EXPECTED_H2_COUNT);

    // Each section is rendered (EN canonical headings)
    const enExpectedHeadings = [
      /site publisher/i,
      /hosting/i,
      /intellectual property/i,
      /personal data/i,
      /cookies/i,
      /contact/i,
    ];
    for (const pattern of enExpectedHeadings) {
      await expect(
        page.getByRole("heading", { level: 2, name: pattern })
      ).toBeVisible();
    }

    // Breadcrumb: "Home" link points to /en
    const breadcrumb = page.getByRole("navigation", { name: "breadcrumb" });
    await expect(breadcrumb).toBeVisible();
    const homeLink = breadcrumb.getByRole("link", { name: /home/i });
    await expect(homeLink).toHaveAttribute("href", "/en");
  });
});

test.describe("Legal notice — footer navigation", () => {
  test("Footer link on /fr navigates to /fr/mentions-legales", async ({
    page,
  }) => {
    await page.goto("/fr", { waitUntil: "domcontentloaded" });

    // The footer link is rendered via next-intl's <Link>, resolving to
    // /fr/mentions-legales at runtime.
    const footer = page.locator("footer");
    await footer.scrollIntoViewIfNeeded();
    const legalLink = footer.getByRole("link", { name: /mentions légales/i });
    await expect(legalLink).toBeVisible();

    await legalLink.click();
    await expect(page).toHaveURL(/\/fr\/mentions-legales$/);

    // Confirm we landed on the correct page (re-use a subset of the FR smoke)
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      /mentions légales/i
    );
  });
});

test.describe("Legal notice — axe-core accessibility", () => {
  test("FR has no critical or serious a11y violations", async ({ page }) => {
    await page.goto("/fr/mentions-legales", {
      waitUntil: "domcontentloaded",
    });
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();

    const critical = filterCritical(results.violations);
    expect(
      critical,
      critical.length > 0
        ? `A11y violations on /fr/mentions-legales:\n${formatViolations(critical)}`
        : undefined
    ).toHaveLength(0);
  });

  test("EN has no critical or serious a11y violations", async ({ page }) => {
    await page.goto("/en/mentions-legales", {
      waitUntil: "domcontentloaded",
    });
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();

    const critical = filterCritical(results.violations);
    expect(
      critical,
      critical.length > 0
        ? `A11y violations on /en/mentions-legales:\n${formatViolations(critical)}`
        : undefined
    ).toHaveLength(0);
  });
});
