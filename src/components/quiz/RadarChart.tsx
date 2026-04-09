"use client";

import type { QuizDimension } from "@/config/quiz";

interface RadarChartProps {
  /** Dimension scores (1-5 scale). */
  scores: Record<string, number>;
  /** Dimensions in order (determines polygon vertex positions). */
  dimensions: QuizDimension[];
  /** Translated dimension labels. */
  labels: string[];
  /** Size in pixels. */
  size?: number;
}

/**
 * Pure SVG radar/spider chart for quiz results.
 *
 * No external dependencies — renders a polygon on a radial grid.
 * 8 dimensions positioned evenly around a circle.
 */
export default function RadarChart({
  scores,
  dimensions,
  labels,
  size = 320,
}: RadarChartProps) {
  const cx = size / 2;
  const cy = size / 2;
  const maxRadius = size * 0.38;
  const labelRadius = size * 0.48;
  const numAxes = dimensions.length;
  const angleStep = (2 * Math.PI) / numAxes;
  // Start from top (-π/2) so first dimension is at 12 o'clock
  const startAngle = -Math.PI / 2;

  /** Get (x, y) for a given axis index and radius. */
  function polarToXY(index: number, radius: number) {
    const angle = startAngle + index * angleStep;
    return {
      x: cx + radius * Math.cos(angle),
      y: cy + radius * Math.sin(angle),
    };
  }

  // Grid rings at 1, 2, 3, 4, 5 (20%, 40%, 60%, 80%, 100%)
  const rings = [1, 2, 3, 4, 5];

  // Data polygon points
  const dataPoints = dimensions.map((dim, i) => {
    const score = scores[dim.id] ?? 0;
    const r = (score / 5) * maxRadius;
    return polarToXY(i, r);
  });
  const dataPolygon = dataPoints.map((p) => `${p.x},${p.y}`).join(" ");

  return (
    <div className="flex justify-center">
      <svg
        viewBox={`0 0 ${size} ${size}`}
        width={size}
        height={size}
        className="max-w-full h-auto"
        role="img"
        aria-label="Radar chart showing maturity scores across dimensions"
      >
        {/* Grid rings */}
        {rings.map((ring) => {
          const r = (ring / 5) * maxRadius;
          const points = Array.from({ length: numAxes }, (_, i) => {
            const p = polarToXY(i, r);
            return `${p.x},${p.y}`;
          }).join(" ");
          return (
            <polygon
              key={ring}
              points={points}
              fill="none"
              stroke="rgba(255,255,255,0.06)"
              strokeWidth={1}
            />
          );
        })}

        {/* Axis lines */}
        {dimensions.map((_, i) => {
          const end = polarToXY(i, maxRadius);
          return (
            <line
              key={i}
              x1={cx}
              y1={cy}
              x2={end.x}
              y2={end.y}
              stroke="rgba(255,255,255,0.08)"
              strokeWidth={1}
            />
          );
        })}

        {/* Data polygon — filled area */}
        <polygon
          points={dataPolygon}
          fill="rgba(184, 146, 106, 0.15)"
          stroke="#B8926A"
          strokeWidth={2}
          strokeLinejoin="round"
        />

        {/* Data points */}
        {dataPoints.map((p, i) => (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r={4}
            fill="#B8926A"
            stroke="#0C1220"
            strokeWidth={2}
          />
        ))}

        {/* Dimension labels */}
        {labels.map((label, i) => {
          const p = polarToXY(i, labelRadius);
          const angle = startAngle + i * angleStep;
          // Text anchor: left for right side, right for left side, middle for top/bottom
          const isRight = Math.cos(angle) > 0.1;
          const isLeft = Math.cos(angle) < -0.1;
          const anchor = isRight ? "start" : isLeft ? "end" : "middle";

          return (
            <text
              key={i}
              x={p.x}
              y={p.y}
              textAnchor={anchor}
              dominantBaseline="central"
              fill="#94A3B8"
              fontSize={9}
              fontFamily="var(--font-body)"
            >
              {label.length > 18 ? label.slice(0, 16) + "…" : label}
            </text>
          );
        })}
      </svg>
    </div>
  );
}
