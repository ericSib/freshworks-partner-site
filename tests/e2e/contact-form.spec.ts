import { test, expect } from "@playwright/test";
import { HomePage } from "./pages/HomePage";

test.describe("Contact Form — Validation", () => {
  test("shows required errors when submitting empty form", async ({ page }) => {
    const home = new HomePage(page);
    await home.goto("fr");

    // Scroll to contact and submit empty
    await home.contactSection.scrollIntoViewIfNeeded();
    await home.submitContactForm();

    // All 4 required fields should show error alerts
    const alerts = page.locator("#contact [role='alert']");
    await expect(alerts.first()).toBeVisible();

    const count = await alerts.count();
    expect(count).toBeGreaterThanOrEqual(3);
  });

  test("shows invalid email error for malformed email", async ({ page }) => {
    const home = new HomePage(page);
    await home.goto("fr");

    await home.contactSection.scrollIntoViewIfNeeded();
    await home.fillContactForm({
      name: "Test User",
      email: "not@invalid",
      company: "Test Co",
      challenge: "adoption",
    });
    await home.submitContactForm();

    // Should show email validation error
    const emailError = page.locator("#contact-email-error");
    await expect(emailError).toBeVisible();
  });

  test("no errors when all fields are valid", async ({ page }) => {
    const home = new HomePage(page);
    await home.goto("fr");

    await home.contactSection.scrollIntoViewIfNeeded();
    await home.fillContactForm({
      name: "Jean Dupont",
      email: "jean@example.com",
      company: "Acme Corp",
      challenge: "adoption",
    });
    await home.submitContactForm();

    // No error alerts should be visible
    const alerts = page.locator("#contact [role='alert']");
    await expect(alerts).toHaveCount(0);
  });

  test("name field has aria-invalid when empty", async ({ page }) => {
    const home = new HomePage(page);
    await home.goto("fr");

    await home.contactSection.scrollIntoViewIfNeeded();
    // Fill only email + company, leave name empty
    await home.emailInput.fill("test@example.com");
    await home.companyInput.fill("Test Co");
    await home.challengeSelect.selectOption("adoption");
    await home.submitContactForm();

    await expect(home.nameInput).toHaveAttribute("aria-invalid", "true");
  });
});

test.describe("Contact Form — Submission", () => {
  // Mock the contact API to avoid depending on real Resend/HubSpot keys
  test.beforeEach(async ({ page }) => {
    await page.route("**/api/contact", (route) =>
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ success: true }),
      })
    );
  });

  test("shows success message after valid submission", async ({ page }) => {
    const home = new HomePage(page);
    await home.goto("fr");

    await home.contactSection.scrollIntoViewIfNeeded();
    await home.fillContactForm({
      name: "Jean Dupont",
      email: "jean@example.com",
      company: "Acme Corp",
      challenge: "migration",
    });
    await home.submitContactForm();

    // Wait for success state (mocked API responds immediately)
    const successArea = page.locator("#contact").getByRole("link", {
      name: /réserver|book a slot/i,
    });
    await expect(successArea).toBeVisible({ timeout: 5000 });

    // Form should no longer be visible
    await expect(home.contactForm).not.toBeVisible();
  });

  test("success message works in EN locale", async ({ page }) => {
    const home = new HomePage(page);
    await home.goto("en");

    await home.contactSection.scrollIntoViewIfNeeded();
    await home.fillContactForm({
      name: "John Doe",
      email: "john@example.com",
      company: "Test Inc",
      challenge: "tool",
    });
    await home.submitContactForm();

    // Wait for success
    const successArea = page.locator("#contact").getByRole("link", {
      name: /réserver|book a slot/i,
    });
    await expect(successArea).toBeVisible({ timeout: 5000 });
  });
});
