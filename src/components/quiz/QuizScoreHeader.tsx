"use client";

import type { MaturityLevel } from "@/config/quiz";

interface QuizScoreHeaderProps {
  overallScore: number;
  maturityLevel: MaturityLevel;
  /** CSS classes computed from the urgency level by the parent. */
  badgeClass: string;
  /** next-intl translator from the parent (top-level namespace). */
  t: (key: string) => string;
}

/**
 * Score header block for the quiz results screen.
 *
 * Pure presentational component — renders:
 *   - big score (N/100)
 *   - "Level X — Label" badge with urgency-based colors
 *   - maturity level description
 *
 * Extracted from QuizResultsPreview (US-21.7, Sprint 14).
 */
export default function QuizScoreHeader({
  overallScore,
  maturityLevel,
  badgeClass,
  t,
}: QuizScoreHeaderProps) {
  return (
    <div className="text-center mb-12">
      <div className="mb-6">
        <span className="text-6xl sm:text-7xl font-heading font-bold text-surface">
          {overallScore}
        </span>
        <span className="text-2xl text-slate-500 font-heading">/100</span>
      </div>

      <div
        className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium mb-4 ${badgeClass}`}
      >
        <span>Level {maturityLevel.level}</span>
        <span className="opacity-60">—</span>
        <span>{t(maturityLevel.labelKey)}</span>
      </div>

      <p className="text-slate-400 text-base max-w-lg mx-auto">
        {t(maturityLevel.descriptionKey)}
      </p>
    </div>
  );
}
