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
});
