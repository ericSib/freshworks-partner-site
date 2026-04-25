/**
 * ESM (Employee Service Management) Maturity Assessment configuration.
 *
 * Source: D20 (PO arbitration 25/04/2026) — 5 dimensions @ 20% each,
 * 9 scored questions, 5 maturity levels.
 * Level nomenclature aligned with ITSM (Firefighting / Reactive / Managed /
 * Strategic / Optimized) for cross-segment narrative coherence.
 *
 * Persona: Nadia (DRH / Lead ESM, D17). Vocabulary intentionally HR/services
 * partagés / multi-département rather than IT-only.
 */

import type { QuizConfig } from "./types";

export const ESM_CONFIG: QuizConfig = {
  segment: "esm",
  i18nNamespace: "quiz.esm",
  levelPageSlugPrefix: "esm-maturity-level",

  dimensions: [
    { id: "experience", nameKey: "quiz.esm.dim.experience", weight: 0.2, commercialAngleKey: "quiz.esm.commercial.experience", benchmarkKey: "quiz.esm.benchmark.experience" },
    { id: "incident",   nameKey: "quiz.esm.dim.incident",   weight: 0.2, commercialAngleKey: "quiz.esm.commercial.incident",   benchmarkKey: "quiz.esm.benchmark.incident" },
    { id: "automation", nameKey: "quiz.esm.dim.automation", weight: 0.2, commercialAngleKey: "quiz.esm.commercial.automation", benchmarkKey: "quiz.esm.benchmark.automation" },
    { id: "governance", nameKey: "quiz.esm.dim.governance", weight: 0.2, commercialAngleKey: "quiz.esm.commercial.governance", benchmarkKey: "quiz.esm.benchmark.governance" },
    { id: "analytics",  nameKey: "quiz.esm.dim.analytics",  weight: 0.2, commercialAngleKey: "quiz.esm.commercial.analytics",  benchmarkKey: "quiz.esm.benchmark.analytics" },
  ],

  questions: [
    // Dimension 1: Employee Experience & Service Design (20%) — 2 questions
    {
      id: "esm-1a",
      questionKey: "quiz.esm.q.1a.text",
      dimensionId: "experience",
      options: [
        { score: 1, labelKey: "quiz.esm.q.1a.opt1" },
        { score: 2, labelKey: "quiz.esm.q.1a.opt2" },
        { score: 3, labelKey: "quiz.esm.q.1a.opt3" },
        { score: 4, labelKey: "quiz.esm.q.1a.opt4" },
        { score: 5, labelKey: "quiz.esm.q.1a.opt5" },
      ],
    },
    {
      id: "esm-1b",
      questionKey: "quiz.esm.q.1b.text",
      dimensionId: "experience",
      options: [
        { score: 1, labelKey: "quiz.esm.q.1b.opt1" },
        { score: 2, labelKey: "quiz.esm.q.1b.opt2" },
        { score: 3, labelKey: "quiz.esm.q.1b.opt3" },
        { score: 4, labelKey: "quiz.esm.q.1b.opt4" },
        { score: 5, labelKey: "quiz.esm.q.1b.opt5" },
      ],
    },
    // Dimension 2: Incident & Request Management ESM (20%) — 2 questions
    {
      id: "esm-2a",
      questionKey: "quiz.esm.q.2a.text",
      dimensionId: "incident",
      options: [
        { score: 1, labelKey: "quiz.esm.q.2a.opt1" },
        { score: 2, labelKey: "quiz.esm.q.2a.opt2" },
        { score: 3, labelKey: "quiz.esm.q.2a.opt3" },
        { score: 4, labelKey: "quiz.esm.q.2a.opt4" },
        { score: 5, labelKey: "quiz.esm.q.2a.opt5" },
      ],
    },
    {
      id: "esm-2b",
      questionKey: "quiz.esm.q.2b.text",
      dimensionId: "incident",
      options: [
        { score: 1, labelKey: "quiz.esm.q.2b.opt1" },
        { score: 2, labelKey: "quiz.esm.q.2b.opt2" },
        { score: 3, labelKey: "quiz.esm.q.2b.opt3" },
        { score: 4, labelKey: "quiz.esm.q.2b.opt4" },
        { score: 5, labelKey: "quiz.esm.q.2b.opt5" },
      ],
    },
    // Dimension 3: Automation multi-département (20%) — 2 questions
    {
      id: "esm-3a",
      questionKey: "quiz.esm.q.3a.text",
      dimensionId: "automation",
      options: [
        { score: 1, labelKey: "quiz.esm.q.3a.opt1" },
        { score: 2, labelKey: "quiz.esm.q.3a.opt2" },
        { score: 3, labelKey: "quiz.esm.q.3a.opt3" },
        { score: 4, labelKey: "quiz.esm.q.3a.opt4" },
        { score: 5, labelKey: "quiz.esm.q.3a.opt5" },
      ],
    },
    {
      id: "esm-3b",
      questionKey: "quiz.esm.q.3b.text",
      dimensionId: "automation",
      options: [
        { score: 1, labelKey: "quiz.esm.q.3b.opt1" },
        { score: 2, labelKey: "quiz.esm.q.3b.opt2" },
        { score: 3, labelKey: "quiz.esm.q.3b.opt3" },
        { score: 4, labelKey: "quiz.esm.q.3b.opt4" },
        { score: 5, labelKey: "quiz.esm.q.3b.opt5" },
      ],
    },
    // Dimension 4: Gouvernance & conformité (20%) — 1 question
    {
      id: "esm-4a",
      questionKey: "quiz.esm.q.4a.text",
      dimensionId: "governance",
      options: [
        { score: 1, labelKey: "quiz.esm.q.4a.opt1" },
        { score: 2, labelKey: "quiz.esm.q.4a.opt2" },
        { score: 3, labelKey: "quiz.esm.q.4a.opt3" },
        { score: 4, labelKey: "quiz.esm.q.4a.opt4" },
        { score: 5, labelKey: "quiz.esm.q.4a.opt5" },
      ],
    },
    // Dimension 5: Analytics & satisfaction employé (20%) — 2 questions
    {
      id: "esm-5a",
      questionKey: "quiz.esm.q.5a.text",
      dimensionId: "analytics",
      options: [
        { score: 1, labelKey: "quiz.esm.q.5a.opt1" },
        { score: 2, labelKey: "quiz.esm.q.5a.opt2" },
        { score: 3, labelKey: "quiz.esm.q.5a.opt3" },
        { score: 4, labelKey: "quiz.esm.q.5a.opt4" },
        { score: 5, labelKey: "quiz.esm.q.5a.opt5" },
      ],
    },
    {
      id: "esm-5b",
      questionKey: "quiz.esm.q.5b.text",
      dimensionId: "analytics",
      options: [
        { score: 1, labelKey: "quiz.esm.q.5b.opt1" },
        { score: 2, labelKey: "quiz.esm.q.5b.opt2" },
        { score: 3, labelKey: "quiz.esm.q.5b.opt3" },
        { score: 4, labelKey: "quiz.esm.q.5b.opt4" },
        { score: 5, labelKey: "quiz.esm.q.5b.opt5" },
      ],
    },
  ],

  levels: [
    { level: 1, labelKey: "quiz.esm.level.1.label", descriptionKey: "quiz.esm.level.1.desc", scoreRange: [0, 20],   ctaKey: "quiz.esm.level.1.cta", urgency: "critical" },
    { level: 2, labelKey: "quiz.esm.level.2.label", descriptionKey: "quiz.esm.level.2.desc", scoreRange: [21, 40],  ctaKey: "quiz.esm.level.2.cta", urgency: "high" },
    { level: 3, labelKey: "quiz.esm.level.3.label", descriptionKey: "quiz.esm.level.3.desc", scoreRange: [41, 60],  ctaKey: "quiz.esm.level.3.cta", urgency: "medium" },
    { level: 4, labelKey: "quiz.esm.level.4.label", descriptionKey: "quiz.esm.level.4.desc", scoreRange: [61, 80],  ctaKey: "quiz.esm.level.4.cta", urgency: "low" },
    { level: 5, labelKey: "quiz.esm.level.5.label", descriptionKey: "quiz.esm.level.5.desc", scoreRange: [81, 100], ctaKey: "quiz.esm.level.5.cta", urgency: "low" },
  ],
};
