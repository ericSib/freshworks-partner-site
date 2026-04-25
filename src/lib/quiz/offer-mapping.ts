/**
 * Maturity → offer mapping (SMI-offers, D22).
 *
 * Encodes the PO-validated matrix that turns a (maturityLevel, segment)
 * tuple into a single recommended WaS offer slug. The intent is to
 * shorten the path from "result page" to "Calendly booking" by removing
 * the cognitive load of re-reading the 8-offer catalog.
 *
 * Architecture:
 * - The mapping lives as a pure data table (`OFFER_MATRIX`), not a chain
 *   of if/else, so future PO arbitrations are a single edit.
 * - `recommendOffer()` is total: it always returns a slug, falling back
 *   to "audit-optimisation" for inputs outside the matrix.
 *
 * Reference: docs/refinement/sprint-19-refinement.md §1 (D22).
 */

import type { QuizSegment } from "@/config/quiz";

/** Maturity level number, as emitted by `getMaturityLevel`. */
export type MaturityLevelNumber = 1 | 2 | 3 | 4 | 5;

/** A row of the matrix — one offer per supported segment. */
type LevelRow = Record<QuizSegment, string>;

/** Safe default when inputs fall outside the matrix (stale storage, future segments). */
const FALLBACK_OFFER_ID = "audit-optimisation";

/**
 * D22 matrix — 5 levels × 3 segments.
 * Slugs MUST exist in `OFFERS` (src/config/offers.ts) — enforced by tests.
 */
export const OFFER_MATRIX: Record<MaturityLevelNumber, LevelRow> = {
  1: {
    itsm: "freshservice",
    cx: "freshdesk",
    esm: "esm-sprints",
  },
  2: {
    itsm: "audit-optimisation",
    cx: "audit-optimisation",
    esm: "esm-sprints",
  },
  3: {
    itsm: "migration",
    cx: "freddy-ai",
    esm: "cx-esm-transformation",
  },
  4: {
    itsm: "freddy-ai",
    cx: "cx-esm-transformation",
    esm: "cx-esm-transformation",
  },
  5: {
    itsm: "managed-excellence",
    cx: "managed-excellence",
    esm: "managed-excellence",
  },
};

/**
 * Recommend a single offer slug for a (level, segment) pair.
 * Total function — never throws, never returns undefined.
 */
export function recommendOffer(
  level: MaturityLevelNumber,
  segment: QuizSegment
): string {
  const row = OFFER_MATRIX[level];
  if (!row) return FALLBACK_OFFER_ID;
  const slug = row[segment];
  return slug ?? FALLBACK_OFFER_ID;
}
