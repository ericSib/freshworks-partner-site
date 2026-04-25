"use client";

import { CALENDLY_URL } from "@/config/site";
import { findOfferById } from "@/config/offers";
import { recommendOffer } from "@/lib/quiz/offer-mapping";
import type { MaturityLevelNumber } from "@/lib/quiz/offer-mapping";
import type { QuizSegment } from "@/config/quiz";

interface QuizRecommendedOfferProps {
  level: MaturityLevelNumber;
  segment: QuizSegment;
  /** Top-level next-intl translator passed by the parent. */
  t: (key: string) => string;
}

/**
 * SMI-offers — Surfaces the offer recommended by the D22 matrix at the
 * end of the quiz. Goal: shorten the path from "result page" to
 * "Calendly booking" by removing the cognitive load of re-reading the
 * 8-offer catalog.
 *
 * Layout: a single card, distinct visual weight from QuickWins so it
 * reads as the "next step" rather than a fourth quick win.
 */
export default function QuizRecommendedOffer({
  level,
  segment,
  t,
}: QuizRecommendedOfferProps) {
  const slug = recommendOffer(level, segment);
  const found = findOfferById(slug);
  if (!found) return null;
  const { offer, index } = found;

  const title = t(`services.cards.${index}.title`);
  const description = t(`services.cards.${index}.description`);
  const price = t(`services.cards.${index}.price`);

  const heading = t(`quiz.recommendation.heading.level${level}`);
  const ctaLabel = t("quiz.recommendation.cta");

  return (
    <section
      aria-labelledby="quiz-recommended-offer-heading"
      className="mb-16 border border-accent/30 bg-accent/[0.04] rounded-xl p-6 sm:p-8"
    >
      <p className="text-accent text-xs font-medium tracking-widest uppercase font-heading mb-2">
        {t("quiz.recommendation.tagline")}
      </p>
      <h2
        id="quiz-recommended-offer-heading"
        className="text-xl sm:text-2xl font-heading font-semibold text-surface tracking-tight mb-4"
      >
        {heading}
      </h2>

      <div className="border border-white/8 bg-deep/40 rounded-lg p-5 sm:p-6 mb-5">
        <h3 className="text-lg font-heading font-semibold text-surface mb-1">
          {title}
        </h3>
        <p className="text-slate-400 text-sm leading-relaxed mb-3">
          {description}
        </p>
        <p className="text-accent text-sm font-medium" data-testid="quiz-recommended-offer-price">
          {price}
        </p>
      </div>

      <a
        href={CALENDLY_URL}
        target="_blank"
        rel="noopener noreferrer"
        data-testid="quiz-recommended-offer-cta"
        data-offer-slug={offer.id}
        className="inline-flex items-center justify-center bg-accent text-deep px-6 py-3 rounded-lg text-sm font-semibold hover:bg-accent-light transition-all duration-300 shadow-[var(--shadow-accent-sm)] hover:shadow-[var(--shadow-accent-md)]"
        style={{ transitionTimingFunction: "var(--ease-spring)" }}
      >
        {ctaLabel}
        <svg
          aria-hidden="true"
          className="w-4 h-4 ml-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
          />
        </svg>
      </a>
    </section>
  );
}
