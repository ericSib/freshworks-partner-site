import { describe, it, expect } from "vitest";
import {
  calculateDimensionScores,
  calculateOverallScore,
  getMaturityLevel,
  getWeakestDimensions,
} from "../scoring";
import { ITSM_CONFIG, CX_CONFIG } from "@/config/quiz";
import type { QuizConfig } from "@/config/quiz";

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

/** Build an answers map with the same score for every question. */
function uniformAnswers(config: QuizConfig, score: 1 | 2 | 3 | 4 | 5) {
  const answers: Record<string, number> = {};
  for (const q of config.questions) {
    answers[q.id] = score;
  }
  return answers;
}

/* ------------------------------------------------------------------ */
/*  Config integrity                                                   */
/* ------------------------------------------------------------------ */

describe("Quiz config integrity", () => {
  it.each([
    ["ITSM", ITSM_CONFIG],
    ["CX", CX_CONFIG],
  ] as const)("%s config has weights summing to 1.0", (_label, config) => {
    const sum = config.dimensions.reduce((acc, d) => acc + d.weight, 0);
    expect(sum).toBeCloseTo(1.0, 5);
  });

  it.each([
    ["ITSM", ITSM_CONFIG],
    ["CX", CX_CONFIG],
  ] as const)("%s config has 9+ scored questions (blueprint lists 9 per assessment)", (_label, config) => {
    expect(config.questions.length).toBeGreaterThanOrEqual(9);
    expect(config.questions.length).toBeLessThanOrEqual(12);
  });

  it.each([
    ["ITSM", ITSM_CONFIG],
    ["CX", CX_CONFIG],
  ] as const)("%s config has 8 dimensions", (_label, config) => {
    expect(config.dimensions).toHaveLength(8);
  });

  it.each([
    ["ITSM", ITSM_CONFIG],
    ["CX", CX_CONFIG],
  ] as const)("%s config — every question maps to a valid dimension", (_label, config) => {
    const dimIds = new Set(config.dimensions.map((d) => d.id));
    for (const q of config.questions) {
      expect(dimIds.has(q.dimensionId)).toBe(true);
    }
  });

  it.each([
    ["ITSM", ITSM_CONFIG],
    ["CX", CX_CONFIG],
  ] as const)("%s config — every question has exactly 5 options with scores 1-5", (_label, config) => {
    for (const q of config.questions) {
      expect(q.options).toHaveLength(5);
      const scores = q.options.map((o) => o.score).sort();
      expect(scores).toEqual([1, 2, 3, 4, 5]);
    }
  });

  it.each([
    ["ITSM", ITSM_CONFIG],
    ["CX", CX_CONFIG],
  ] as const)("%s config has 5 maturity levels covering 0-100", (_label, config) => {
    expect(config.levels).toHaveLength(5);
    expect(config.levels[0].scoreRange[0]).toBe(0);
    expect(config.levels[4].scoreRange[1]).toBe(100);
  });
});

/* ------------------------------------------------------------------ */
/*  calculateDimensionScores                                           */
/* ------------------------------------------------------------------ */

describe("calculateDimensionScores", () => {
  it("returns a score per dimension", () => {
    const answers = uniformAnswers(ITSM_CONFIG, 3);
    const scores = calculateDimensionScores(answers, ITSM_CONFIG);
    expect(Object.keys(scores)).toHaveLength(8);
  });

  it("averages multiple questions in the same dimension", () => {
    // ITSM dimension "incident" has 2 questions: itsm-1a and itsm-1b
    const answers = uniformAnswers(ITSM_CONFIG, 1);
    answers["itsm-1a"] = 3;
    answers["itsm-1b"] = 5;
    const scores = calculateDimensionScores(answers, ITSM_CONFIG);
    expect(scores["incident"]).toBe(4); // (3 + 5) / 2
  });

  it("handles single-question dimensions", () => {
    const answers = uniformAnswers(ITSM_CONFIG, 4);
    const scores = calculateDimensionScores(answers, ITSM_CONFIG);
    // "change" has 1 question → dimension score = answer score
    expect(scores["change"]).toBe(4);
  });
});

/* ------------------------------------------------------------------ */
/*  calculateOverallScore                                              */
/* ------------------------------------------------------------------ */

describe("calculateOverallScore", () => {
  it("returns 20 when all answers are 1 (minimum)", () => {
    const answers = uniformAnswers(ITSM_CONFIG, 1);
    const score = calculateOverallScore(answers, ITSM_CONFIG);
    expect(score).toBe(20);
  });

  it("returns 100 when all answers are 5 (maximum)", () => {
    const answers = uniformAnswers(ITSM_CONFIG, 5);
    const score = calculateOverallScore(answers, ITSM_CONFIG);
    expect(score).toBe(100);
  });

  it("returns 60 when all answers are 3 (midpoint)", () => {
    const answers = uniformAnswers(ITSM_CONFIG, 3);
    const score = calculateOverallScore(answers, ITSM_CONFIG);
    expect(score).toBe(60);
  });

  it("applies dimension weights correctly", () => {
    // All 1s except incident (20% weight) at 5
    const answers = uniformAnswers(ITSM_CONFIG, 1);
    answers["itsm-1a"] = 5;
    answers["itsm-1b"] = 5;

    const score = calculateOverallScore(answers, ITSM_CONFIG);
    // incident_dim = 5, others = 1
    // overall = (5 * 0.20 + 1 * 0.80) × 20 = (1.0 + 0.8) × 20 = 36
    expect(score).toBe(36);
  });

  it("is the same formula for CX config", () => {
    const answers = uniformAnswers(CX_CONFIG, 3);
    const score = calculateOverallScore(answers, CX_CONFIG);
    expect(score).toBe(60);
  });

  it("returns a rounded integer", () => {
    // Create a mix that produces a non-integer before rounding
    const answers = uniformAnswers(ITSM_CONFIG, 2);
    answers["itsm-1a"] = 3;
    const score = calculateOverallScore(answers, ITSM_CONFIG);
    expect(Number.isInteger(score)).toBe(true);
  });
});

/* ------------------------------------------------------------------ */
/*  getMaturityLevel                                                   */
/* ------------------------------------------------------------------ */

describe("getMaturityLevel", () => {
  it.each([
    [0, 1],
    [10, 1],
    [20, 1],
    [21, 2],
    [40, 2],
    [41, 3],
    [60, 3],
    [61, 4],
    [80, 4],
    [81, 5],
    [100, 5],
  ] as const)("score %i → level %i", (score, expectedLevel) => {
    const level = getMaturityLevel(score, ITSM_CONFIG);
    expect(level.level).toBe(expectedLevel);
  });

  it("returns segment-specific labels (ITSM)", () => {
    const level = getMaturityLevel(10, ITSM_CONFIG);
    expect(level.labelKey).toContain("itsm");
  });

  it("returns segment-specific labels (CX)", () => {
    const level = getMaturityLevel(10, CX_CONFIG);
    expect(level.labelKey).toContain("cx");
  });
});

/* ------------------------------------------------------------------ */
/*  getWeakestDimensions                                               */
/* ------------------------------------------------------------------ */

describe("getWeakestDimensions", () => {
  it("returns the N lowest-scoring dimensions", () => {
    const answers = uniformAnswers(ITSM_CONFIG, 3);
    // Set 2 dimensions very low
    answers["itsm-5a"] = 1; // assets
    answers["itsm-8a"] = 1; // governance

    const dimScores = calculateDimensionScores(answers, ITSM_CONFIG);
    const weakest = getWeakestDimensions(dimScores, ITSM_CONFIG, 2);

    expect(weakest).toHaveLength(2);
    const ids = weakest.map((d) => d.id);
    expect(ids).toContain("assets");
    expect(ids).toContain("governance");
  });

  it("returns results sorted ascending (weakest first)", () => {
    const answers = uniformAnswers(ITSM_CONFIG, 3);
    answers["itsm-5a"] = 1; // assets (score 1)
    answers["itsm-8a"] = 2; // governance (score 2)

    const dimScores = calculateDimensionScores(answers, ITSM_CONFIG);
    const weakest = getWeakestDimensions(dimScores, ITSM_CONFIG, 3);

    expect(weakest[0].id).toBe("assets"); // score 1, weakest
    expect(weakest[1].id).toBe("governance"); // score 2
  });

  it("defaults to top 3 when count not specified", () => {
    const answers = uniformAnswers(ITSM_CONFIG, 3);
    const dimScores = calculateDimensionScores(answers, ITSM_CONFIG);
    const weakest = getWeakestDimensions(dimScores, ITSM_CONFIG);
    expect(weakest).toHaveLength(3);
  });
});
