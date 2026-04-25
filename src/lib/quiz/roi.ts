/**
 * SMI-roi — Indicative annualized savings estimator (D21).
 *
 * Pure function: takes a maturity level + segment + company size,
 * returns a min/max range in EUR. Never a promise, never a single
 * number — calibrated on the Forrester TEI public studies for
 * Freshworks + an internal multiplier model (D21-A, option d).
 *
 * Calibration intent
 * ------------------
 * Forrester TEI Freshservice (public, 2023) reports ~$1.85M three-year
 * NPV for a composite ~1500-employee org → annualized ~€570k. Backing
 * that out per employee at maximum maturity headroom (level 1 → 5)
 * gives ~€380/employee/year as the upper anchor for ITSM. CX TEI
 * benefits are ~25% lower per employee (concentrated on agents). ESM
 * lands between the two: multi-department reach offsets the lower
 * intensity per single department.
 *
 * The model is intentionally coarse — we surface a band, not a quote.
 * Future iteration (D23 candidate) will replace the constants below
 * with three anonymized WaS case studies.
 */

import type { QuizSegment } from "@/config/quiz";

export type CompanySize = "small" | "medium" | "large";

export interface ROIInput {
  level: 1 | 2 | 3 | 4 | 5;
  segment: QuizSegment;
  companySize: CompanySize;
}

export interface ROIEstimate {
  /** Lower bound of the annualized savings, rounded down to thousands. */
  min: number;
  /** Upper bound, rounded up to thousands. */
  max: number;
  currency: "EUR";
  horizon: "year";
  /** True at level 5 — UI swaps to "sustain excellence" copy. */
  alreadyOptimized: boolean;
}

/** Median employee count per bracket (used as multiplier proxy). */
const EMPLOYEES_BY_BRACKET: Record<CompanySize, number> = {
  small: 125,
  medium: 600,
  large: 1800,
};

/**
 * Per-employee annualized gain (EUR) at maximum headroom (level 1).
 * Decreases linearly with level — headroom = 5 - level scaled to [0..1].
 */
const PER_EMPLOYEE_GAIN_AT_LEVEL_1: Record<QuizSegment, number> = {
  itsm: 380,
  cx: 240,
  esm: 320,
};

/** Map a demographics company-size key to one of the 3 ROI brackets (D21-B). */
export function companySizeBracket(value: string): CompanySize {
  switch (value) {
    case "50_199":
      return "small";
    case "200_499":
    case "500_999":
      return "medium";
    case "1000_2000":
    case "2000_plus":
      return "large";
    default:
      return "medium"; // Fallback per Scenario 2 of SMI-roi.md
  }
}

/** Round down to the nearest thousand. */
function floorToThousand(n: number): number {
  return Math.floor(n / 1000) * 1000;
}

/** Round up to the nearest thousand. */
function ceilToThousand(n: number): number {
  return Math.ceil(n / 1000) * 1000;
}

/**
 * Estimate the indicative annual savings for a given maturity profile.
 * Total function: never throws, never returns NaN.
 */
export function estimateROI(input: ROIInput): ROIEstimate {
  const { level, segment, companySize } = input;

  const alreadyOptimized = level === 5;
  if (alreadyOptimized) {
    return {
      min: 0,
      max: 0,
      currency: "EUR",
      horizon: "year",
      alreadyOptimized: true,
    };
  }

  // Headroom: level 1 → 1.0 (max gap), level 4 → 0.25, level 5 → 0 (handled above).
  const headroom = (5 - level) / 4;
  const employees = EMPLOYEES_BY_BRACKET[companySize];
  const perEmployee = PER_EMPLOYEE_GAIN_AT_LEVEL_1[segment] ?? 240;

  const center = headroom * perEmployee * employees;
  // ±30% spread expresses calibration uncertainty without overpromising.
  const min = floorToThousand(center * 0.7);
  const max = ceilToThousand(center * 1.3);

  return {
    min,
    max,
    currency: "EUR",
    horizon: "year",
    alreadyOptimized: false,
  };
}
