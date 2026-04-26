/**
 * OG image template — shared composition for all `opengraph-image.tsx`
 * routes (US-S20-3).
 *
 * Renders the JSX consumed by Next.js 16 `ImageResponse` (Edge runtime).
 * Pure component — no hooks, no client state. Only inline styles
 * supported by `@vercel/og` (subset of CSS).
 *
 * Brand tokens kept inline because the Edge runtime cannot resolve
 * Tailwind classes — we duplicate the hex values from `tailwind.config.ts`.
 */

import * as React from "react";

/** LinkedIn / X / WhatsApp standard. */
export const OG_SIZE = { width: 1200, height: 630 } as const;

/** WaS brand tokens (mirror of tailwind.config.ts). */
const COLORS = {
  deep: "#0C1220",
  accent: "#B8926A",
  surface: "#FAFAF8",
  surfaceMuted: "rgba(250, 250, 248, 0.7)",
  border: "rgba(184, 146, 106, 0.25)",
} as const;

export type OgTemplateProps = {
  /** Main heading — typically the page H1 or marketing punchline. */
  title: string;
  /** Subline below the title — adds context (offer, product, persona). */
  subtitle: string;
  /** Optional pill above the title — useful for "Quiz gratuit", "Service", etc. */
  badge?: string;
  /** "fr" | "en" — drives the lang attribute and could drive copy variants. */
  locale: "fr" | "en";
};

export function OgTemplate({ title, subtitle, badge, locale }: OgTemplateProps) {
  return (
    <div
      lang={locale}
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: COLORS.deep,
        color: COLORS.surface,
        padding: "80px",
        fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
      }}
    >
      {/* Header — brand mark */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
        }}
      >
        <div
          style={{
            width: "56px",
            height: "56px",
            borderRadius: "12px",
            background: COLORS.accent,
            color: COLORS.deep,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "26px",
            fontWeight: 700,
            letterSpacing: "-0.02em",
          }}
        >
          W
        </div>
        <div
          style={{
            fontSize: "24px",
            fontWeight: 600,
            letterSpacing: "-0.01em",
          }}
        >
          What A Service
        </div>
      </div>

      {/* Main content — badge + title + subtitle */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "24px",
        }}
      >
        {badge && (
          <div
            style={{
              alignSelf: "flex-start",
              padding: "8px 16px",
              borderRadius: "999px",
              border: `1px solid ${COLORS.border}`,
              color: COLORS.accent,
              fontSize: "20px",
              fontWeight: 500,
              letterSpacing: "0.04em",
              textTransform: "uppercase",
            }}
          >
            {badge}
          </div>
        )}
        <div
          style={{
            fontSize: title.length > 60 ? "56px" : "72px",
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: "-0.025em",
            color: COLORS.surface,
            maxWidth: "1000px",
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontSize: "30px",
            fontWeight: 400,
            lineHeight: 1.3,
            color: COLORS.surfaceMuted,
            maxWidth: "900px",
          }}
        >
          {subtitle}
        </div>
      </div>

      {/* Footer — domain mark */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          color: COLORS.surfaceMuted,
          fontSize: "20px",
        }}
      >
        <div>freshworks.whataservice.fr</div>
        <div
          style={{
            display: "flex",
            gap: "20px",
            color: COLORS.accent,
          }}
        >
          ITIL 4 · PRINCE2 · DORA
        </div>
      </div>
    </div>
  );
}
