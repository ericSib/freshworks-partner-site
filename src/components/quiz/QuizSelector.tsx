"use client";

import { useTranslations } from "next-intl";
import type { QuizSegment } from "@/config/quiz";

interface QuizSelectorProps {
  onSelect: (segment: QuizSegment) => void;
}

/**
 * Landing screen where the visitor chooses their assessment track:
 * ITSM (Freshservice) or CX (Freshdesk).
 *
 * Displayed before demographics — this is the first screen of the quiz flow.
 */
export default function QuizSelector({ onSelect }: QuizSelectorProps) {
  const t = useTranslations("quiz");

  return (
    <div className="min-h-[100dvh] bg-deep flex items-center">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        {/* Tagline */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-[1px] bg-accent" />
          <p className="text-accent text-sm font-medium tracking-widest uppercase font-heading">
            {t("selector.tagline")}
          </p>
        </div>

        {/* Headline */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-surface leading-[1.08] tracking-tight font-heading mb-4">
          {t("selector.headline")}
        </h1>

        {/* Subheadline */}
        <p className="text-lg text-slate-400 leading-relaxed mb-12 max-w-xl">
          {t("selector.subheadline")}
        </p>

        {/* Three track cards (ITSM, CX, ESM) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* ITSM card */}
          <button
            type="button"
            onClick={() => onSelect("itsm")}
            className="group relative border border-white/10 rounded-xl p-8 text-left hover:border-accent/40 hover:bg-white/[0.02] transition-all duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-deep"
            style={{ transitionTimingFunction: "var(--ease-spring)" }}
          >
            {/* Icon */}
            <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-5 group-hover:bg-accent/20 transition-colors duration-500">
              <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3m3 3a3 3 0 100 6h13.5a3 3 0 100-6m-16.5-3a3 3 0 013-3h13.5a3 3 0 013 3m-19.5 0a4.5 4.5 0 01.9-2.7L5.737 5.1a3.375 3.375 0 012.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 01.9 2.7m0 0a3 3 0 01-3 3m0 3h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008zm-3 6h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008z" />
              </svg>
            </div>

            <h2 className="text-xl font-heading font-semibold text-surface mb-2 tracking-tight">
              {t("selector.itsm.title")}
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              {t("selector.itsm.description")}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {["Freshservice", "ITSM", "ITAM", "ESM"].map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] px-2.5 py-1 border border-white/8 rounded text-slate-400"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* CTA arrow */}
            <div className="flex items-center gap-2 text-accent text-sm font-medium">
              {t("selector.start")}
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </div>
          </button>

          {/* CX card */}
          <button
            type="button"
            onClick={() => onSelect("cx")}
            className="group relative border border-white/10 rounded-xl p-8 text-left hover:border-accent/40 hover:bg-white/[0.02] transition-all duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-deep"
            style={{ transitionTimingFunction: "var(--ease-spring)" }}
          >
            {/* Icon */}
            <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-5 group-hover:bg-accent/20 transition-colors duration-500">
              <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
              </svg>
            </div>

            <h2 className="text-xl font-heading font-semibold text-surface mb-2 tracking-tight">
              {t("selector.cx.title")}
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              {t("selector.cx.description")}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {["Freshdesk", "Support", "CX", "Omnicanal"].map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] px-2.5 py-1 border border-white/8 rounded text-slate-400"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* CTA arrow */}
            <div className="flex items-center gap-2 text-accent text-sm font-medium">
              {t("selector.start")}
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </div>
          </button>

          {/* ESM card */}
          <button
            type="button"
            onClick={() => onSelect("esm")}
            className="group relative border border-white/10 rounded-xl p-8 text-left hover:border-accent/40 hover:bg-white/[0.02] transition-all duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-deep"
            style={{ transitionTimingFunction: "var(--ease-spring)" }}
          >
            {/* Icon */}
            <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-5 group-hover:bg-accent/20 transition-colors duration-500">
              <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
              </svg>
            </div>

            <h2 className="text-xl font-heading font-semibold text-surface mb-2 tracking-tight">
              {t("selector.esm.title")}
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              {t("selector.esm.description")}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {["Freshservice", "RH", "Onboarding", "Multi-département"].map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] px-2.5 py-1 border border-white/8 rounded text-slate-400"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* CTA arrow */}
            <div className="flex items-center gap-2 text-accent text-sm font-medium">
              {t("selector.start")}
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </div>
          </button>
        </div>

        {/* Time estimate */}
        <p className="text-slate-400 text-xs text-center mt-8">
          {t("selector.timeEstimate")}
        </p>
      </div>
    </div>
  );
}
