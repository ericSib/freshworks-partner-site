"use client";

type QuizOptionProps = {
  label: string;
  isSelected: boolean;
  onClick: () => void;
};

export default function QuizOption({
  label,
  isSelected,
  onClick,
}: QuizOptionProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={isSelected}
      className={[
        "w-full min-h-[44px] rounded-lg border px-4 py-3.5 text-left font-body text-[15px] leading-relaxed",
        "transition-all duration-300 active:scale-[0.99] cursor-pointer",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-deep",
        isSelected
          ? "border-accent bg-accent/10 text-surface"
          : "border-white/10 bg-white/[0.03] text-slate-300 hover:border-accent/30 hover:bg-white/[0.05]",
      ].join(" ")}
      style={{ transitionTimingFunction: "var(--ease-spring)" }}
    >
      <span className="flex items-start gap-3">
        {/* Checkmark indicator */}
        <span
          className={[
            "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-all duration-300",
            isSelected
              ? "border-accent bg-accent/20"
              : "border-white/15 bg-transparent",
          ].join(" ")}
          aria-hidden="true"
        >
          {isSelected && (
            <svg
              className="h-3 w-3 text-accent"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={3}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
              />
            </svg>
          )}
        </span>

        <span className="flex-1">{label}</span>
      </span>
    </button>
  );
}
