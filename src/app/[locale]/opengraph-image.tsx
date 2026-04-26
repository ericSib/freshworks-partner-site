/**
 * OG image — homepage (US-S20-3).
 *
 * Replaces the static /images/og-default.png with a dynamic Edge-rendered
 * PNG so the share preview reflects the page content (vs the same image
 * leaking on every route).
 */

import { ImageResponse } from "next/og";
import { OG_SIZE, OgTemplate } from "@/lib/og/template";

export const runtime = "edge";
export const alt = "What A Service — Freshworks Consulting Partner";
export const size = OG_SIZE;
export const contentType = "image/png";

const COPY: Record<"fr" | "en", { title: string; subtitle: string }> = {
  fr: {
    title: "Conseil Freshworks France",
    subtitle:
      "Freshservice (ITSM, ESM) & Freshdesk (CX) — déploiement, migration, optimisation",
  },
  en: {
    title: "Freshworks Consulting",
    subtitle:
      "Freshservice (ITSM, ESM) & Freshdesk (CX) — deployment, migration, optimization",
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
        locale={safeLocale}
      />
    ),
    { ...size }
  );
}
