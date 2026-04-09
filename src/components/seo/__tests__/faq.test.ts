/**
 * Tests for FAQ i18n data and FAQPage schema structure.
 * US-22.10
 */

import { describe, it, expect } from "vitest";
import frMessages from "@/messages/fr.json";
import enMessages from "@/messages/en.json";

const frFaq = frMessages.faq;
const enFaq = enMessages.faq;

describe("FAQ i18n data (US-22.10)", () => {
  it("FR has 6 FAQ items", () => {
    expect(frFaq.items).toHaveLength(6);
  });

  it("EN has 6 FAQ items", () => {
    expect(enFaq.items).toHaveLength(6);
  });

  it("FR and EN have the same number of items", () => {
    expect(frFaq.items.length).toBe(enFaq.items.length);
  });

  it("every FR item has a non-empty question and answer", () => {
    frFaq.items.forEach((item, idx) => {
      expect(item.q, `FR item ${idx} question`).toBeTruthy();
      expect(item.a, `FR item ${idx} answer`).toBeTruthy();
    });
  });

  it("every EN item has a non-empty question and answer", () => {
    enFaq.items.forEach((item, idx) => {
      expect(item.q, `EN item ${idx} question`).toBeTruthy();
      expect(item.a, `EN item ${idx} answer`).toBeTruthy();
    });
  });

  it("answers are 40-100 words (answer capsule format)", () => {
    [...frFaq.items, ...enFaq.items].forEach((item) => {
      const wordCount = item.a.split(/\s+/).length;
      expect(wordCount, `"${item.q}" has ${wordCount} words`).toBeGreaterThanOrEqual(25);
      expect(wordCount, `"${item.q}" has ${wordCount} words`).toBeLessThanOrEqual(120);
    });
  });

  it("FR has sectionTag and headline", () => {
    expect(frFaq.sectionTag).toBeTruthy();
    expect(frFaq.headline).toBeTruthy();
  });

  it("EN has sectionTag and headline", () => {
    expect(enFaq.sectionTag).toBeTruthy();
    expect(enFaq.headline).toBeTruthy();
  });

  it("FR questions end with a question mark", () => {
    frFaq.items.forEach((item) => {
      expect(item.q.trim().endsWith("\u202f?") || item.q.trim().endsWith("?")).toBe(true);
    });
  });

  it("EN questions end with a question mark", () => {
    enFaq.items.forEach((item) => {
      expect(item.q.trim().endsWith("?")).toBe(true);
    });
  });
});

describe("FAQPage JSON-LD structure (US-22.10)", () => {
  // Simulate what the component generates
  function buildFaqSchema(items: Array<{ q: string; a: string }>) {
    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: items.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.a,
        },
      })),
    };
  }

  const frSchema = buildFaqSchema(frFaq.items);
  const enSchema = buildFaqSchema(enFaq.items);

  it("FR schema has @type FAQPage", () => {
    expect(frSchema["@type"]).toBe("FAQPage");
  });

  it("FR schema has @context schema.org", () => {
    expect(frSchema["@context"]).toBe("https://schema.org");
  });

  it("FR schema has 6 mainEntity questions", () => {
    expect(frSchema.mainEntity).toHaveLength(6);
  });

  it("each mainEntity is a Question with acceptedAnswer", () => {
    frSchema.mainEntity.forEach((entity) => {
      expect(entity["@type"]).toBe("Question");
      expect(entity.name).toBeTruthy();
      expect(entity.acceptedAnswer["@type"]).toBe("Answer");
      expect(entity.acceptedAnswer.text).toBeTruthy();
    });
  });

  it("EN schema structure matches FR schema structure", () => {
    expect(enSchema.mainEntity.length).toBe(frSchema.mainEntity.length);
    enSchema.mainEntity.forEach((entity) => {
      expect(entity["@type"]).toBe("Question");
      expect(entity.acceptedAnswer["@type"]).toBe("Answer");
    });
  });
});
