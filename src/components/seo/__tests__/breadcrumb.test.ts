/**
 * Tests for Breadcrumb navigation config and i18n.
 * US-22.7
 */

import { describe, it, expect } from "vitest";
import { BREADCRUMB_PAGES } from "@/config/navigation";
import { SITE_URL } from "@/config/site";
import frMessages from "@/messages/fr.json";
import enMessages from "@/messages/en.json";

describe("Breadcrumb config (US-22.7)", () => {
  it("has entries for quiz and legal pages", () => {
    const slugs = BREADCRUMB_PAGES.map((p) => p.slug);
    expect(slugs).toContain("quiz");
    expect(slugs).toContain("mentions-legales");
  });

  it("all entries have a slug and labelKey", () => {
    BREADCRUMB_PAGES.forEach((page) => {
      expect(page.slug).toBeTruthy();
      expect(page.labelKey).toBeTruthy();
    });
  });
});

describe("Breadcrumb i18n (US-22.7)", () => {
  it("FR has breadcrumb namespace with home, quiz, legal", () => {
    expect(frMessages.breadcrumb.home).toBeTruthy();
    expect(frMessages.breadcrumb.quiz).toBeTruthy();
    expect(frMessages.breadcrumb.legal).toBeTruthy();
  });

  it("EN has breadcrumb namespace with home, quiz, legal", () => {
    expect(enMessages.breadcrumb.home).toBeTruthy();
    expect(enMessages.breadcrumb.quiz).toBeTruthy();
    expect(enMessages.breadcrumb.legal).toBeTruthy();
  });

  it("all labelKeys in BREADCRUMB_PAGES exist in FR translations", () => {
    BREADCRUMB_PAGES.forEach((page) => {
      const value = frMessages.breadcrumb[page.labelKey as keyof typeof frMessages.breadcrumb];
      expect(value, `Missing FR breadcrumb.${page.labelKey}`).toBeTruthy();
    });
  });

  it("all labelKeys in BREADCRUMB_PAGES exist in EN translations", () => {
    BREADCRUMB_PAGES.forEach((page) => {
      const value = enMessages.breadcrumb[page.labelKey as keyof typeof enMessages.breadcrumb];
      expect(value, `Missing EN breadcrumb.${page.labelKey}`).toBeTruthy();
    });
  });
});

describe("BreadcrumbList JSON-LD structure (US-22.7)", () => {
  // Simulate the schema built by the component
  function buildBreadcrumbSchema(locale: string, slug: string, label: string) {
    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: locale === "fr" ? "Accueil" : "Home",
          item: `${SITE_URL}/${locale}`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: label,
          item: `${SITE_URL}/${locale}/${slug}`,
        },
      ],
    };
  }

  const schema = buildBreadcrumbSchema("fr", "quiz", "Quiz Maturité");

  it("has @type BreadcrumbList", () => {
    expect(schema["@type"]).toBe("BreadcrumbList");
  });

  it("has 2 list items (Home + current page)", () => {
    expect(schema.itemListElement).toHaveLength(2);
  });

  it("first item is Home with position 1", () => {
    expect(schema.itemListElement[0].position).toBe(1);
    expect(schema.itemListElement[0].name).toBe("Accueil");
    expect(schema.itemListElement[0].item).toContain("/fr");
  });

  it("second item is current page with position 2", () => {
    expect(schema.itemListElement[1].position).toBe(2);
    expect(schema.itemListElement[1].name).toBe("Quiz Maturité");
    expect(schema.itemListElement[1].item).toContain("/fr/quiz");
  });
});
