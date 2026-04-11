"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { CALENDLY_URL } from "@/config/site";
import type { QuizResults } from "@/hooks/useQuiz";
import type { QuizConfig } from "@/config/quiz";
import { generateQuizPdf } from "@/lib/quiz/generate-pdf";
import RadarChart from "./RadarChart";
import QuizScoreHeader from "./QuizScoreHeader";
import QuizQuickWins from "./QuizQuickWins";
import QuizEmailGate from "./QuizEmailGate";
import QuizDimensionBreakdown from "./QuizDimensionBreakdown";

interface QuizResultsPreviewProps {
  results: QuizResults;
  config: QuizConfig;
  onRestart: () => void;
}

/**
 * Quiz results screen — hybrid gating model:
 *
 * FREE (visible immediately):
 *   - Overall score + maturity level badge
 *   - Radar chart (8 dimensions)
 *   - Top 3 quick wins
 *
 * GATED (after email):
 *   - Dimension bar chart with benchmarks
 *   - CTA consultation
 *
 * HubSpot lead creation happens on email submit.
 */
export default function QuizResultsPreview({
  results,
  config,
  onRestart,
}: QuizResultsPreviewProps) {
  const t = useTranslations();
  const locale = useLocale() as "fr" | "en";
  const [email, setEmail] = useState("");
  const [gateState, setGateState] = useState<"locked" | "sending" | "unlocked">("locked");

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

  const radarLabels = config.dimensions.map((dim) => t(dim.nameKey));

  /** Submit the full quiz payload to unlock detailed results + sync HubSpot. */
  async function handleEmailSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || gateState === "sending") return;

    setGateState("sending");
    try {
      await fetch("/api/quiz/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          segment: results.segment,
          overallScore: results.overallScore,
          maturityLevel: results.maturityLevel,
          dimensionScores: results.dimensionScores,
          demographics: results.demographics,
          weakestDimensions: results.weakestDimensions.map((d) => ({
            id: d.id,
            score: d.score,
            nameKey: d.nameKey,
            commercialAngleKey: d.commercialAngleKey,
          })),
        }),
      });
    } catch {
      // Fire-and-forget — never block the user from seeing their results
    }
    setGateState("unlocked");
  }

  return (
    <div className="min-h-[100dvh] bg-deep">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        {/* Score header */}
        <QuizScoreHeader
          overallScore={overallScore}
          maturityLevel={maturityLevel}
          badgeClass={badgeClass}
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
            onDownloadPdf={() =>
              generateQuizPdf({ results, config, t, locale })
            }
            t={t}
          />
        )}

        {/* CTAs */}
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
      </div>
    </div>
  );
}
