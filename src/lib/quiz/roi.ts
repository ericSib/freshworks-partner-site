/**
 * SMI-roi — Indicative annualized savings estimator (D21, recalibrated US-S20-7).
 *
 * Pure function: takes a maturity level + segment + company size,
 * returns a min/max range in EUR. Never a promise, never a single
 * number — calibrated on the Forrester TEI 2024 study for Freshworks
 * + an internal multiplier model (D21-A, option d ; D33).
 *
 * Calibration source (US-S20-7, D33)
 * -----------------------------------
 * Forrester TEI Freshservice 2024 (commissioned by Freshworks, public PDF) :
 *   - Composite organization : 7,000 employees · 160 service agents · ~120k tickets/year
 *   - 3-year NPV (risk-adjusted) : $2.84M
 *   - Total benefits PV (3y) : $3.64M → annualized ≈ $1.21M/year
 *   - ROI : 356% · Payback : < 6 months
 *   - Per-employee/year ≈ $173 → ≈ €161 at USD/EUR 0.93
 *
 * Calibration choices :
 *   - ITSM = 200 €/emp/y → TEI baseline + ~25% WaS consulting value-add
 *     (process redesign + training + adoption uplift = above pure software
 *     deployment effect captured by TEI)
 *   - CX = 160 €/emp/y → concentrated on agents (160 of 7,000 in TEI),
 *     so per-employee/whole-headcount lower than ITSM
 *   - ESM = 220 €/emp/y → broader reach (HR + IT + Facilities), highest
 *     per-employee impact when measured org-wide
 *
 * The model is intentionally coarse — we surface a band, not a quote.
 * Future iteration (D23 candidate) will add three anonymized WaS case
 * studies as additional anchors alongside the Forrester TEI baseline.
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
 *
 * Values calibrated on Forrester TEI Freshworks 2024 (US-S20-7, D33).
 * Hierarchy : ESM > ITSM > CX — reflects the scope of impact per employee.
 */
const PER_EMPLOYEE_GAIN_AT_LEVEL_1: Record<QuizSegment, number> = {
  itsm: 200,
  cx: 160,
  esm: 220,
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
