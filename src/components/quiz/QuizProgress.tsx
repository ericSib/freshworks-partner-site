"use client";

type QuizProgressProps = {
  progress: number;
  dimensionLabel?: string;
};

export default function QuizProgress({
  progress,
  dimensionLabel,
}: QuizProgressProps) {
  const clampedProgress = Math.min(100, Math.max(0, progress));

  return (
    <div className="sticky top-0 z-40 w-full bg-deep/95 backdrop-blur-sm border-b border-white/5">
      {/* Progress bar track */}
      <div className="h-1 w-full bg-white/[0.06]">
        <div
          className="h-full bg-accent rounded-r-full"
          style={{
            width: `${clampedProgress}%`,
            transition: "width 300ms var(--ease-spring)",
          }}
          role="progressbar"
          aria-valuenow={clampedProgress}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={
            dimensionLabel
              ? `${dimensionLabel} - ${clampedProgress}%`
              : `Progress: ${clampedProgress}%`
          }
        />
      </div>

      {/* Dimension label */}
      {dimensionLabel && (
        <div className="max-w-3xl mx-auto px-4 py-2.5">
          <p className="font-body text-slate-400 text-xs tracking-wide">
            {dimensionLabel}
          </p>
        </div>
      )}
    </div>
  );
}
