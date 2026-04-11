"use client";

import type { QuizDimension } from "@/config/quiz";

interface QuizDimensionBreakdownProps {
  dimensions: QuizDimension[];
  dimensionScores: Record<string, number>;
  onDownloadPdf: () => void;
  /** next-intl translator from the parent (top-level namespace). */
  t: (key: string) => string;
}

/**
 * Detailed dimension breakdown (gated content behind the email wall).
 *
 * For each dimension:
 *   - title + numeric score
 *   - progress bar (score / 5)
 *   - benchmark copy
 *
 * Bottom CTA: "Download PDF" which delegates to the parent via
 * `onDownloadPdf` — the actual generateQuizPdf() call stays in the
 * orchestrator so this component stays free of the jsPDF dependency
 * at import time.
 *
 * Extracted from QuizResultsPreview (US-21.7, Sprint 14).
 */
export default function QuizDimensionBreakdown({
  dimensions,
  dimensionScores,
  onDownloadPdf,
  t,
}: QuizDimensionBreakdownProps) {
  return (
    <div className="mb-16">
      <h3 className="text-xs font-medium uppercase tracking-[0.15em] text-slate-400 mb-6">
        {t("quiz.results.detailedTitle")}
      </h3>

      <div className="space-y-6">
        {dimensions.map((dim) => {
          const score = dimensionScores[dim.id] ?? 0;
          const pct = (score / 5) * 100;

          return (
            <div key={dim.id} className="border border-white/5 rounded-lg p-5">
              <div className="flex justify-between items-baseline mb-2">
                <span className="text-sm font-medium text-surface">
                  {t(dim.nameKey)}
                </span>
                <span className="text-sm font-semibold text-accent shrink-0">
                  {score.toFixed(1)}/5
                </span>
              </div>
              <div className="h-2 bg-white/5 rounded-full overflow-hidden mb-3">
                <div
                  className="h-full bg-accent rounded-full transition-all duration-700"
                  style={{
                    width: `${pct}%`,
                    transitionTimingFunction: "var(--ease-spring)",
                  }}
                />
              </div>
              <p className="text-slate-500 text-xs">{t(dim.benchmarkKey)}</p>
            </div>
          );
        })}
      </div>

      {/* Download PDF button — only after gating unlocked */}
      <button
        type="button"
        onClick={onDownloadPdf}
        className="mt-6 w-full inline-flex items-center justify-center gap-2 border border-accent/30 text-accent px-6 py-3 rounded-lg text-sm font-medium hover:bg-accent/10 transition-all duration-300"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
          />
        </svg>
        {t("quiz.results.downloadPdf")}
      </button>
    </div>
  );
}
