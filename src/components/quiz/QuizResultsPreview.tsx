"use client";

import { useTranslations } from "next-intl";
import type { QuizResults } from "@/hooks/useQuiz";
import type { QuizConfig } from "@/config/quiz";

interface QuizResultsPreviewProps {
  results: QuizResults;
  config: QuizConfig;
  onRestart: () => void;
}

/**
 * Displays quiz results after completion.
 *
 * Shows: overall score + maturity level, dimension breakdown bar chart,
 * top 3 weakest dimensions as "quick wins", and CTAs.
 *
 * This is the free preview — the gated detailed report (PDF) comes in US-18.5/18.6.
 */
export default function QuizResultsPreview({
  results,
  config,
  onRestart,
}: QuizResultsPreviewProps) {
  const t = useTranslations();

  const { overallScore, maturityLevel, dimensionScores, weakestDimensions } =
    results;

  // Urgency-based accent colors
  const urgencyColors: Record<string, string> = {
    critical: "text-red-400 border-red-400/30 bg-red-400/10",
    high: "text-orange-400 border-orange-400/30 bg-orange-400/10",
    medium: "text-accent border-accent/30 bg-accent/10",
    low: "text-emerald-400 border-emerald-400/30 bg-emerald-400/10",
  };

  const badgeClass =
    urgencyColors[maturityLevel.urgency] ?? urgencyColors.medium;

  return (
    <div className="min-h-[100dvh] bg-deep">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        {/* Score header */}
        <div className="text-center mb-16">
          {/* Big score */}
          <div className="mb-6">
            <span className="text-6xl sm:text-7xl font-heading font-bold text-surface">
              {overallScore}
            </span>
            <span className="text-2xl text-slate-500 font-heading">/100</span>
          </div>

          {/* Level badge */}
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium mb-4 ${badgeClass}`}
          >
            <span>Level {maturityLevel.level}</span>
            <span className="opacity-60">—</span>
            <span>{t(maturityLevel.labelKey)}</span>
          </div>

          {/* Level description */}
          <p className="text-slate-400 text-base max-w-lg mx-auto">
            {t(maturityLevel.descriptionKey)}
          </p>
        </div>

        {/* Dimension scores — horizontal bar chart */}
        <div className="mb-16">
          <h3 className="text-xs font-medium uppercase tracking-[0.15em] text-slate-500 mb-6">
            {results.segment === "itsm"
              ? t("quiz.itsm.dim.incident").replace(/:.*/,'').trim() && "Score par dimension"
              : "Score par dimension"}
          </h3>

          <div className="space-y-4">
            {config.dimensions.map((dim) => {
              const score = dimensionScores[dim.id] ?? 0;
              const pct = (score / 5) * 100;

              return (
                <div key={dim.id}>
                  <div className="flex justify-between items-baseline mb-1.5">
                    <span className="text-sm text-slate-300 truncate pr-4">
                      {t(dim.nameKey)}
                    </span>
                    <span className="text-sm font-medium text-surface shrink-0">
                      {score.toFixed(1)}/5
                    </span>
                  </div>
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-accent rounded-full transition-all duration-700"
                      style={{
                        width: `${pct}%`,
                        transitionTimingFunction: "var(--ease-spring)",
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick wins — weakest dimensions */}
        <div className="mb-16">
          <h3 className="text-xs font-medium uppercase tracking-[0.15em] text-slate-500 mb-6">
            {"Quick wins — vos axes d'amélioration prioritaires"}
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
                      <span className="text-slate-500">
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

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <a
            href="#contact"
            className="w-full sm:w-auto inline-flex items-center justify-center bg-accent text-deep px-8 py-4 rounded-lg text-base font-semibold hover:bg-accent-light transition-all duration-300 shadow-[var(--shadow-accent-md)] hover:shadow-[var(--shadow-accent-lg)]"
            style={{ transitionTimingFunction: "var(--ease-spring)" }}
          >
            {t(maturityLevel.ctaKey)}
          </a>

          <button
            type="button"
            onClick={onRestart}
            className="w-full sm:w-auto inline-flex items-center justify-center border border-white/10 text-slate-400 px-8 py-4 rounded-lg text-base font-medium hover:border-accent/30 hover:text-accent transition-all duration-300"
          >
            {t("quiz.back")}
          </button>
        </div>
      </div>
    </div>
  );
}
