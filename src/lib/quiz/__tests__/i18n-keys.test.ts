import { describe, it, expect } from "vitest";
import { ITSM_CONFIG } from "@/config/quiz/itsm";
import { CX_CONFIG } from "@/config/quiz/cx";
import { ESM_CONFIG } from "@/config/quiz/esm";
import type { QuizConfig } from "@/config/quiz/types";
import frMessages from "@/messages/fr.json";
import enMessages from "@/messages/en.json";

/**
 * Resolve a dot-separated key path in a nested object.
 * e.g. resolve("quiz.itsm.q.1a.text", messages) → string | undefined
 */
function resolve(key: string, obj: Record<string, unknown>): unknown {
  return key.split(".").reduce<unknown>((acc, part) => {
    if (acc && typeof acc === "object" && part in (acc as Record<string, unknown>)) {
      return (acc as Record<string, unknown>)[part];
    }
    return undefined;
  }, obj);
}

/** Extract all i18n keys referenced in a quiz config. */
function extractKeys(config: QuizConfig): string[] {
  const keys: string[] = [];

  // Dimension keys
  for (const dim of config.dimensions) {
    keys.push(dim.nameKey);
    keys.push(dim.commercialAngleKey);
    keys.push(dim.benchmarkKey);
  }

  // Question + option keys
  for (const q of config.questions) {
    keys.push(q.questionKey);
    for (const opt of q.options) {
      keys.push(opt.labelKey);
    }
  }

  // Level keys
  for (const level of config.levels) {
    keys.push(level.labelKey);
    keys.push(level.descriptionKey);
    keys.push(level.ctaKey);
  }

  return keys;
}

describe("Quiz i18n key validation", () => {
  const itsmKeys = extractKeys(ITSM_CONFIG);
  const cxKeys = extractKeys(CX_CONFIG);
  const esmKeys = extractKeys(ESM_CONFIG);

  describe("ITSM config keys exist in fr.json", () => {
    it.each(itsmKeys)("key '%s' exists", (key) => {
      const value = resolve(key, frMessages as Record<string, unknown>);
      expect(value, `Missing in fr.json: ${key}`).toBeDefined();
      expect(typeof value, `Not a string in fr.json: ${key}`).toBe("string");
    });
  });

  describe("ITSM config keys exist in en.json", () => {
    it.each(itsmKeys)("key '%s' exists", (key) => {
      const value = resolve(key, enMessages as Record<string, unknown>);
      expect(value, `Missing in en.json: ${key}`).toBeDefined();
      expect(typeof value, `Not a string in en.json: ${key}`).toBe("string");
    });
  });

  describe("CX config keys exist in fr.json", () => {
    it.each(cxKeys)("key '%s' exists", (key) => {
      const value = resolve(key, frMessages as Record<string, unknown>);
      expect(value, `Missing in fr.json: ${key}`).toBeDefined();
      expect(typeof value, `Not a string in fr.json: ${key}`).toBe("string");
    });
  });

  describe("CX config keys exist in en.json", () => {
    it.each(cxKeys)("key '%s' exists", (key) => {
      const value = resolve(key, enMessages as Record<string, unknown>);
      expect(value, `Missing in en.json: ${key}`).toBeDefined();
      expect(typeof value, `Not a string in en.json: ${key}`).toBe("string");
    });
  });

  describe("ESM config keys exist in fr.json", () => {
    it.each(esmKeys)("key '%s' exists", (key) => {
      const value = resolve(key, frMessages as Record<string, unknown>);
      expect(value, `Missing in fr.json: ${key}`).toBeDefined();
      expect(typeof value, `Not a string in fr.json: ${key}`).toBe("string");
    });
  });

  describe("ESM config keys exist in en.json", () => {
    it.each(esmKeys)("key '%s' exists", (key) => {
      const value = resolve(key, enMessages as Record<string, unknown>);
      expect(value, `Missing in en.json: ${key}`).toBeDefined();
      expect(typeof value, `Not a string in en.json: ${key}`).toBe("string");
    });
  });

  describe("FR/EN parity for quiz namespace", () => {
    it("fr.json and en.json have the same quiz.results keys", () => {
      const frResults = frMessages.quiz?.results;
      const enResults = enMessages.quiz?.results;
      expect(frResults).toBeDefined();
      expect(enResults).toBeDefined();
      if (frResults && enResults) {
        expect(Object.keys(frResults).sort()).toEqual(
          Object.keys(enResults).sort()
        );
      }
    });
  });
});
