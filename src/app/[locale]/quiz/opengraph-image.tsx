/**
 * OG image — quiz / Service Maturity Index (US-S20-3).
 *
 * Before this fix, sharing /quiz on LinkedIn/X displayed the homepage
 * og-default.png — wrong signal, lost CTR. Now reflects the lead-magnet
 * branding ("Quiz gratuit" badge + SMI title).
 */

import { ImageResponse } from "next/og";
import { OG_SIZE, OgTemplate } from "@/lib/og/template";

export const runtime = "edge";
export const alt = "Service Maturity Index — Évaluez votre maturité IT";
export const size = OG_SIZE;
export const contentType = "image/png";

const COPY: Record<
  "fr" | "en",
  { title: string; subtitle: string; badge: string }
> = {
  fr: {
    title: "Service Maturity Index™",
    subtitle:
      "Évaluez votre maturité IT en 10 minutes — score, ROI estimé, offre recommandée",
    badge: "Quiz gratuit",
  },
  en: {
    title: "Service Maturity Index™",
    subtitle:
      "Assess your IT maturity in 10 minutes — score, ROI estimate, recommended offer",
    badge: "Free assessment",
  },
};

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const safeLocale = locale === "en" ? "en" : "fr";
  const copy = COPY[safeLocale];

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
