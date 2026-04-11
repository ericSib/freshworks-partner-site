"use client";

export type QuizEmailGateState = "locked" | "sending" | "unlocked";

interface QuizEmailGateProps {
  email: string;
  onEmailChange: (value: string) => void;
  gateState: QuizEmailGateState;
  onSubmit: (e: React.FormEvent) => void | Promise<void>;
  /** next-intl translator from the parent (top-level namespace). */
  t: (key: string) => string;
}

/**
 * Email gate card shown between the free and gated results.
 *
 * Fully controlled — the parent owns `email` and `gateState`. This
 * component only renders the card + form and delegates state changes
 * via `onEmailChange` and `onSubmit`.
 *
 * Extracted from QuizResultsPreview (US-21.7, Sprint 14).
 */
export default function QuizEmailGate({
  email,
  onEmailChange,
  gateState,
  onSubmit,
  t,
}: QuizEmailGateProps) {
  return (
    <div className="mb-16 border border-white/10 rounded-xl p-8 text-center">
      <h3 className="text-lg font-heading font-semibold text-surface mb-2">
        {t("quiz.results.gateTitle")}
      </h3>
      <p className="text-slate-400 text-sm mb-6 max-w-md mx-auto">
        {t("quiz.results.gateSubtitle")}
      </p>
      <form
        onSubmit={onSubmit}
        className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
      >
        <input
          type="email"
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          placeholder={t("quiz.results.gatePlaceholder")}
          required
          className="flex-1 bg-white/[0.03] border border-white/10 rounded-lg px-4 py-3 text-surface placeholder:text-slate-600 focus:outline-none focus:border-accent/40 focus:shadow-[0_0_0_3px_rgba(184,146,106,0.08)] transition-all text-sm"
        />
        <button
          type="submit"
          disabled={gateState === "sending"}
          className="bg-accent text-deep px-6 py-3 rounded-lg text-sm font-semibold hover:bg-accent-light transition-all duration-300 shadow-[var(--shadow-accent-md)] disabled:opacity-50 shrink-0"
          style={{ transitionTimingFunction: "var(--ease-spring)" }}
        >
          {gateState === "sending" ? "..." : t("quiz.results.gateUnlock")}
        </button>
      </form>
      <p className="text-slate-400 text-xs mt-3">
        {t("quiz.results.gateDisclaimer")}
      </p>
    </div>
  );
}
