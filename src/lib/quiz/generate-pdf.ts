/**
 * Quiz report PDF generator — client-side, using jsPDF.
 *
 * Reproduces the WaS letterhead (orange left band, logo, contact info)
 * and renders quiz results: score, dimensions bar chart, quick wins.
 *
 * Source: Entete_A4.pdf from charte graphique WaS.
 */

import jsPDF from "jspdf";
import type { QuizResults } from "@/hooks/useQuiz";
import type { QuizConfig } from "@/config/quiz";

// WaS brand colors
const ORANGE = "#f49962";
const NAVY = "#132338";
const ACCENT = "#B8926A";
const GRAY = "#64748B";
const LIGHT_GRAY = "#94A3B8";

// Page dimensions (A4 in mm)
const PAGE_W = 210;
const PAGE_H = 297;
const BAND_W = 40; // Orange left band width
const CONTENT_X = 52; // Content start (band + margin)
const CONTENT_W = PAGE_W - CONTENT_X - 15; // Content width

interface PdfOptions {
  results: QuizResults;
  config: QuizConfig;
  /** Translation function for dimension/level labels. */
  t: (key: string) => string;
  locale: "fr" | "en";
}

export function generateQuizPdf({
  results,
  config,
  t,
  locale,
}: PdfOptions): void {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

  // ─── Left orange band ───
  doc.setFillColor(ORANGE);
  doc.rect(0, 0, BAND_W, PAGE_H, "F");

  // ─── Logo circle (white circle with "WaS" text) ───
  const logoY = PAGE_H - 55;
  doc.setFillColor("#FFFFFF");
  doc.circle(BAND_W / 2, logoY, 10, "F");
  doc.setTextColor(ORANGE);
  doc.setFontSize(9);
  doc.setFont("helvetica", "bold");
  doc.text("WaS", BAND_W / 2, logoY + 1, { align: "center" });

  // ─── Name & role ───
  doc.setTextColor("#FFFFFF");
  doc.setFontSize(8);
  doc.setFont("helvetica", "bold");
  doc.text("ERIC SIBOMANA", BAND_W / 2, logoY + 16, { align: "center" });
  doc.setFont("helvetica", "normal");
  doc.setFontSize(6.5);
  doc.text("Consultant ITSM & CX", BAND_W / 2, logoY + 21, {
    align: "center",
  });

  // ─── Contact info ───
  const contactY = logoY + 28;
  doc.setFontSize(6);
  doc.text("+33 650 04 17 16", BAND_W / 2, contactY, { align: "center" });
  doc.text("contact@whataservice.fr", BAND_W / 2, contactY + 4, {
    align: "center",
  });
  doc.text("www.whataservice.fr", BAND_W / 2, contactY + 8, {
    align: "center",
  });

  // ─── Report title ───
  let y = 25;
  doc.setTextColor(NAVY);
  doc.setFontSize(20);
  doc.setFont("helvetica", "bold");
  const titleSegment = config.segment === "itsm" ? "ITSM" : "CX";
  const title =
    locale === "fr"
      ? `Score de Maturit\u00e9 ${titleSegment}`
      : `${titleSegment} Maturity Score`;
  doc.text(title, CONTENT_X, y);

  // ─── Subtitle ───
  y += 8;
  doc.setTextColor(GRAY);
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  const subtitle =
    locale === "fr"
      ? "Rapport personnalis\u00e9 — What A Service"
      : "Personalized Report — What A Service";
  doc.text(subtitle, CONTENT_X, y);

  // ─── Separator ───
  y += 6;
  doc.setDrawColor(ACCENT);
  doc.setLineWidth(0.5);
  doc.line(CONTENT_X, y, CONTENT_X + 40, y);

  // ─── Overall score ───
  y += 14;
  doc.setTextColor(NAVY);
  doc.setFontSize(36);
  doc.setFont("helvetica", "bold");
  doc.text(`${results.overallScore}`, CONTENT_X, y);
  doc.setFontSize(14);
  doc.setTextColor(LIGHT_GRAY);
  doc.text("/100", CONTENT_X + 28, y);

  // ─── Level badge ───
  y += 10;
  doc.setFontSize(11);
  doc.setTextColor(ACCENT);
  doc.setFont("helvetica", "bold");
  const levelLabel = t(results.maturityLevel.labelKey);
  doc.text(
    `Level ${results.maturityLevel.level} — ${levelLabel}`,
    CONTENT_X,
    y
  );

  // ─── Level description ───
  y += 7;
  doc.setTextColor(GRAY);
  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  const descLines = doc.splitTextToSize(
    t(results.maturityLevel.descriptionKey),
    CONTENT_W
  );
  doc.text(descLines, CONTENT_X, y);
  y += descLines.length * 4 + 6;

  // ─── Dimension scores (bar chart) ───
  doc.setTextColor(NAVY);
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  const dimTitle =
    locale === "fr" ? "Score par dimension" : "Score by dimension";
  doc.text(dimTitle, CONTENT_X, y);
  y += 8;

  for (const dim of config.dimensions) {
    const score = results.dimensionScores[dim.id] ?? 0;
    const pct = score / 5;
    const barMaxW = CONTENT_W - 30;

    // Dimension name
    doc.setTextColor(NAVY);
    doc.setFontSize(7.5);
    doc.setFont("helvetica", "normal");
    const dimName = t(dim.nameKey);
    doc.text(dimName, CONTENT_X, y);

    // Score value
    doc.setTextColor(ACCENT);
    doc.setFont("helvetica", "bold");
    doc.text(`${score.toFixed(1)}/5`, CONTENT_X + CONTENT_W - 5, y, {
      align: "right",
    });

    // Bar background
    y += 2;
    doc.setFillColor("#E8E6E1");
    doc.roundedRect(CONTENT_X, y, barMaxW, 3, 1.5, 1.5, "F");

    // Bar fill
    if (pct > 0) {
      doc.setFillColor(ACCENT);
      doc.roundedRect(CONTENT_X, y, barMaxW * pct, 3, 1.5, 1.5, "F");
    }

    // Benchmark text
    y += 5;
    doc.setTextColor(LIGHT_GRAY);
    doc.setFontSize(5.5);
    doc.setFont("helvetica", "italic");
    const benchText = t(dim.benchmarkKey);
    const benchLines = doc.splitTextToSize(benchText, CONTENT_W);
    doc.text(benchLines[0], CONTENT_X, y);
    y += 7;
  }

  // ─── Quick wins ───
  y += 3;
  if (y > PAGE_H - 60) {
    doc.addPage();
    y = 25;
  }

  doc.setTextColor(NAVY);
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  const qwTitle =
    locale === "fr"
      ? "Axes d'am\u00e9lioration prioritaires"
      : "Priority improvement areas";
  doc.text(qwTitle, CONTENT_X, y);
  y += 8;

  for (let i = 0; i < results.weakestDimensions.length; i++) {
    const dim = results.weakestDimensions[i];
    if (y > PAGE_H - 30) {
      doc.addPage();
      y = 25;
    }

    // Number circle
    doc.setFillColor(ACCENT);
    doc.circle(CONTENT_X + 4, y - 1, 3.5, "F");
    doc.setTextColor("#FFFFFF");
    doc.setFontSize(7);
    doc.setFont("helvetica", "bold");
    doc.text(`${i + 1}`, CONTENT_X + 4, y, { align: "center" });

    // Dimension name + score
    doc.setTextColor(NAVY);
    doc.setFontSize(8);
    doc.setFont("helvetica", "bold");
    doc.text(
      `${t(dim.nameKey)} — ${dim.score.toFixed(1)}/5`,
      CONTENT_X + 12,
      y
    );

    // Commercial angle
    y += 5;
    doc.setTextColor(GRAY);
    doc.setFontSize(7);
    doc.setFont("helvetica", "normal");
    const angleLines = doc.splitTextToSize(
      t(dim.commercialAngleKey),
      CONTENT_W - 12
    );
    doc.text(angleLines, CONTENT_X + 12, y);
    y += angleLines.length * 3.5 + 6;
  }

  // ─── CTA footer ───
  y += 5;
  if (y > PAGE_H - 25) {
    doc.addPage();
    y = 25;
  }
  doc.setDrawColor(ACCENT);
  doc.setLineWidth(0.3);
  doc.line(CONTENT_X, y, CONTENT_X + CONTENT_W, y);
  y += 8;

  doc.setTextColor(ACCENT);
  doc.setFontSize(9);
  doc.setFont("helvetica", "bold");
  const ctaText =
    locale === "fr"
      ? "R\u00e9servez votre consultation gratuite"
      : "Book your free consultation";
  doc.text(ctaText, CONTENT_X, y);
  y += 5;
  doc.setTextColor(GRAY);
  doc.setFontSize(7);
  doc.setFont("helvetica", "normal");
  doc.text("https://calendly.com/whataservice/demo", CONTENT_X, y);

  // ─── Save ───
  const filename = `WaS-${titleSegment}-Maturity-Score.pdf`;
  doc.save(filename);
}
