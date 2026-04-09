/**
 * ITSM Maturity Assessment configuration.
 *
 * Source: Blueprint spec — 8 dimensions, 10 scored questions, 5 maturity levels.
 * Dimensions 1 & 2 have 2 questions each (1A/1B, 2A); dimensions 3–8 have 1 each.
 * Weights sourced from ITIL 4, CMMI-SVC, Gartner I&O ITScore, OTRS 5-dimension model.
 */

import type { QuizConfig } from "./types";

export const ITSM_CONFIG: QuizConfig = {
  segment: "itsm",
  i18nNamespace: "quiz.itsm",
  levelPageSlugPrefix: "itsm-maturity-level",

  dimensions: [
    { id: "incident",    nameKey: "quiz.itsm.dim.incident",    weight: 0.20, commercialAngleKey: "quiz.itsm.commercial.incident",    benchmarkKey: "quiz.itsm.benchmark.incident" },
    { id: "change",      nameKey: "quiz.itsm.dim.change",      weight: 0.15, commercialAngleKey: "quiz.itsm.commercial.change",      benchmarkKey: "quiz.itsm.benchmark.change" },
    { id: "knowledge",   nameKey: "quiz.itsm.dim.knowledge",   weight: 0.12, commercialAngleKey: "quiz.itsm.commercial.knowledge",   benchmarkKey: "quiz.itsm.benchmark.knowledge" },
    { id: "automation",  nameKey: "quiz.itsm.dim.automation",  weight: 0.13, commercialAngleKey: "quiz.itsm.commercial.automation",  benchmarkKey: "quiz.itsm.benchmark.automation" },
    { id: "assets",      nameKey: "quiz.itsm.dim.assets",      weight: 0.10, commercialAngleKey: "quiz.itsm.commercial.assets",      benchmarkKey: "quiz.itsm.benchmark.assets" },
    { id: "analytics",   nameKey: "quiz.itsm.dim.analytics",   weight: 0.10, commercialAngleKey: "quiz.itsm.commercial.analytics",   benchmarkKey: "quiz.itsm.benchmark.analytics" },
    { id: "catalog",     nameKey: "quiz.itsm.dim.catalog",     weight: 0.10, commercialAngleKey: "quiz.itsm.commercial.catalog",     benchmarkKey: "quiz.itsm.benchmark.catalog" },
    { id: "governance",  nameKey: "quiz.itsm.dim.governance",  weight: 0.10, commercialAngleKey: "quiz.itsm.commercial.governance",  benchmarkKey: "quiz.itsm.benchmark.governance" },
  ],

  questions: [
    // Dimension 1: Incident & Request Management (20%) — 2 questions
    {
      id: "itsm-1a",
      questionKey: "quiz.itsm.q.1a",
      dimensionId: "incident",
      options: [
        { score: 1, labelKey: "quiz.itsm.q.1a.opt1" },
        { score: 2, labelKey: "quiz.itsm.q.1a.opt2" },
        { score: 3, labelKey: "quiz.itsm.q.1a.opt3" },
        { score: 4, labelKey: "quiz.itsm.q.1a.opt4" },
        { score: 5, labelKey: "quiz.itsm.q.1a.opt5" },
      ],
    },
    {
      id: "itsm-1b",
      questionKey: "quiz.itsm.q.1b",
      dimensionId: "incident",
      options: [
        { score: 1, labelKey: "quiz.itsm.q.1b.opt1" },
        { score: 2, labelKey: "quiz.itsm.q.1b.opt2" },
        { score: 3, labelKey: "quiz.itsm.q.1b.opt3" },
        { score: 4, labelKey: "quiz.itsm.q.1b.opt4" },
        { score: 5, labelKey: "quiz.itsm.q.1b.opt5" },
      ],
    },
    // Dimension 2: Change & Problem Management (15%) — 1 question
    {
      id: "itsm-2a",
      questionKey: "quiz.itsm.q.2a",
      dimensionId: "change",
      options: [
        { score: 1, labelKey: "quiz.itsm.q.2a.opt1" },
        { score: 2, labelKey: "quiz.itsm.q.2a.opt2" },
        { score: 3, labelKey: "quiz.itsm.q.2a.opt3" },
        { score: 4, labelKey: "quiz.itsm.q.2a.opt4" },
        { score: 5, labelKey: "quiz.itsm.q.2a.opt5" },
      ],
    },
    // Dimension 3: Knowledge Management & Self-Service (12%) — 1 question
    {
      id: "itsm-3a",
      questionKey: "quiz.itsm.q.3a",
      dimensionId: "knowledge",
      options: [
        { score: 1, labelKey: "quiz.itsm.q.3a.opt1" },
        { score: 2, labelKey: "quiz.itsm.q.3a.opt2" },
        { score: 3, labelKey: "quiz.itsm.q.3a.opt3" },
        { score: 4, labelKey: "quiz.itsm.q.3a.opt4" },
        { score: 5, labelKey: "quiz.itsm.q.3a.opt5" },
      ],
    },
    // Dimension 4: Automation & Workflow Orchestration (13%) — 1 question
    {
      id: "itsm-4a",
      questionKey: "quiz.itsm.q.4a",
      dimensionId: "automation",
      options: [
        { score: 1, labelKey: "quiz.itsm.q.4a.opt1" },
        { score: 2, labelKey: "quiz.itsm.q.4a.opt2" },
        { score: 3, labelKey: "quiz.itsm.q.4a.opt3" },
        { score: 4, labelKey: "quiz.itsm.q.4a.opt4" },
        { score: 5, labelKey: "quiz.itsm.q.4a.opt5" },
      ],
    },
    // Dimension 5: Asset Management & CMDB (10%) — 1 question
    {
      id: "itsm-5a",
      questionKey: "quiz.itsm.q.5a",
      dimensionId: "assets",
      options: [
        { score: 1, labelKey: "quiz.itsm.q.5a.opt1" },
        { score: 2, labelKey: "quiz.itsm.q.5a.opt2" },
        { score: 3, labelKey: "quiz.itsm.q.5a.opt3" },
        { score: 4, labelKey: "quiz.itsm.q.5a.opt4" },
        { score: 5, labelKey: "quiz.itsm.q.5a.opt5" },
      ],
    },
    // Dimension 6: Reporting, Analytics & AI Readiness (10%) — 1 question
    {
      id: "itsm-6a",
      questionKey: "quiz.itsm.q.6a",
      dimensionId: "analytics",
      options: [
        { score: 1, labelKey: "quiz.itsm.q.6a.opt1" },
        { score: 2, labelKey: "quiz.itsm.q.6a.opt2" },
        { score: 3, labelKey: "quiz.itsm.q.6a.opt3" },
        { score: 4, labelKey: "quiz.itsm.q.6a.opt4" },
        { score: 5, labelKey: "quiz.itsm.q.6a.opt5" },
      ],
    },
    // Dimension 7: Service Catalog & Request Fulfillment (10%) — 1 question
    {
      id: "itsm-7a",
      questionKey: "quiz.itsm.q.7a",
      dimensionId: "catalog",
      options: [
        { score: 1, labelKey: "quiz.itsm.q.7a.opt1" },
        { score: 2, labelKey: "quiz.itsm.q.7a.opt2" },
        { score: 3, labelKey: "quiz.itsm.q.7a.opt3" },
        { score: 4, labelKey: "quiz.itsm.q.7a.opt4" },
        { score: 5, labelKey: "quiz.itsm.q.7a.opt5" },
      ],
    },
    // Dimension 8: IT Governance & Continual Improvement (10%) — 1 question
    {
      id: "itsm-8a",
      questionKey: "quiz.itsm.q.8a",
      dimensionId: "governance",
      options: [
        { score: 1, labelKey: "quiz.itsm.q.8a.opt1" },
        { score: 2, labelKey: "quiz.itsm.q.8a.opt2" },
        { score: 3, labelKey: "quiz.itsm.q.8a.opt3" },
        { score: 4, labelKey: "quiz.itsm.q.8a.opt4" },
        { score: 5, labelKey: "quiz.itsm.q.8a.opt5" },
      ],
    },
  ],

  levels: [
    { level: 1, labelKey: "quiz.itsm.level.1.label", descriptionKey: "quiz.itsm.level.1.desc", scoreRange: [0, 20],   ctaKey: "quiz.itsm.level.1.cta", urgency: "critical" },
    { level: 2, labelKey: "quiz.itsm.level.2.label", descriptionKey: "quiz.itsm.level.2.desc", scoreRange: [21, 40],  ctaKey: "quiz.itsm.level.2.cta", urgency: "high" },
    { level: 3, labelKey: "quiz.itsm.level.3.label", descriptionKey: "quiz.itsm.level.3.desc", scoreRange: [41, 60],  ctaKey: "quiz.itsm.level.3.cta", urgency: "medium" },
    { level: 4, labelKey: "quiz.itsm.level.4.label", descriptionKey: "quiz.itsm.level.4.desc", scoreRange: [61, 80],  ctaKey: "quiz.itsm.level.4.cta", urgency: "low" },
    { level: 5, labelKey: "quiz.itsm.level.5.label", descriptionKey: "quiz.itsm.level.5.desc", scoreRange: [81, 100], ctaKey: "quiz.itsm.level.5.cta", urgency: "low" },
  ],
};
