import type { Page, Locator } from "@playwright/test";

/**
 * Page Object Model for the What A Service homepage.
 * Centralizes all selectors using accessible queries and data-testid.
 */
export class HomePage {
  readonly page: Page;

  // Header
  readonly header: Locator;
  readonly logo: Locator;
  readonly desktopNav: Locator;
  readonly langToggle: Locator;
  readonly bookCallCta: Locator;
  readonly mobileMenuButton: Locator;
  readonly mobileNav: Locator;
  readonly mobileMenu: Locator;

  // Sections
  readonly heroSection: Locator;
  readonly problemsSection: Locator;
  readonly clientLogosSection: Locator;
  readonly metricsSection: Locator;
  readonly processSection: Locator;
  readonly servicesSection: Locator;
  readonly caseStudiesSection: Locator;
  readonly freshworksProductsSection: Locator;
  readonly aboutSection: Locator;
  readonly contactSection: Locator;

  // Contact form
  readonly contactForm: Locator;
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly companyInput: Locator;
  readonly challengeSelect: Locator;
  readonly submitButton: Locator;

  // Footer
  readonly footer: Locator;

  constructor(page: Page) {
    this.page = page;

    // Header — use data-testid instead of fragile Tailwind selectors
    this.header = page.locator("header");
    this.logo = page.getByRole("link", { name: "What A Service" }).first();
    this.desktopNav = page.getByTestId("desktop-nav");
    this.langToggle = page.getByRole("button", {
      name: /English|Fran[cç]ais|Switch|Passer/i,
    });
    this.bookCallCta = page.getByRole("link", {
      name: /Réserver un appel|Book a Call/,
    });
    this.mobileMenuButton = page.getByRole("button", { name: "Menu" });
    this.mobileNav = page.getByTestId("mobile-nav");
    this.mobileMenu = page.locator("#mobile-menu");

    // Sections — use id or data-testid
    this.heroSection = page.locator("section").first();
    this.problemsSection = page.getByTestId("problems");
    this.clientLogosSection = page.getByTestId("client-logos");
    this.metricsSection = page.getByTestId("metrics");
    this.processSection = page.getByTestId("process");
    this.servicesSection = page.locator("#services");
    this.caseStudiesSection = page.locator("#case-studies");
    this.freshworksProductsSection = page.getByTestId("freshworks-products");
    this.aboutSection = page.locator("#about");
    this.contactSection = page.locator("#contact");

    // Contact form — use accessible selectors
    this.contactForm = page.locator("#contact form");
    this.nameInput = page.locator("#contact-name");
    this.emailInput = page.locator("#contact-email");
    this.companyInput = page.locator("#contact-company");
    this.challengeSelect = page.locator("#contact-challenge");
    this.submitButton = page.locator('#contact button[type="submit"]');

    // Footer
    this.footer = page.locator("footer");
  }

  /** Navigate to the homepage for a given locale */
  async goto(locale: "fr" | "en" = "fr") {
    await this.page.goto(`/${locale}`);
    await this.page.waitForLoadState("domcontentloaded");
  }

  /** Get all desktop navigation links */
  getDesktopNavLinks() {
    return this.desktopNav.getByRole("link");
  }

  /** Get a specific desktop nav anchor by text */
  getNavLink(text: string) {
    return this.desktopNav.locator("a", { hasText: text });
  }

  /** Get footer navigation links */
  getFooterNavLinks() {
    return this.footer.getByRole("link");
  }

  /** Click the language toggle button */
  async switchLanguage() {
    await this.langToggle.first().click();
  }

  /** Open the mobile menu */
  async openMobileMenu() {
    await this.mobileMenuButton.click();
  }

  /** Get mobile nav links (visible after menu open) */
  getMobileNavLinks() {
    return this.mobileNav.locator("a");
  }

  /** Fill the contact form with given data */
  async fillContactForm(data: {
    name: string;
    email: string;
    company: string;
    challenge?: string;
  }) {
    await this.nameInput.fill(data.name);
    await this.emailInput.fill(data.email);
    await this.companyInput.fill(data.company);
    if (data.challenge) {
      await this.challengeSelect.selectOption(data.challenge);
    }
  }

  /** Submit the contact form */
  async submitContactForm() {
    await this.submitButton.click();
  }
}
