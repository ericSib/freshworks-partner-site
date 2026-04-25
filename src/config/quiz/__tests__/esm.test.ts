import { describe, it, expect } from "vitest";
import { ESM_CONFIG } from "../esm";

/**
 * SMI-esm — Structural integrity of the ESM (Employee Service Management)
 * quiz configuration. Driven by D20: 5 dimensions @ 20% each, level
 * nomenclature aligned with ITSM (Firefighting/Reactive/Managed/Strategic/Optimized).
 */

describe("ESM_CONFIG structure", () => {
  it('segment is "esm"', () => {
    expect(ESM_CONFIG.segment).toBe("esm");
  });

  it("uses the quiz.esm i18n namespace", () => {
    expect(ESM_CONFIG.i18nNamespace).toBe("quiz.esm");
  });

  it("has 5 dimensions (D20)", () => {
    expect(ESM_CONFIG.dimensions).toHaveLength(5);
  });

  it("each dimension weighs 0.20 (D20: 5 × 20%)", () => {
    for (const d of ESM_CONFIG.dimensions) {
      expect(d.weight).toBeCloseTo(0.2, 5);
    }
  });

  it("dimension weights sum to 1.0", () => {
    const sum = ESM_CONFIG.dimensions.reduce((acc, d) => acc + d.weight, 0);
    expect(sum).toBeCloseTo(1.0, 5);
  });

  it("dimension ids are unique", () => {
    const ids = ESM_CONFIG.dimensions.map((d) => d.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("covers the 5 ESM dimensions defined in D20", () => {
    const ids = ESM_CONFIG.dimensions.map((d) => d.id).sort();
    expect(ids).toEqual(
      ["analytics", "automation", "experience", "governance", "incident"].sort()
    );
  });

  it("has between 7 and 10 scored questions (story spec)", () => {
    expect(ESM_CONFIG.questions.length).toBeGreaterThanOrEqual(7);
    expect(ESM_CONFIG.questions.length).toBeLessThanOrEqual(10);
  });

  it("question ids are unique and prefixed esm-", () => {
    const ids = ESM_CONFIG.questions.map((q) => q.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const id of ids) {
      expect(id.startsWith("esm-")).toBe(true);
    }
  });

  it("every question maps to a valid dimension id", () => {
    const dimIds = new Set(ESM_CONFIG.dimensions.map((d) => d.id));
    for (const q of ESM_CONFIG.questions) {
      expect(dimIds.has(q.dimensionId)).toBe(true);
    }
  });

  it("every dimension has at least one question", () => {
    const usedDims = new Set(ESM_CONFIG.questions.map((q) => q.dimensionId));
    for (const d of ESM_CONFIG.dimensions) {
      expect(usedDims.has(d.id)).toBe(true);
    }
  });

  it("every question has 5 options scored 1-5", () => {
    for (const q of ESM_CONFIG.questions) {
      expect(q.options).toHaveLength(5);
      const scores = q.options.map((o) => o.score).sort();
      expect(scores).toEqual([1, 2, 3, 4, 5]);
    }
  });

  it("has 5 maturity levels covering 0-100", () => {
    expect(ESM_CONFIG.levels).toHaveLength(5);
    expect(ESM_CONFIG.levels[0].scoreRange[0]).toBe(0);
    expect(ESM_CONFIG.levels[4].scoreRange[1]).toBe(100);
  });

  it("level slug prefix is esm-maturity-level", () => {
    expect(ESM_CONFIG.levelPageSlugPrefix).toBe("esm-maturity-level");
  });

  it("level i18n keys live under quiz.esm.level.*", () => {
    for (const lvl of ESM_CONFIG.levels) {
      expect(lvl.labelKey.startsWith("quiz.esm.level.")).toBe(true);
      expect(lvl.descriptionKey.startsWith("quiz.esm.level.")).toBe(true);
      expect(lvl.ctaKey.startsWith("quiz.esm.level.")).toBe(true);
    }
  });
});
