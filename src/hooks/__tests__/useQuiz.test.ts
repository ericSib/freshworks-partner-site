/**
 * US-21.9 — Unit tests for the useQuiz state machine.
 *
 * The quiz hook drives the central lead magnet (50-200 leads/mois).
 * A silent regression on `selectAnswer` or `goBack` would break the
 * full funnel without any monitoring alert — hence we lock the
 * contract with fine-grained assertions on every phase transition.
 *
 * Historical bug: commit 7d8bc37 fixed a closure-stale bug where
 * `setAnswers` referenced the previous answers map instead of the
 * local `newAnswers`. Scenario "last answer lands in results" is
 * the permanent non-regression for that bug.
 */

import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { act, renderHook } from "@testing-library/react";
import { useQuiz } from "@/hooks/useQuiz";
import { ITSM_CONFIG } from "@/config/quiz";

describe("useQuiz — state machine (US-21.9)", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  // ─────────────────────────────────────────────────────────────────────
  // Scenario 1 — initial state
  // ─────────────────────────────────────────────────────────────────────
  describe("initial state after mount", () => {
    it("starts in demographics phase with empty state", () => {
      const { result } = renderHook(() => useQuiz(ITSM_CONFIG));

      expect(result.current.phase).toBe("demographics");
      expect(result.current.currentQuestionIndex).toBe(0);
      expect(result.current.totalQuestions).toBe(ITSM_CONFIG.questions.length);
      expect(result.current.answers).toEqual({});
      expect(result.current.demographics).toEqual({
        companySize: "",
        industry: "",
        role: "",
      });
      expect(result.current.results).toBeNull();
      expect(result.current.progress).toBe(0);
    });
  });

  // ─────────────────────────────────────────────────────────────────────
  // Scenario 2 — setDemographic patches a single field
  // ─────────────────────────────────────────────────────────────────────
  describe("setDemographic", () => {
    it("updates only the requested field", () => {
      const { result } = renderHook(() => useQuiz(ITSM_CONFIG));

      act(() => {
        result.current.setDemographic("companySize", "200_499");
      });

      expect(result.current.demographics.companySize).toBe("200_499");
      expect(result.current.demographics.industry).toBe("");
      expect(result.current.demographics.role).toBe("");
      expect(result.current.phase).toBe("demographics");
    });

    it("accumulates multiple updates", () => {
      const { result } = renderHook(() => useQuiz(ITSM_CONFIG));

      act(() => {
        result.current.setDemographic("companySize", "200_499");
      });
      act(() => {
        result.current.setDemographic("industry", "tech");
      });
      act(() => {
        result.current.setDemographic("role", "itDirector");
      });

      expect(result.current.demographics).toEqual({
        companySize: "200_499",
        industry: "tech",
        role: "itDirector",
      });
    });
  });

  // ─────────────────────────────────────────────────────────────────────
  // Scenario 3 — submitDemographics transitions to questions
  // ─────────────────────────────────────────────────────────────────────
  describe("submitDemographics", () => {
    it("transitions to questions phase", () => {
      const { result } = renderHook(() => useQuiz(ITSM_CONFIG));

      act(() => {
        result.current.submitDemographics();
      });

      expect(result.current.phase).toBe("questions");
      expect(result.current.currentQuestionIndex).toBe(0);
      expect(result.current.progress).toBe(10); // start of questions
    });
  });

  // ─────────────────────────────────────────────────────────────────────
  // Scenario 4 — selectAnswer auto-advances after 350ms
  // ─────────────────────────────────────────────────────────────────────
  describe("selectAnswer — auto-advance", () => {
    it("records the answer and advances to the next question after 350ms", () => {
      const { result } = renderHook(() => useQuiz(ITSM_CONFIG));

      act(() => {
        result.current.submitDemographics();
      });

      const firstQuestionId = ITSM_CONFIG.questions[0].id;
      act(() => {
        result.current.selectAnswer(firstQuestionId, 3);
      });

      // Answer is recorded immediately
      expect(result.current.answers[firstQuestionId]).toBe(3);
      // But the index only advances after the 350ms animation timer
      expect(result.current.currentQuestionIndex).toBe(0);

      act(() => {
        vi.advanceTimersByTime(350);
      });

      expect(result.current.currentQuestionIndex).toBe(1);
      expect(result.current.phase).toBe("questions");
    });
  });

  // ─────────────────────────────────────────────────────────────────────
  // Scenario 5 — last answer computes results (non-regression 7d8bc37)
  // ─────────────────────────────────────────────────────────────────────
  describe("selectAnswer — last question computes results", () => {
    it("transitions to results phase with non-null results after 500ms", () => {
      const { result } = renderHook(() => useQuiz(ITSM_CONFIG));

      // Skip demographics
      act(() => {
        result.current.submitDemographics();
      });

      const total = ITSM_CONFIG.questions.length;

      // Answer every question with score 3 (neutral run)
      for (let i = 0; i < total; i++) {
        const question = ITSM_CONFIG.questions[i];
        act(() => {
          result.current.selectAnswer(question.id, 3);
        });
        // Drain the 350 ms animation between questions; after the LAST
        // question selectAnswer schedules a 500 ms timer to results
        // (captured below).
        if (i < total - 1) {
          act(() => {
            vi.advanceTimersByTime(350);
          });
        }
      }

      // After the last answer the hook schedules a 500 ms transition.
      act(() => {
        vi.advanceTimersByTime(500);
      });

      expect(result.current.phase).toBe("results");
      expect(result.current.results).not.toBeNull();
      expect(result.current.results?.segment).toBe("itsm");
      expect(result.current.results?.overallScore).toBeGreaterThanOrEqual(0);
      expect(result.current.results?.overallScore).toBeLessThanOrEqual(100);
      expect(
        Object.keys(result.current.results?.dimensionScores ?? {}).length
      ).toBe(ITSM_CONFIG.dimensions.length);
      expect(result.current.results?.weakestDimensions.length).toBeLessThanOrEqual(3);
      expect(result.current.progress).toBe(100);
    });

    // Non-regression 7d8bc37: the last answer must be present in the
    // computed results. Closure-stale would drop it and produce a blank
    // results screen.
    it("persists the last answer in the computed results (7d8bc37 non-regression)", () => {
      const { result } = renderHook(() => useQuiz(ITSM_CONFIG));

      act(() => {
        result.current.submitDemographics();
      });

      const total = ITSM_CONFIG.questions.length;
      const lastQuestionId = ITSM_CONFIG.questions[total - 1].id;

      // Answer all but the last with score 3, then the last with score 5
      for (let i = 0; i < total - 1; i++) {
        act(() => {
          result.current.selectAnswer(ITSM_CONFIG.questions[i].id, 3);
        });
        act(() => {
          vi.advanceTimersByTime(350);
        });
      }

      act(() => {
        result.current.selectAnswer(lastQuestionId, 5);
      });
      act(() => {
        vi.advanceTimersByTime(500);
      });

      expect(result.current.results).not.toBeNull();
      // The last answer must be in the results.answers map
      expect(result.current.results?.answers[lastQuestionId]).toBe(5);
    });
  });

  // ─────────────────────────────────────────────────────────────────────
  // Scenario 6 — goBack within questions
  // ─────────────────────────────────────────────────────────────────────
  describe("goBack", () => {
    it("moves to the previous question when currentQuestionIndex > 0", () => {
      const { result } = renderHook(() => useQuiz(ITSM_CONFIG));

      act(() => {
        result.current.submitDemographics();
      });

      // Advance to question index 2
      act(() => {
        result.current.selectAnswer(ITSM_CONFIG.questions[0].id, 3);
      });
      act(() => {
        vi.advanceTimersByTime(350);
      });
      act(() => {
        result.current.selectAnswer(ITSM_CONFIG.questions[1].id, 3);
      });
      act(() => {
        vi.advanceTimersByTime(350);
      });

      expect(result.current.currentQuestionIndex).toBe(2);

      act(() => {
        result.current.goBack();
      });

      expect(result.current.currentQuestionIndex).toBe(1);
      expect(result.current.phase).toBe("questions");
    });

    // Scenario 7
    it("returns to demographics when called at question index 0", () => {
      const { result } = renderHook(() => useQuiz(ITSM_CONFIG));

      act(() => {
        result.current.submitDemographics();
      });
      expect(result.current.phase).toBe("questions");
      expect(result.current.currentQuestionIndex).toBe(0);

      act(() => {
        result.current.goBack();
      });

      expect(result.current.phase).toBe("demographics");
      expect(result.current.currentQuestionIndex).toBe(0);
    });
  });

  // ─────────────────────────────────────────────────────────────────────
  // Scenario 8 — reset restores the initial state
  // ─────────────────────────────────────────────────────────────────────
  describe("reset", () => {
    it("wipes answers, demographics, results and returns to demographics", () => {
      const { result } = renderHook(() => useQuiz(ITSM_CONFIG));

      // Drive the hook all the way through
      act(() => {
        result.current.setDemographic("companySize", "200_499");
      });
      act(() => {
        result.current.setDemographic("industry", "tech");
      });
      act(() => {
        result.current.setDemographic("role", "itDirector");
      });
      act(() => {
        result.current.submitDemographics();
      });
      for (const question of ITSM_CONFIG.questions) {
        act(() => {
          result.current.selectAnswer(question.id, 3);
        });
        act(() => {
          vi.advanceTimersByTime(350);
        });
      }
      act(() => {
        vi.advanceTimersByTime(500);
      });

      expect(result.current.phase).toBe("results");
      expect(result.current.results).not.toBeNull();

      // Reset
      act(() => {
        result.current.reset();
      });

      expect(result.current.phase).toBe("demographics");
      expect(result.current.currentQuestionIndex).toBe(0);
      expect(result.current.answers).toEqual({});
      expect(result.current.demographics).toEqual({
        companySize: "",
        industry: "",
        role: "",
      });
      expect(result.current.results).toBeNull();
      expect(result.current.progress).toBe(0);
    });
  });

  // ─────────────────────────────────────────────────────────────────────
  // Scenario 9 — progress is consistent across phases
  // ─────────────────────────────────────────────────────────────────────
  describe("progress", () => {
    it("is 0 in demographics, 10..99 in questions, 100 in results", () => {
      const { result } = renderHook(() => useQuiz(ITSM_CONFIG));

      expect(result.current.progress).toBe(0);

      act(() => {
        result.current.submitDemographics();
      });
      expect(result.current.progress).toBe(10);

      // Middle of the flow
      const total = ITSM_CONFIG.questions.length;
      for (let i = 0; i < Math.floor(total / 2); i++) {
        act(() => {
          result.current.selectAnswer(ITSM_CONFIG.questions[i].id, 3);
        });
        act(() => {
          vi.advanceTimersByTime(350);
        });
      }
      expect(result.current.progress).toBeGreaterThan(10);
      expect(result.current.progress).toBeLessThan(100);

      // Drive to the end
      for (let i = Math.floor(total / 2); i < total; i++) {
        act(() => {
          result.current.selectAnswer(ITSM_CONFIG.questions[i].id, 3);
        });
        if (i < total - 1) {
          act(() => {
            vi.advanceTimersByTime(350);
          });
        }
      }
      act(() => {
        vi.advanceTimersByTime(500);
      });

      expect(result.current.progress).toBe(100);
    });
  });

  // ─────────────────────────────────────────────────────────────────────
  // Scenario 10 — last-write-wins on the same question
  //
  // Non-regression for closure-stale (7d8bc37). We only assert the answer
  // value, not the auto-advance count: calling selectAnswer twice in a
  // row schedules two independent 350 ms timers and each one advances
  // the index — that is a known latent behaviour (double-click race)
  // which is explicitly out of scope of this story.
  // ─────────────────────────────────────────────────────────────────────
  describe("selectAnswer — idempotence", () => {
    it("keeps the latest score when selectAnswer is called twice in a row", () => {
      const { result } = renderHook(() => useQuiz(ITSM_CONFIG));

      act(() => {
        result.current.submitDemographics();
      });

      const firstQuestionId = ITSM_CONFIG.questions[0].id;

      act(() => {
        result.current.selectAnswer(firstQuestionId, 2);
      });
      act(() => {
        result.current.selectAnswer(firstQuestionId, 4);
      });

      // The second call overrides the first (last-write-wins). This is
      // the critical assertion — it locks the closure-stale fix.
      expect(result.current.answers[firstQuestionId]).toBe(4);

      act(() => {
        vi.advanceTimersByTime(350);
      });

      // Side-note: the auto-advance did fire — index moved past 0. We
      // do not assert the exact value because two selectAnswer calls
      // schedule two advance timers (see comment above the describe).
      expect(result.current.currentQuestionIndex).toBeGreaterThan(0);
    });
  });
});
