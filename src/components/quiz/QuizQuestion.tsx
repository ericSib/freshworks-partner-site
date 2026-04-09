"use client";

import { useTranslations } from "next-intl";
import type { QuizQuestion as QuizQuestionType } from "@/config/quiz";
import QuizOption from "./QuizOption";

interface QuizQuestionProps {
  question: QuizQuestionType;
  selectedScore: number | undefined;
  onSelect: (questionId: string, score: number) => void;
  /** e.g. "3 / 9" */
  stepLabel: string;
}

export default function QuizQuestion({
  question,
  selectedScore,
  onSelect,
  stepLabel,
}: QuizQuestionProps) {
  const t = useTranslations();

  return (
    <div className="max-w-2xl mx-auto">
      {/* Step indicator */}
      <p className="text-accent text-xs font-medium tracking-widest uppercase mb-4">
        {stepLabel}
      </p>

      {/* Question text */}
      <h2 className="text-xl sm:text-2xl font-heading font-semibold text-surface leading-tight mb-8">
        {t(question.questionKey)}
      </h2>

      {/* Descriptive-choice options */}
      <div className="space-y-3">
        {question.options.map((option) => (
          <QuizOption
            key={option.score}
            label={t(option.labelKey)}
            isSelected={selectedScore === option.score}
            onClick={() => onSelect(question.id, option.score)}
          />
        ))}
      </div>
    </div>
  );
}
