import { describe, it, expect, beforeEach, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useQuizSubmit } from "../useQuizSubmit";
import type { QuizResults } from "@/hooks/useQuiz";

// ── Mock fetch globally ──────────────────────────────────────────────

const fetchSpy = vi.fn<(typeof globalThis)["fetch"]>();
vi.stubGlobal("fetch", fetchSpy);

// ── Fixture: deterministic QuizResults ───────────────────────────────
// Note: shape aligned on src/config/quiz/types.ts — MaturityLevel needs
// scoreRange, QuizDimension needs weight + benchmarkKey (S19 SMI schema).

const MOCK_RESULTS: QuizResults = {
  segment: "itsm",
  overallScore: 62,
  answers: {},
  maturityLevel: {
    level: 3,
    labelKey: "quiz.itsm.levels.established.label",
    descriptionKey: "quiz.itsm.levels.established.description",
    scoreRange: [41, 60],
    ctaKey: "quiz.itsm.levels.established.cta",
    urgency: "medium",
  },
  dimensionScores: {
    incident_management: 3.2,
    problem_management: 2.8,
    change_management: 3.0,
  },
  demographics: {
    companySize: "200_499",
    industry: "tech",
    role: "itDirector",
  },
  weakestDimensions: [
    {
      id: "problem_management",
      score: 2.8,
      nameKey: "quiz.itsm.dimensions.problem_management",
      weight: 0.15,
      commercialAngleKey: "quiz.itsm.commercial.problem_management",
      benchmarkKey: "quiz.itsm.benchmark.problem_management",
    },
    {
      id: "change_management",
      score: 3.0,
      nameKey: "quiz.itsm.dimensions.change_management",
      weight: 0.15,
      commercialAngleKey: "quiz.itsm.commercial.change_management",
      benchmarkKey: "quiz.itsm.benchmark.change_management",
    },
  ],
};

// ── Helpers ──────────────────────────────────────────────────────────

function fakeFormEvent(): React.FormEvent {
  return { preventDefault: vi.fn() } as unknown as React.FormEvent;
}

// ── Tests ────────────────────────────────────────────────────────────

describe("useQuizSubmit", () => {
  beforeEach(() => {
    fetchSpy.mockReset();
    fetchSpy.mockResolvedValue(new Response(JSON.stringify({ success: true })));
  });

  it("initialises with empty email and locked gate", () => {
    const { result } = renderHook(() => useQuizSubmit(MOCK_RESULTS));

    expect(result.current.email).toBe("");
    expect(result.current.gateState).toBe("locked");
  });

  it("updates email via setEmail", () => {
    const { result } = renderHook(() => useQuizSubmit(MOCK_RESULTS));

    act(() => result.current.setEmail("test@example.com"));

    expect(result.current.email).toBe("test@example.com");
  });

  it("does not submit when email is empty", async () => {
    const { result } = renderHook(() => useQuizSubmit(MOCK_RESULTS));

    await act(async () => {
      await result.current.submit(fakeFormEvent());
    });

    expect(fetchSpy).not.toHaveBeenCalled();
    expect(result.current.gateState).toBe("locked");
  });

  it("submits to /api/quiz/submit and unlocks the gate", async () => {
    const { result } = renderHook(() => useQuizSubmit(MOCK_RESULTS));

    act(() => result.current.setEmail("sophie@acme.fr"));

    await act(async () => {
      await result.current.submit(fakeFormEvent());
    });

    expect(fetchSpy).toHaveBeenCalledOnce();
    const [url, init] = fetchSpy.mock.calls[0];
    expect(url).toBe("/api/quiz/submit");
    expect(init?.method).toBe("POST");

    const body = JSON.parse(init?.body as string);
    expect(body.email).toBe("sophie@acme.fr");
    expect(body.segment).toBe("itsm");
    expect(body.overallScore).toBe(62);

    expect(result.current.gateState).toBe("unlocked");
  });

  it("transitions through locked → sending → unlocked", async () => {
    let resolveFetch!: () => void;
    fetchSpy.mockImplementationOnce(
      () =>
        new Promise<Response>((resolve) => {
          resolveFetch = () =>
            resolve(new Response(JSON.stringify({ success: true })));
        })
    );

    const { result } = renderHook(() => useQuizSubmit(MOCK_RESULTS));
    act(() => result.current.setEmail("test@acme.fr"));
    expect(result.current.gateState).toBe("locked");

    // Start submit — should transition to "sending"
    const submitPromise = act(async () => {
      await result.current.submit(fakeFormEvent());
    });

    // Resolve the hanging fetch and wait for completion
    resolveFetch();
    await submitPromise;

    expect(result.current.gateState).toBe("unlocked");
    expect(fetchSpy).toHaveBeenCalledOnce();
  });

  it("unlocks the gate even when fetch throws (fire-and-forget)", async () => {
    fetchSpy.mockRejectedValueOnce(new Error("Network failure"));

    const { result } = renderHook(() => useQuizSubmit(MOCK_RESULTS));
    act(() => result.current.setEmail("fail@example.com"));

    await act(async () => {
      await result.current.submit(fakeFormEvent());
    });

    expect(result.current.gateState).toBe("unlocked");
  });

  it("sends weakestDimensions with the correct shape", async () => {
    const { result } = renderHook(() => useQuizSubmit(MOCK_RESULTS));
    act(() => result.current.setEmail("shape@test.com"));

    await act(async () => {
      await result.current.submit(fakeFormEvent());
    });

    const body = JSON.parse(fetchSpy.mock.calls[0][1]?.body as string);
    expect(body.weakestDimensions).toEqual([
      {
        id: "problem_management",
        score: 2.8,
        nameKey: "quiz.itsm.dimensions.problem_management",
        commercialAngleKey: "quiz.itsm.commercial.problem_management",
      },
      {
        id: "change_management",
        score: 3.0,
        nameKey: "quiz.itsm.dimensions.change_management",
        commercialAngleKey: "quiz.itsm.commercial.change_management",
      },
    ]);
  });
});
