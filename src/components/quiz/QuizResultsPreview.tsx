"use client";

import { useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import type { QuizResults } from "@/hooks/useQuiz";
import type { QuizConfig } from "@/config/quiz";
import { useQuizSubmit } from "@/hooks/useQuizSubmit";
import { generateQuizPdf } from "@/lib/quiz/generate-pdf";
import {
  trackQuizFormShown,
  trackQuizPdfDownloaded,
  trackQuizResultsViewed,
} from "@/lib/analytics";
import RadarChart from "./RadarChart";
import QuizScoreHeader from "./QuizScoreHeader";
import QuizQuickWins from "./QuizQuickWins";
import QuizROI from "./QuizROI";
import QuizRecommendedOffer from "./QuizRecommendedOffer";
import QuizEmailGate from "./QuizEmailGate";
import QuizDimensionBreakdown from "./QuizDimensionBreakdown";
import QuizResultCtas from "./QuizResultCtas";
import type { MaturityLevelNumber } from "@/lib/quiz/offer-mapping";

interface QuizResultsPreviewProps {
  results: QuizResults;
  config: QuizConfig;
  onRestart: () => void;
}

/**
 * Hybrid gating results screen — FREE (score + radar + quick wins)
 * then GATED (dimension breakdown + PDF) behind the email wall.
 * Thin orchestrator: composition only, all content lives in children.
 */
export default function QuizResultsPreview({
  results,
  config,
  onRestart,
}: QuizResultsPreviewProps) {
  const t = useTranslations();
  const locale = useLocale() as "fr" | "en";
  const { email, setEmail, gateState, submit: handleEmailSubmit } =
    useQuizSubmit(results);

  const { overallScore, maturityLevel, dimensionScores, weakestDimensions } =
    results;

  const radarLabels = config.dimensions.map((dim) => t(dim.nameKey));

  // Funnel tracking (US-S20-5) — emit once per render cycle, no-op if no consent.
  useEffect(() => {
    trackQuizResultsViewed(results.segment, maturityLevel.level, true);
  }, [results.segment, maturityLevel.level]);

  useEffect(() => {
    if (gateState === "locked") {
      trackQuizFormShown(results.segment, overallScore);
    }
  }, [gateState, results.segment, overallScore]);

  return (
    <div className="min-h-[100dvh] bg-deep">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        {/* Score header */}
        <QuizScoreHeader
          overallScore={overallScore}
          maturityLevel={maturityLevel}
          t={t}
        />

        {/* Radar chart — FREE (always visible) */}
        <div className="mb-16">
          <RadarChart
            scores={dimensionScores}
            dimensions={config.dimensions}
            labels={radarLabels}
            size={340}
          />
        </div>

        {/* Quick wins — FREE (always visible) */}
        <QuizQuickWins weakestDimensions={weakestDimensions} t={t} />

        {/* ROI estimate (SMI-roi, D21) — FREE */}
        <QuizROI
          level={maturityLevel.level as MaturityLevelNumber}
          segment={results.segment}
          companySize={results.demographics.companySize}
          locale={locale}
          t={t}
        />

        {/* Recommended offer (SMI-offers, D22) — FREE */}
        <QuizRecommendedOffer
          level={maturityLevel.level as MaturityLevelNumber}
          segment={results.segment}
          t={t}
        />

        {/* EMAIL GATE — Unlock detailed results */}
        {gateState !== "unlocked" ? (
          <QuizEmailGate
            email={email}
            onEmailChange={setEmail}
            gateState={gateState}
            onSubmit={handleEmailSubmit}
            t={t}
          />
        ) : (
          <QuizDimensionBreakdown
            dimensions={config.dimensions}
            dimensionScores={dimensionScores}
            onDownloadPdf={() => {
              trackQuizPdfDownloaded(results.segment, maturityLevel.level);
              generateQuizPdf({ results, config, t, locale });
            }}
            t={t}
          />
        )}

        {/* CTAs */}
        <QuizResultCtas
          maturityLevel={maturityLevel}
          onRestart={onRestart}
          t={t}
        />
      </div>
    </div>
  );
}
