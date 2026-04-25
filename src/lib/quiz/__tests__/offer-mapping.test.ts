import { describe, it, expect } from "vitest";
import { recommendOffer, OFFER_MATRIX } from "../offer-mapping";
import { OFFERS } from "@/config/offers";
import type { QuizSegment } from "@/config/quiz";

/**
 * SMI-offers — Matrix-driven offer recommendation.
 *
 * Source of truth: D22 (PO arbitration 25/04/2026).
 * 5 maturity levels × 3 segments = 15 explicit cells.
 */

describe("OFFER_MATRIX (D22)", () => {
  it("has 5 levels", () => {
    expect(Object.keys(OFFER_MATRIX)).toHaveLength(5);
    expect(OFFER_MATRIX[1]).toBeDefined();
    expect(OFFER_MATRIX[5]).toBeDefined();
  });

  it("each level row covers all 3 segments (itsm, cx, esm)", () => {
    for (const level of [1, 2, 3, 4, 5] as const) {
      expect(OFFER_MATRIX[level].itsm).toBeDefined();
      expect(OFFER_MATRIX[level].cx).toBeDefined();
      expect(OFFER_MATRIX[level].esm).toBeDefined();
    }
  });

  it("every recommended slug points to an offer in the catalog (D18)", () => {
    const validIds = new Set(OFFERS.map((o) => o.id));
    for (const level of [1, 2, 3, 4, 5] as const) {
      for (const segment of ["itsm", "cx", "esm"] as const) {
        const slug = OFFER_MATRIX[level][segment];
        expect(
          validIds.has(slug),
          `Level ${level} × ${segment} → "${slug}" is not a known offer id`
        ).toBe(true);
      }
    }
  });
});

describe("recommendOffer — exact D22 matrix", () => {
  // Each tuple: [level, segment, expected offer id]
  const matrix: ReadonlyArray<[1 | 2 | 3 | 4 | 5, QuizSegment, string]> = [
    [1, "itsm", "freshservice"],
    [1, "cx",   "freshdesk"],
    [1, "esm",  "esm-sprints"],
    [2, "itsm", "audit-optimisation"],
    [2, "cx",   "audit-optimisation"],
    [2, "esm",  "esm-sprints"],
    [3, "itsm", "migration"],
    [3, "cx",   "freddy-ai"],
    [3, "esm",  "cx-esm-transformation"],
    [4, "itsm", "freddy-ai"],
    [4, "cx",   "cx-esm-transformation"],
    [4, "esm",  "cx-esm-transformation"],
    [5, "itsm", "managed-excellence"],
    [5, "cx",   "managed-excellence"],
    [5, "esm",  "managed-excellence"],
  ];

  it.each(matrix)("level %i × %s → %s", (level, segment, expectedId) => {
    expect(recommendOffer(level, segment)).toBe(expectedId);
  });
});

describe("recommendOffer — defensive behavior", () => {
  it("falls back to audit-optimisation when level is out of range", () => {
    // Cast to bypass the type guard — simulates a stale payload from storage
    const out = recommendOffer(0 as unknown as 1, "itsm");
    expect(out).toBe("audit-optimisation");
  });

  it("falls back to audit-optimisation for an unknown segment", () => {
    const out = recommendOffer(3, "unknown" as unknown as QuizSegment);
    expect(out).toBe("audit-optimisation");
  });
});
