"use client";

import { estimateROI, companySizeBracket } from "@/lib/quiz/roi";
import type { QuizSegment } from "@/config/quiz";

interface QuizROIProps {
  level: 1 | 2 | 3 | 4 | 5;
  segment: QuizSegment;
  /** Raw demographics value — mapped to a bracket internally. */
  companySize: string;
  locale: "fr" | "en";
  /** Top-level next-intl translator passed by the parent. */
  t: (key: string) => string;
}

/** Format a EUR amount with locale-aware thousands separators (no decimals). */
function formatEUR(value: number, locale: "fr" | "en"): string {
  return new Intl.NumberFormat(locale === "fr" ? "fr-FR" : "en-US", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  }).format(value);
}

/**
 * SMI-roi — Indicative annualized savings range, displayed between
 * the Quick Wins and the Recommended Offer. Always a band, never a
 * single number; always disclaimed as non-contractual.
 *
 * At level 5 (already optimized) the component swaps to a "sustain
 * excellence" message rather than showing a near-zero range, per
 * SMI-roi Scenario 3.
 */
export default function QuizROI({
  level,
  segment,
  companySize,
  locale,
  t,
}: QuizROIProps) {
  const bracket = companySizeBracket(companySize);
  const usingFallbackBracket = !companySize; // Scenario 2 hint
  const roi = estimateROI({ level, segment, companySize: bracket });

  const headingId = "quiz-roi-heading";
  const tagline = t("quiz.roi.tagline");
  const heading = t(`quiz.roi.heading.${segment}`);

  if (roi.alreadyOptimized) {
    return (
      <section
        aria-labelledby={headingId}
        className="mb-12 border border-white/8 bg-deep/40 rounded-xl p-6 sm:p-8"
      >
        <p className="text-accent text-xs font-medium tracking-widest uppercase font-heading mb-2">
          {tagline}
        </p>
        <h2
          id={headingId}
          className="text-xl sm:text-2xl font-heading font-semibold text-surface tracking-tight mb-3"
        >
          {t("quiz.roi.optimized.heading")}
        </h2>
        <p className="text-slate-400 text-sm leading-relaxed">
          {t("quiz.roi.optimized.body")}
        </p>
      </section>
    );
  }

  return (
    <section
      aria-labelledby={headingId}
      className="mb-12 border border-white/8 bg-deep/40 rounded-xl p-6 sm:p-8"
    >
      <p className="text-accent text-xs font-medium tracking-widest uppercase font-heading mb-2">
        {tagline}
      </p>
      <h2
        id={headingId}
        className="text-xl sm:text-2xl font-heading font-semibold text-surface tracking-tight mb-4"
      >
        {heading}
      </h2>

      <p
        className="text-2xl sm:text-3xl font-heading font-bold text-accent tracking-tight mb-2"
        data-testid="quiz-roi-range"
      >
        {formatEUR(roi.min, locale)} – {formatEUR(roi.max, locale)}
        <span className="text-slate-500 text-base font-normal ml-2">
          / {t("quiz.roi.perYear")}
        </span>
      </p>

      <p className="text-slate-400 text-sm leading-relaxed mb-2">
        {t(`quiz.roi.body.${segment}`)}
      </p>

      {usingFallbackBracket && (
        <p className="text-slate-500 text-xs italic mt-2">
          {t("quiz.roi.fallbackHint")}
        </p>
      )}

      <p className="text-slate-500 text-xs italic mt-4">
        {t("quiz.roi.disclaimer")}
      </p>
    </section>
  );
}
