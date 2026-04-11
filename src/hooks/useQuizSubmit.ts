"use client";

import { useState } from "react";
import type { QuizResults } from "@/hooks/useQuiz";
import type { QuizEmailGateState } from "@/components/quiz/QuizEmailGate";

interface UseQuizSubmitReturn {
  email: string;
  setEmail: (value: string) => void;
  gateState: QuizEmailGateState;
  submit: (e: React.FormEvent) => Promise<void>;
}

/**
 * Encapsulates the email gate state machine and the fetch call to
 * /api/quiz/submit. Extracted from QuizResultsPreview (US-21.7) so the
 * orchestrator component stays focused on composition.
 *
 * Behaviour is fire-and-forget on purpose: the visitor must always
 * unlock the gated results even if the CRM sync fails in the
 * background (the server endpoint has its own silent-fail contract
 * — see src/app/api/quiz/submit/route.ts).
 */
export function useQuizSubmit(results: QuizResults): UseQuizSubmitReturn {
  const [email, setEmail] = useState("");
  const [gateState, setGateState] = useState<QuizEmailGateState>("locked");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || gateState === "sending") return;

    setGateState("sending");
    try {
      await fetch("/api/quiz/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          segment: results.segment,
          overallScore: results.overallScore,
          maturityLevel: results.maturityLevel,
          dimensionScores: results.dimensionScores,
          demographics: results.demographics,
          weakestDimensions: results.weakestDimensions.map((d) => ({
            id: d.id,
            score: d.score,
            nameKey: d.nameKey,
            commercialAngleKey: d.commercialAngleKey,
          })),
        }),
      });
    } catch {
      // Fire-and-forget — never block the user from seeing their results
    }
    setGateState("unlocked");
  }

  return { email, setEmail, gateState, submit };
}
