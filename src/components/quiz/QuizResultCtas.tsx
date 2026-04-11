"use client";

import { CALENDLY_URL } from "@/config/site";
import type { MaturityLevel } from "@/config/quiz";

interface QuizResultCtasProps {
  maturityLevel: MaturityLevel;
  onRestart: () => void;
  /** next-intl translator from the parent (top-level namespace). */
  t: (key: string) => string;
}

/**
 * Bottom CTAs of the quiz results screen:
 *   - Primary: Calendly booking (maturity-level-specific label)
 *   - Secondary: restart the quiz
 *
 * Extracted from QuizResultsPreview (US-21.7, Sprint 14).
 */
export default function QuizResultCtas({
  maturityLevel,
  onRestart,
  t,
}: QuizResultCtasProps) {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-4">
      <a
        href={CALENDLY_URL}
        target="_blank"
        rel="noopener noreferrer"
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
        {t("quiz.results.restart")}
      </button>
    </div>
  );
}
