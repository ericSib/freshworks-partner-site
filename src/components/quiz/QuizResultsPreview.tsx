"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import type { QuizResults } from "@/hooks/useQuiz";
import type { QuizConfig } from "@/config/quiz";
import RadarChart from "./RadarChart";

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

  /** Submit email to unlock detailed results + sync HubSpot. */
  async function handleEmailSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || gateState === "sending") return;

    setGateState("sending");
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: email.split("@")[0],
          email,
          company: results.demographics.industry || "—",
          challenge: `quiz-${results.segment}`,
          website: "",
        }),
      });
    } catch {
      // Fire-and-forget — don't block the user
    }
    setGateState("unlocked");
  }

  return (
    <div className="min-h-[100dvh] bg-deep">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        {/* Score header */}
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

        {/* EMAIL GATE — Unlock detailed results */}
        {gateState !== "unlocked" ? (
          <div className="mb-16 border border-white/10 rounded-xl p-8 text-center">
            <h3 className="text-lg font-heading font-semibold text-surface mb-2">
              {"Recevez le rapport détaillé"}
            </h3>
            <p className="text-slate-400 text-sm mb-6 max-w-md mx-auto">
              {"Score par dimension, benchmarks sectoriels, et recommandations personnalisées — directement dans votre boîte mail."}
            </p>
            <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="votre@email.pro"
                required
                className="flex-1 bg-white/[0.03] border border-white/10 rounded-lg px-4 py-3 text-surface placeholder:text-slate-600 focus:outline-none focus:border-accent/40 focus:shadow-[0_0_0_3px_rgba(184,146,106,0.08)] transition-all text-sm"
              />
              <button
                type="submit"
                disabled={gateState === "sending"}
                className="bg-accent text-deep px-6 py-3 rounded-lg text-sm font-semibold hover:bg-accent-light transition-all duration-300 shadow-[var(--shadow-accent-md)] disabled:opacity-50 shrink-0"
                style={{ transitionTimingFunction: "var(--ease-spring)" }}
              >
                {gateState === "sending" ? "..." : "Débloquer"}
              </button>
            </form>
            <p className="text-slate-600 text-xs mt-3">
              {"Pas de spam. Résultats uniquement."}
            </p>
          </div>
        ) : (
          /* UNLOCKED — Detailed dimension breakdown with benchmarks */
          <div className="mb-16">
            <h3 className="text-xs font-medium uppercase tracking-[0.15em] text-slate-500 mb-6">
              {"Score détaillé par dimension"}
            </h3>

            <div className="space-y-6">
              {config.dimensions.map((dim) => {
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
                    <p className="text-slate-500 text-xs">
                      {t(dim.benchmarkKey)}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

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
            {"Recommencer"}
          </button>
        </div>
      </div>
    </div>
  );
}
