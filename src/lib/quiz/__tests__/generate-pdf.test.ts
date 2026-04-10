/**
 * Characterization tests for the quiz PDF generator.
 *
 * US-21.5 — hotfix quality gate post-audit 10/04/2026.
 * These tests lock down the current behavior of generateQuizPdf() as a
 * safety net for the upcoming US-21.7 refactor of QuizResultsPreview.
 *
 * Strategy: mock jsPDF (external dep) and assert the correct primitives
 * are called with the correct parameters. We do NOT verify visual output
 * (would need a headless browser snapshot — out of scope for unit tests).
 */

import { describe, it, expect, vi, beforeEach } from "vitest";
import { ITSM_CONFIG, CX_CONFIG } from "@/config/quiz";
import type { QuizResults } from "@/hooks/useQuiz";

// ---------------------------------------------------------------------------
// Mock jsPDF (external dependency)
// ---------------------------------------------------------------------------
//
// vi.mock is hoisted to the top of the file, so we must use vi.hoisted()
// to share the mock instance between the factory and the test assertions.

const { mockInstance } = vi.hoisted(() => {
  const instance = {
    setFillColor: vi.fn(),
    rect: vi.fn(),
    circle: vi.fn(),
    setTextColor: vi.fn(),
    setFontSize: vi.fn(),
    setFont: vi.fn(),
    text: vi.fn(),
    setDrawColor: vi.fn(),
    setLineWidth: vi.fn(),
    line: vi.fn(),
    roundedRect: vi.fn(),
    splitTextToSize: vi.fn((text: string) => [text]),
    addPage: vi.fn(),
    save: vi.fn(),
  };
  return { mockInstance: instance };
});

vi.mock("jspdf", () => ({
  // Regular function (not arrow) so `new jsPDF()` works as a constructor
  default: vi.fn(function MockJsPDF() {
    return mockInstance;
  }),
}));

// Import AFTER vi.mock so the mock is resolved.
import { generateQuizPdf } from "@/lib/quiz/generate-pdf";

// ---------------------------------------------------------------------------
// Factory: build a valid QuizResults for tests
// ---------------------------------------------------------------------------

function createQuizResults(
  overrides: Partial<QuizResults> = {}
): QuizResults {
  const base: QuizResults = {
    segment: "itsm",
    answers: {},
    demographics: {
      companySize: "200_499",
      industry: "tech",
      role: "itDirector",
    },
    dimensionScores: {
      incident: 3.5,
      change: 2.0,
      knowledge: 4.0,
      automation: 1.5,
      assets: 3.0,
      analytics: 2.5,
      catalog: 4.5,
      governance: 3.0,
    },
    overallScore: 72,
    maturityLevel: {
      level: 3,
      labelKey: "quiz.itsm.level.3.label",
      descriptionKey: "quiz.itsm.level.3.description",
      scoreRange: [41, 60],
      ctaKey: "quiz.itsm.level.3.cta",
      urgency: "medium",
    },
    weakestDimensions: [
      {
        id: "automation",
        nameKey: "quiz.itsm.dim.automation",
        weight: 0.13,
        commercialAngleKey: "quiz.itsm.commercial.automation",
        benchmarkKey: "quiz.itsm.benchmark.automation",
        score: 1.5,
      },
      {
        id: "change",
        nameKey: "quiz.itsm.dim.change",
        weight: 0.15,
        commercialAngleKey: "quiz.itsm.commercial.change",
        benchmarkKey: "quiz.itsm.benchmark.change",
        score: 2.0,
      },
      {
        id: "analytics",
        nameKey: "quiz.itsm.dim.analytics",
        weight: 0.1,
        commercialAngleKey: "quiz.itsm.commercial.analytics",
        benchmarkKey: "quiz.itsm.benchmark.analytics",
        score: 2.5,
      },
    ],
  };
  return { ...base, ...overrides };
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

beforeEach(() => {
  vi.clearAllMocks();
});

describe("generateQuizPdf — ITSM French (US-21.5, scenario 1)", () => {
  it("draws the left orange band (0, 0, 40, 297, 'F')", () => {
    const t = vi.fn((key: string) => key);
    generateQuizPdf({
      results: createQuizResults(),
      config: ITSM_CONFIG,
      t,
      locale: "fr",
    });

    expect(mockInstance.rect).toHaveBeenCalledWith(0, 0, 40, 297, "F");
  });

  it("writes the overall score '72' as a standalone string", () => {
    const t = vi.fn((key: string) => key);
    generateQuizPdf({
      results: createQuizResults({ overallScore: 72 }),
      config: ITSM_CONFIG,
      t,
      locale: "fr",
    });

    const textCalls = mockInstance.text.mock.calls.map((c) => c[0]);
    expect(textCalls).toContain("72");
  });

  it("writes the French title containing 'Score de Maturit' and 'ITSM'", () => {
    const t = vi.fn((key: string) => key);
    generateQuizPdf({
      results: createQuizResults(),
      config: ITSM_CONFIG,
      t,
      locale: "fr",
    });

    const textCalls = mockInstance.text.mock.calls.map((c) => String(c[0]));
    const hasTitle = textCalls.some(
      (txt) => txt.includes("Score de Maturit") && txt.includes("ITSM")
    );
    expect(hasTitle).toBe(true);
  });

  it("saves the file with filename 'WaS-ITSM-Maturity-Score.pdf'", () => {
    const t = vi.fn((key: string) => key);
    generateQuizPdf({
      results: createQuizResults(),
      config: ITSM_CONFIG,
      t,
      locale: "fr",
    });

    expect(mockInstance.save).toHaveBeenCalledWith(
      "WaS-ITSM-Maturity-Score.pdf"
    );
    expect(mockInstance.save).toHaveBeenCalledTimes(1);
  });

  it("writes the French CTA 'Reservez votre consultation gratuite'", () => {
    const t = vi.fn((key: string) => key);
    generateQuizPdf({
      results: createQuizResults(),
      config: ITSM_CONFIG,
      t,
      locale: "fr",
    });

    const textCalls = mockInstance.text.mock.calls.map((c) => String(c[0]));
    const hasCta = textCalls.some((txt) =>
      txt.includes("servez votre consultation")
    );
    expect(hasCta).toBe(true);
  });
});

describe("generateQuizPdf — CX English (US-21.5, scenario 2)", () => {
  it("writes the English title 'CX Maturity Score'", () => {
    const t = vi.fn((key: string) => key);
    generateQuizPdf({
      results: createQuizResults({ segment: "cx" }),
      config: CX_CONFIG,
      t,
      locale: "en",
    });

    const textCalls = mockInstance.text.mock.calls.map((c) => String(c[0]));
    expect(textCalls).toContain("CX Maturity Score");
  });

  it("writes the English subtitle 'Personalized Report — What A Service'", () => {
    const t = vi.fn((key: string) => key);
    generateQuizPdf({
      results: createQuizResults({ segment: "cx" }),
      config: CX_CONFIG,
      t,
      locale: "en",
    });

    const textCalls = mockInstance.text.mock.calls.map((c) => String(c[0]));
    const hasSubtitle = textCalls.some((txt) =>
      txt.includes("Personalized Report")
    );
    expect(hasSubtitle).toBe(true);
  });

  it("writes the English dimension section title 'Score by dimension'", () => {
    const t = vi.fn((key: string) => key);
    generateQuizPdf({
      results: createQuizResults({ segment: "cx" }),
      config: CX_CONFIG,
      t,
      locale: "en",
    });

    const textCalls = mockInstance.text.mock.calls.map((c) => String(c[0]));
    expect(textCalls).toContain("Score by dimension");
  });

  it("writes the English quick-wins title 'Priority improvement areas'", () => {
    const t = vi.fn((key: string) => key);
    generateQuizPdf({
      results: createQuizResults({ segment: "cx" }),
      config: CX_CONFIG,
      t,
      locale: "en",
    });

    const textCalls = mockInstance.text.mock.calls.map((c) => String(c[0]));
    expect(textCalls).toContain("Priority improvement areas");
  });

  it("writes the English CTA 'Book your free consultation'", () => {
    const t = vi.fn((key: string) => key);
    generateQuizPdf({
      results: createQuizResults({ segment: "cx" }),
      config: CX_CONFIG,
      t,
      locale: "en",
    });

    const textCalls = mockInstance.text.mock.calls.map((c) => String(c[0]));
    expect(textCalls).toContain("Book your free consultation");
  });

  it("saves the file with filename 'WaS-CX-Maturity-Score.pdf'", () => {
    const t = vi.fn((key: string) => key);
    generateQuizPdf({
      results: createQuizResults({ segment: "cx" }),
      config: CX_CONFIG,
      t,
      locale: "en",
    });

    expect(mockInstance.save).toHaveBeenCalledWith(
      "WaS-CX-Maturity-Score.pdf"
    );
  });
});

describe("generateQuizPdf — i18n key resolution (US-21.5, scenario 3)", () => {
  it("calls t() with the maturity level labelKey and descriptionKey", () => {
    const t = vi.fn((key: string) => key);
    generateQuizPdf({
      results: createQuizResults(),
      config: ITSM_CONFIG,
      t,
      locale: "fr",
    });

    expect(t).toHaveBeenCalledWith("quiz.itsm.level.3.label");
    expect(t).toHaveBeenCalledWith("quiz.itsm.level.3.description");
  });

  it("calls t() with every dimension nameKey from the config (8 times)", () => {
    const t = vi.fn((key: string) => key);
    generateQuizPdf({
      results: createQuizResults(),
      config: ITSM_CONFIG,
      t,
      locale: "fr",
    });

    for (const dim of ITSM_CONFIG.dimensions) {
      expect(t).toHaveBeenCalledWith(dim.nameKey);
    }
  });

  it("calls t() with every dimension benchmarkKey from the config (8 times)", () => {
    const t = vi.fn((key: string) => key);
    generateQuizPdf({
      results: createQuizResults(),
      config: ITSM_CONFIG,
      t,
      locale: "fr",
    });

    for (const dim of ITSM_CONFIG.dimensions) {
      expect(t).toHaveBeenCalledWith(dim.benchmarkKey);
    }
  });

  it("calls t() with commercialAngleKey for each weakest dimension (3 times)", () => {
    const t = vi.fn((key: string) => key);
    const results = createQuizResults();
    generateQuizPdf({
      results,
      config: ITSM_CONFIG,
      t,
      locale: "fr",
    });

    for (const weak of results.weakestDimensions) {
      expect(t).toHaveBeenCalledWith(weak.commercialAngleKey);
    }
  });
});

describe("generateQuizPdf — dimension bar chart (US-21.5, scenario 4)", () => {
  it("draws the background bar for each dimension (roundedRect called 8+ times)", () => {
    const t = vi.fn((key: string) => key);
    generateQuizPdf({
      results: createQuizResults(),
      config: ITSM_CONFIG,
      t,
      locale: "fr",
    });

    // At least one roundedRect per dimension (background bar)
    // Plus possible fill bars for non-zero scores
    expect(mockInstance.roundedRect.mock.calls.length).toBeGreaterThanOrEqual(
      ITSM_CONFIG.dimensions.length
    );
  });

  it("writes the formatted score '3.5/5' for a dimension scored 3.5", () => {
    const t = vi.fn((key: string) => key);
    generateQuizPdf({
      results: createQuizResults({
        dimensionScores: {
          incident: 3.5,
          change: 3.5,
          knowledge: 3.5,
          automation: 3.5,
          assets: 3.5,
          analytics: 3.5,
          catalog: 3.5,
          governance: 3.5,
        },
      }),
      config: ITSM_CONFIG,
      t,
      locale: "fr",
    });

    const textCalls = mockInstance.text.mock.calls.map((c) => String(c[0]));
    expect(textCalls).toContain("3.5/5");
  });

  it("does NOT draw a fill bar when a dimension score is 0", () => {
    const t = vi.fn((key: string) => key);
    const zeroScores = Object.fromEntries(
      ITSM_CONFIG.dimensions.map((d) => [d.id, 0])
    );
    generateQuizPdf({
      results: createQuizResults({ dimensionScores: zeroScores }),
      config: ITSM_CONFIG,
      t,
      locale: "fr",
    });

    // Background bars (8) but no fill bars => exactly 8 roundedRect calls
    expect(mockInstance.roundedRect.mock.calls.length).toBe(
      ITSM_CONFIG.dimensions.length
    );
  });
});

describe("generateQuizPdf — edge cases (US-21.5, scenario 5)", () => {
  it("does not throw when overallScore is 0", () => {
    const t = vi.fn((key: string) => key);
    expect(() =>
      generateQuizPdf({
        results: createQuizResults({ overallScore: 0 }),
        config: ITSM_CONFIG,
        t,
        locale: "fr",
      })
    ).not.toThrow();
  });

  it("handles a missing dimensionScore by falling back to 0", () => {
    const t = vi.fn((key: string) => key);
    const partial: Record<string, number> = { incident: 4 };
    expect(() =>
      generateQuizPdf({
        results: createQuizResults({ dimensionScores: partial }),
        config: ITSM_CONFIG,
        t,
        locale: "fr",
      })
    ).not.toThrow();
  });

  it("does not throw when weakestDimensions is empty", () => {
    const t = vi.fn((key: string) => key);
    expect(() =>
      generateQuizPdf({
        results: createQuizResults({ weakestDimensions: [] }),
        config: ITSM_CONFIG,
        t,
        locale: "fr",
      })
    ).not.toThrow();
  });

  it("calls save() exactly once even with edge-case inputs", () => {
    const t = vi.fn((key: string) => key);
    generateQuizPdf({
      results: createQuizResults({
        overallScore: 0,
        weakestDimensions: [],
      }),
      config: ITSM_CONFIG,
      t,
      locale: "fr",
    });

    expect(mockInstance.save).toHaveBeenCalledTimes(1);
  });
});
