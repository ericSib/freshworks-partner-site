/**
 * Quiz scoring engine — pure functions, zero side effects.
 *
 * Formula (from blueprint):
 *   dimension_score = average of question scores for that dimension
 *   overall_score = Σ(dimension_score × dimension_weight) × 20
 *
 * This produces a 0–100 scale:
 *   0–20 = Level 1, 21–40 = Level 2, 41–60 = Level 3, 61–80 = Level 4, 81–100 = Level 5
 */

import type { QuizConfig, QuizDimension, MaturityLevel } from "@/config/quiz";

/** Map of question IDs to selected scores (1–5). */
export type QuizAnswers = Record<string, number>;

/** Map of dimension IDs to their computed scores (1–5). */
export type DimensionScores = Record<string, number>;

/**
 * Calculate the average score for each dimension based on answers.
 *
 * Dimensions with multiple questions (e.g. Incident has 1A + 1B)
 * get the arithmetic mean of their question scores.
 */
export function calculateDimensionScores(
  answers: QuizAnswers,
  config: QuizConfig
): DimensionScores {
  // Group question scores by dimension
  const groups: Record<string, number[]> = {};

  for (const question of config.questions) {
    const score = answers[question.id];
    if (score == null) continue;

    if (!groups[question.dimensionId]) {
      groups[question.dimensionId] = [];
    }
    groups[question.dimensionId].push(score);
  }

  // Average each dimension
  const result: DimensionScores = {};
  for (const dim of config.dimensions) {
    const scores = groups[dim.id];
    if (!scores || scores.length === 0) {
      result[dim.id] = 0;
      continue;
    }
    result[dim.id] = scores.reduce((a, b) => a + b, 0) / scores.length;
  }

  return result;
}

/**
 * Calculate the overall maturity score (0–100).
 *
 * Formula: Σ(dimension_score × dimension_weight) × 20
 */
export function calculateOverallScore(
  answers: QuizAnswers,
  config: QuizConfig
): number {
  const dimScores = calculateDimensionScores(answers, config);

  let weightedSum = 0;
  for (const dim of config.dimensions) {
    weightedSum += (dimScores[dim.id] ?? 0) * dim.weight;
  }

  return Math.round(weightedSum * 20);
}

/**
 * Get the maturity level for a given overall score.
 */
export function getMaturityLevel(
  score: number,
  config: QuizConfig
): MaturityLevel {
  for (const level of config.levels) {
    const [min, max] = level.scoreRange;
    if (score >= min && score <= max) {
      return level;
    }
  }
  // Fallback: return highest level if score exceeds 100
  return config.levels[config.levels.length - 1];
}

/**
 * Get the N weakest dimensions (lowest scores), sorted ascending.
 * Used to generate "quick win" recommendations in results.
 */
export function getWeakestDimensions(
  dimensionScores: DimensionScores,
  config: QuizConfig,
  count: number = 3
): (QuizDimension & { score: number })[] {
  return config.dimensions
    .map((dim) => ({ ...dim, score: dimensionScores[dim.id] ?? 0 }))
    .sort((a, b) => a.score - b.score)
    .slice(0, count);
}
