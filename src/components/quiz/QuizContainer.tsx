"use client";

import { useTranslations } from "next-intl";
import type { QuizConfig } from "@/config/quiz";
import { useQuiz } from "@/hooks/useQuiz";
import QuizProgress from "./QuizProgress";
import QuizDemographics from "./QuizDemographics";
import QuizQuestion from "./QuizQuestion";

interface QuizContainerProps {
  config: QuizConfig;
}

/**
 * Main quiz orchestrator — manages phase transitions:
 *   demographics → questions (auto-advance) → results
 *
 * Results rendering is handled by the parent page (not this component)
 * to support the hybrid gating flow (US-18.5).
 */
export default function QuizContainer({ config }: QuizContainerProps) {
  const t = useTranslations();
  const quiz = useQuiz(config);

  // Find the dimension for the current question (for the progress label)
  const currentQuestion =
    quiz.phase === "questions"
      ? config.questions[quiz.currentQuestionIndex]
      : null;
  const currentDimension = currentQuestion
    ? config.dimensions.find((d) => d.id === currentQuestion.dimensionId)
    : null;
  const dimIndex = currentDimension
    ? config.dimensions.indexOf(currentDimension) + 1
    : 0;

  // If results are ready, expose them via a callback or render nothing
  // (the parent page handles the results phase)
  if (quiz.phase === "results" && quiz.results) {
    // Results phase — parent page should render QuizResults
    // We store results in a data attribute for the parent to read
    return (
      <div
        data-quiz-results={JSON.stringify(quiz.results)}
        data-testid="quiz-results-data"
        className="hidden"
      />
    );
  }

  return (
    <div className="min-h-[100dvh] bg-deep flex flex-col">
      {/* Progress bar — sticky */}
      <QuizProgress
        progress={quiz.progress}
        dimensionLabel={
          currentDimension
            ? `${t("quiz.section")} ${dimIndex} ${t("quiz.of")} ${config.dimensions.length} : ${t(currentDimension.nameKey)}`
            : undefined
        }
      />

      {/* Content area */}
      <div className="flex-1 flex items-center px-4 sm:px-6 lg:px-8 py-12">
        {quiz.phase === "demographics" && (
          <div className="w-full max-w-xl mx-auto">
            <QuizDemographics
              demographics={quiz.demographics}
              onChangeDemographic={quiz.setDemographic}
              onStart={quiz.submitDemographics}
              t={t}
            />
          </div>
        )}

        {quiz.phase === "questions" && currentQuestion && (
          <div className="w-full">
            <QuizQuestion
              question={currentQuestion}
              selectedScore={quiz.answers[currentQuestion.id]}
              onSelect={quiz.selectAnswer}
              stepLabel={`${quiz.currentQuestionIndex + 1} / ${quiz.totalQuestions}`}
            />

            {/* Back button */}
            <div className="max-w-2xl mx-auto mt-8">
              <button
                onClick={quiz.goBack}
                className="text-slate-500 hover:text-slate-300 text-sm transition-colors duration-300 flex items-center gap-1.5"
              >
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                  />
                </svg>
                {t("quiz.back")}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
