"use client";

import type { MaturityLevel } from "@/config/quiz";

interface QuizScoreHeaderProps {
  overallScore: number;
  maturityLevel: MaturityLevel;
  /** next-intl translator from the parent (top-level namespace). */
  t: (key: string) => string;
}

/** Urgency → Tailwind classes mapping for the level badge. */
const URGENCY_BADGE_CLASSES: Record<MaturityLevel["urgency"], string> = {
  critical: "text-red-400 border-red-400/30 bg-red-400/10",
  high: "text-orange-400 border-orange-400/30 bg-orange-400/10",
  medium: "text-accent border-accent/30 bg-accent/10",
  low: "text-emerald-400 border-emerald-400/30 bg-emerald-400/10",
};

/**
 * Score header block for the quiz results screen.
 *
 * Pure presentational component — renders the score, the urgency-coloured
 * level badge and the maturity level description. Extracted from
 * QuizResultsPreview (US-21.7, Sprint 14).
 */
export default function QuizScoreHeader({
  overallScore,
  maturityLevel,
  t,
}: QuizScoreHeaderProps) {
  const badgeClass =
    URGENCY_BADGE_CLASSES[maturityLevel.urgency] ??
    URGENCY_BADGE_CLASSES.medium;

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
