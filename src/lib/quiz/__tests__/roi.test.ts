import { describe, it, expect } from "vitest";
import {
  estimateROI,
  companySizeBracket,
  type ROIInput,
} from "../roi";

/**
 * SMI-roi — D21 ROI estimator.
 *
 * Engine inputs: maturity level (1-5), segment, demographic companySize.
 * Output: indicative annual savings range in EUR (never a single number,
 * never a promise — Forrester TEI public benchmarks + internal model).
 */

describe("companySizeBracket", () => {
  it.each([
    ["50_199", "small"],
    ["200_499", "medium"],
    ["500_999", "medium"],
    ["1000_2000", "large"],
    ["2000_plus", "large"],
  ] as const)("maps %s → %s", (input, expected) => {
    expect(companySizeBracket(input)).toBe(expected);
  });

  it("falls back to medium when the demographic value is unknown or empty", () => {
    expect(companySizeBracket("")).toBe("medium");
    expect(companySizeBracket("not-a-bracket")).toBe("medium");
  });
});

describe("estimateROI — totals & shape", () => {
  const base: ROIInput = {
    level: 2,
    segment: "itsm",
    companySize: "medium",
  };

  it("returns min/max/currency/horizon", () => {
    const out = estimateROI(base);
    expect(out.currency).toBe("EUR");
    expect(out.horizon).toBe("year");
    expect(typeof out.min).toBe("number");
    expect(typeof out.max).toBe("number");
  });

  it("produces a range (max ≥ min, both ≥ 0)", () => {
    const out = estimateROI(base);
    expect(out.max).toBeGreaterThanOrEqual(out.min);
    expect(out.min).toBeGreaterThanOrEqual(0);
  });

  it("rounds output to thousands (no false precision)", () => {
    const out = estimateROI(base);
    expect(out.min % 1000).toBe(0);
    expect(out.max % 1000).toBe(0);
  });
});

describe("estimateROI — monotonicity", () => {
  it("higher company size → higher gain at the same level/segment", () => {
    const small = estimateROI({ level: 2, segment: "itsm", companySize: "small" });
    const medium = estimateROI({ level: 2, segment: "itsm", companySize: "medium" });
    const large = estimateROI({ level: 2, segment: "itsm", companySize: "large" });

    expect(medium.max).toBeGreaterThan(small.max);
    expect(large.max).toBeGreaterThan(medium.max);
  });

  it("lower maturity (=more headroom) → higher gain at the same size/segment", () => {
    const lowMaturity = estimateROI({ level: 1, segment: "itsm", companySize: "medium" });
    const midMaturity = estimateROI({ level: 3, segment: "itsm", companySize: "medium" });

    expect(lowMaturity.max).toBeGreaterThan(midMaturity.max);
  });
});

describe("estimateROI — level 5 (already optimized)", () => {
  it("returns a zero range when there is no headroom left", () => {
    const out = estimateROI({ level: 5, segment: "itsm", companySize: "large" });
    expect(out.min).toBe(0);
    expect(out.max).toBe(0);
  });

  it("flags the result as already-optimized so the UI can swap copy", () => {
    const out = estimateROI({ level: 5, segment: "cx", companySize: "medium" });
    expect(out.alreadyOptimized).toBe(true);
  });

  it("does not flag levels 1-4 as already-optimized", () => {
    for (const level of [1, 2, 3, 4] as const) {
      const out = estimateROI({ level, segment: "itsm", companySize: "medium" });
      expect(out.alreadyOptimized).toBe(false);
    }
  });
});

describe("estimateROI — segment differentiation", () => {
  it("ITSM and ESM produce different ranges at the same level/size", () => {
    const itsm = estimateROI({ level: 2, segment: "itsm", companySize: "medium" });
    const esm = estimateROI({ level: 2, segment: "esm", companySize: "medium" });
    expect(itsm.max).not.toBe(esm.max);
  });

  it("ESM > ITSM > CX at same level/size — multi-department > standalone > agent-bound", () => {
    const same = { level: 2 as const, companySize: "medium" as const };
    const itsm = estimateROI({ ...same, segment: "itsm" });
    const cx = estimateROI({ ...same, segment: "cx" });
    const esm = estimateROI({ ...same, segment: "esm" });
    // Hierarchy reflects scope of impact:
    // - ESM = broadest org reach (HR + IT + Facilities) → highest per-employee gain
    // - ITSM = standalone IT productivity (TEI baseline)
    // - CX = concentrated on customer-facing agents → lowest per-employee gain when amortized over the whole headcount
    expect(esm.max).toBeGreaterThan(itsm.max);
    expect(itsm.max).toBeGreaterThan(cx.max);
  });
});

// ---------------------------------------------------------------------------
// US-S20-7 — Calibration on Forrester TEI Freshworks 2024
// ---------------------------------------------------------------------------

describe("estimateROI — Forrester TEI 2024 calibration (US-S20-7, D33)", () => {
  it("ITSM medium-org level 1 estimate falls within the TEI-implied band", () => {
    // TEI Composite: 7,000 employees · $3.64M total PV / 3y · ≈ $1.21M/year
    // Per-employee/year ≈ $173 → ≈ €161 (USD-EUR ~0.93)
    // Conservative WaS multiplier (~1.25x for consulting value-add) → ITSM = 200 €/emp/y
    // For medium bracket (600 employees) at level 1 (full headroom):
    //   center ≈ 600 × 200 = 120,000 €
    //   ±30% spread → 84,000-156,000 € (rounded to thousands)
    const out = estimateROI({ level: 1, segment: "itsm", companySize: "medium" });
    // Sanity: the band should remain within an order of magnitude of the TEI baseline
    expect(out.min).toBeGreaterThanOrEqual(60_000);
    expect(out.max).toBeLessThanOrEqual(200_000);
  });

  it("level 1 large-org ESM estimate scales linearly with headcount (1800/600 ≈ 3x medium)", () => {
    const medium = estimateROI({ level: 1, segment: "esm", companySize: "medium" });
    const large = estimateROI({ level: 1, segment: "esm", companySize: "large" });
    // 1800 / 600 = 3 → expect ~3x ratio (allow ±15% tolerance for rounding)
    const ratio = large.max / medium.max;
    expect(ratio).toBeGreaterThan(2.5);
    expect(ratio).toBeLessThan(3.5);
  });
});
