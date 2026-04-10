import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

/**
 * US-21.3 — Axe-core coverage for the 5 key states of the quiz funnel.
 *
 * Scan states (FR only — EN is out of scope for this story):
 *   A. Segment selector (ITSM / CX)
 *   B. Demographics form
 *   C. Active question (mid-flow)
 *   D. Results screen pre-gate (score + radar + quick wins)
 *   E. Email gate with focus inside the email input
 *
 * A single helper completeItsmQuiz() drives the deterministic flow
 * (3rd option every time → ~60/100 → Level 3 "Established").
 * This helper is intentionally scoped to this file; a shared POM is
 * the subject of US-21.4 (Sprint 15).
 */

const WCAG_TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"];

function filterCritical(
  violations: Array<{
    impact?: string | null;
    id: string;
    description: string;
    nodes: Array<{ target?: unknown }>;
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
    .map((v) => {
      const targets = v.nodes
        .slice(0, 3)
        .map((n) => JSON.stringify(n.target))
        .join(", ");
      return `  [${v.impact}] ${v.id}: ${v.description} (${v.nodes.length}x)${
        targets ? ` — targets: ${targets}` : ""
      }`;
    })
    .join("\n");
}

/** Assert axe violations and produce a helpful error on failure. */
async function expectNoA11yViolations(page: Page, stateName: string) {
  const results = await new AxeBuilder({ page })
    .withTags(WCAG_TAGS)
    .analyze();

  const critical = filterCritical(results.violations);

  expect(
    critical,
    critical.length > 0
      ? `A11y violations on state "${stateName}":\n${formatViolations(critical)}`
      : undefined
  ).toHaveLength(0);
}

/**
 * Navigate to the quiz page and wait for React hydration to complete.
 *
 * We use `domcontentloaded` on goto() to return fast, then explicitly
 * wait for `load` to ensure React has fully hydrated before clicking
 * SSR-rendered buttons. Without this, the very first click can be
 * dropped because its onClick handler hasn't been attached yet.
 */
async function gotoHydratedQuiz(page: Page) {
  await page.goto("/fr/quiz", { waitUntil: "domcontentloaded" });
  await page.waitForLoadState("load");
}

/**
 * Click through the ITSM path up to the results screen.
 * Uses the neutral "3rd option" strategy for a deterministic score.
 */
async function completeItsmQuiz(page: Page) {
  // State A → click ITSM
  await page.getByRole("button", { name: /Services IT/i }).click();

  // State B → fill demographics
  await page.selectOption("#quiz-company-size", "200_499");
  await page.selectOption("#quiz-industry", "tech");
  await page.selectOption("#quiz-role", "itDirector");
  await page.getByRole("button", { name: /marrer/i }).click();

  // Questions 1..9 — pick option #3 every time (deterministic wait pattern
  // from US-21.1: step label increments between questions)
  for (let i = 0; i < 9; i++) {
    const options = page.locator("button[aria-pressed]");
    await expect(options.first()).toBeVisible({ timeout: 3000 });
    await options.nth(2).click();
    if (i < 8) {
      await expect(
        page.getByText(`${i + 2} / 9`, { exact: true })
      ).toBeVisible({ timeout: 2000 });
    }
  }

  // Results screen should now be visible
  await expect(page.getByText("/100")).toBeVisible({ timeout: 5000 });
}

test.describe("Quiz — axe-core coverage (FR)", () => {
  test("State A — segment selector is accessible", async ({ page }) => {
    await gotoHydratedQuiz(page);

    // Selector is visible (both tracks)
    await expect(
      page.getByRole("button", { name: /Services IT/i })
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: /Support Client/i })
    ).toBeVisible();

    await expectNoA11yViolations(page, "A — segment selector");
  });

  test("State B — demographics form is accessible", async ({ page }) => {
    await gotoHydratedQuiz(page);

    // Enter state B (click ITSM)
    await page.getByRole("button", { name: /Services IT/i }).click();

    // Demographics form visible
    await expect(page.locator("#quiz-company-size")).toBeVisible();
    await expect(page.locator("#quiz-industry")).toBeVisible();
    await expect(page.locator("#quiz-role")).toBeVisible();

    await expectNoA11yViolations(page, "B — demographics");
  });

  test("State C — active question is accessible", async ({ page }) => {
    await gotoHydratedQuiz(page);

    // Enter state C (selector → demographics → questions)
    await page.getByRole("button", { name: /Services IT/i }).click();
    await page.selectOption("#quiz-company-size", "200_499");
    await page.selectOption("#quiz-industry", "tech");
    await page.selectOption("#quiz-role", "itDirector");
    await page.getByRole("button", { name: /marrer/i }).click();

    // Question 1 is rendered, no option selected yet
    await expect(page.getByText("1 / 9", { exact: true })).toBeVisible();
    const options = page.locator("button[aria-pressed='false']");
    await expect(options.first()).toBeVisible();

    await expectNoA11yViolations(page, "C — active question");
  });

  test("State D — results screen pre-gate is accessible", async ({ page }) => {
    await gotoHydratedQuiz(page);

    await completeItsmQuiz(page);

    // Pre-gate assertions: score, radar, quick wins, locked gate
    await expect(page.getByText(/Level 3/i)).toBeVisible();
    await expect(page.locator("svg[role='img']")).toBeVisible();
    await expect(
      page.getByPlaceholder(/votre@email\.pro/i)
    ).toBeVisible(); // gate still locked

    await expectNoA11yViolations(page, "D — results pre-gate");
  });

  test("State E — email gate with input focused is accessible", async ({
    page,
  }) => {
    await gotoHydratedQuiz(page);

    await completeItsmQuiz(page);

    // Focus the email input (do NOT submit, to avoid polluting HubSpot)
    const emailInput = page.getByPlaceholder(/votre@email\.pro/i);
    await emailInput.focus();
    await expect(emailInput).toBeFocused();

    await expectNoA11yViolations(page, "E — email gate focused");
  });
});
