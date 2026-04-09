"use client";

import { useState, useCallback } from "react";
import type { QuizConfig, QuizSegment } from "@/config/quiz";
import {
  calculateDimensionScores,
  calculateOverallScore,
  getMaturityLevel,
  getWeakestDimensions,
  type QuizAnswers,
} from "@/lib/quiz/scoring";

export type QuizPhase = "demographics" | "questions" | "results";

interface Demographics {
  companySize: string;
  industry: string;
  role: string;
}

export interface QuizResults {
  segment: QuizSegment;
  answers: QuizAnswers;
  demographics: Demographics;
  dimensionScores: Record<string, number>;
  overallScore: number;
  maturityLevel: ReturnType<typeof getMaturityLevel>;
  weakestDimensions: ReturnType<typeof getWeakestDimensions>;
}

interface UseQuizReturn {
  phase: QuizPhase;
  currentQuestionIndex: number;
  totalQuestions: number;
  answers: QuizAnswers;
  demographics: Demographics;
  results: QuizResults | null;
  /** Progress percentage (0–100) including demographics step. */
  progress: number;

  setDemographic: (field: keyof Demographics, value: string) => void;
  submitDemographics: () => void;
  selectAnswer: (questionId: string, score: number) => void;
  goBack: () => void;
  reset: () => void;
}

/**
 * Manages the full quiz lifecycle: demographics → questions → results.
 * Pure client-side state — no API calls. Results are computed locally.
 */
export function useQuiz(config: QuizConfig): UseQuizReturn {
  const [phase, setPhase] = useState<QuizPhase>("demographics");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [demographics, setDemographicsState] = useState<Demographics>({
    companySize: "",
    industry: "",
    role: "",
  });
  const [results, setResults] = useState<QuizResults | null>(null);

  const totalQuestions = config.questions.length;

  // Progress: demographics = 0-10%, questions = 10-100%
  const progress =
    phase === "demographics"
      ? 0
      : phase === "results"
        ? 100
        : Math.round(10 + (currentQuestionIndex / totalQuestions) * 90);

  const setDemographic = useCallback(
    (field: keyof Demographics, value: string) => {
      setDemographicsState((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  const submitDemographics = useCallback(() => {
    setPhase("questions");
  }, []);

  const selectAnswer = useCallback(
    (questionId: string, score: number) => {
      const newAnswers = { ...answers, [questionId]: score };
      setAnswers(newAnswers);

      // Auto-advance or compute results
      if (currentQuestionIndex < totalQuestions - 1) {
        // Small delay for visual feedback before advancing
        setTimeout(() => {
          setCurrentQuestionIndex((prev) => prev + 1);
        }, 350);
      } else {
        // Last question — compute results
        const dimensionScores = calculateDimensionScores(newAnswers, config);
        const overallScore = calculateOverallScore(newAnswers, config);
        const maturityLevel = getMaturityLevel(overallScore, config);
        const weakestDimensions = getWeakestDimensions(dimensionScores, config);

        setResults({
          segment: config.segment,
          answers: newAnswers,
          demographics,
          dimensionScores,
          overallScore,
          maturityLevel,
          weakestDimensions,
        });

        setTimeout(() => {
          setPhase("results");
        }, 500);
      }
    },
    [answers, currentQuestionIndex, totalQuestions, config, demographics]
  );

  const goBack = useCallback(() => {
    if (phase === "questions" && currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    } else if (phase === "questions" && currentQuestionIndex === 0) {
      setPhase("demographics");
    }
  }, [phase, currentQuestionIndex]);

  const reset = useCallback(() => {
    setPhase("demographics");
    setCurrentQuestionIndex(0);
    setAnswers({});
    setDemographicsState({ companySize: "", industry: "", role: "" });
    setResults(null);
  }, []);

  return {
    phase,
    currentQuestionIndex,
    totalQuestions,
    answers,
    demographics,
    results,
    progress,
    setDemographic,
    submitDemographics,
    selectAnswer,
    goBack,
    reset,
  };
}
