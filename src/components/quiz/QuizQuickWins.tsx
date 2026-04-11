"use client";

import type { QuizResults } from "@/hooks/useQuiz";

interface QuizQuickWinsProps {
  weakestDimensions: QuizResults["weakestDimensions"];
  /** next-intl translator from the parent (top-level namespace). */
  t: (key: string) => string;
}

/**
 * "Quick wins" section for the quiz results screen.
 *
 * Renders the top 3 weakest dimensions with commercial angles — the
 * FREE (pre-gate) value proposition of the results screen.
 *
 * Extracted from QuizResultsPreview (US-21.7, Sprint 14).
 */
export default function QuizQuickWins({
  weakestDimensions,
  t,
}: QuizQuickWinsProps) {
  return (
    <div className="mb-16">
      <h3 className="text-xs font-medium uppercase tracking-[0.15em] text-slate-400 mb-6">
        {t("quiz.results.quickWinsTitle")}
      </h3>

      <div className="space-y-4">
        {weakestDimensions.map((dim, i) => (
          <div
            key={dim.id}
            className="border border-white/5 rounded-lg p-5 hover:border-accent/20 transition-colors duration-300"
          >
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                <span className="text-accent text-sm font-semibold">
                  {i + 1}
                </span>
              </div>
              <div>
                <h4 className="text-surface font-medium text-sm mb-1">
                  {t(dim.nameKey)}{" "}
                  <span className="text-slate-400">
                    — {dim.score.toFixed(1)}/5
                  </span>
                </h4>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {t(dim.commercialAngleKey)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
