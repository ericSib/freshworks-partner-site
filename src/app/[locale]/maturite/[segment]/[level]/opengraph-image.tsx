/**
 * OG image — maturity diagnostic page (US-S20-3).
 *
 * Per-route share preview reflects the segment (ITSM/CX) and level so
 * social shares don't all look identical. Currently 2 routes: itsm-level-1
 * and cx-level-1 (D31 — extended cluster ESM + 2-5 = backlog Phase 2).
 */

import { ImageResponse } from "next/og";
import { OG_SIZE, OgTemplate } from "@/lib/og/template";

export const runtime = "edge";
export const alt = "Diagnostic de maturité service — What A Service";
export const size = OG_SIZE;
export const contentType = "image/png";

type LevelCopy = { title: string; subtitle: string; badge: string };

const COPY: Record<"fr" | "en", Record<string, LevelCopy>> = {
  fr: {
    "itsm-level-1": {
      title: "Maturité ITSM — Niveau 1",
      subtitle: "Mode pompier : voici comment passer au niveau supérieur",
      badge: "Diagnostic",
    },
    "cx-level-1": {
      title: "Maturité CX — Niveau 1",
      subtitle: "Réactivité limitée : voici comment passer au niveau supérieur",
      badge: "Diagnostic",
    },
  },
  en: {
    "itsm-level-1": {
      title: "ITSM Maturity — Level 1",
      subtitle: "Firefighting mode: here's how to reach the next level",
      badge: "Diagnosis",
    },
    "cx-level-1": {
      title: "CX Maturity — Level 1",
      subtitle: "Limited responsiveness: here's how to reach the next level",
      badge: "Diagnosis",
    },
  },
};

const FALLBACK_FR: LevelCopy = {
  title: "Diagnostic de maturité",
  subtitle: "Service Maturity Index — What A Service",
  badge: "Diagnostic",
};
const FALLBACK_EN: LevelCopy = {
  title: "Maturity diagnosis",
  subtitle: "Service Maturity Index — What A Service",
  badge: "Diagnosis",
};

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string; segment: string; level: string }>;
}) {
  const { locale, segment, level } = await params;
  const safeLocale = locale === "en" ? "en" : "fr";
  const key = `${segment}-${level}`;
  const copy =
    COPY[safeLocale][key] ?? (safeLocale === "en" ? FALLBACK_EN : FALLBACK_FR);

  return new ImageResponse(
    (
      <OgTemplate
        title={copy.title}
        subtitle={copy.subtitle}
        badge={copy.badge}
        locale={safeLocale}
      />
    ),
    { ...size }
  );
}
