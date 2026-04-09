/**
 * CX/Customer Support Maturity Assessment configuration.
 *
 * Source: Blueprint spec — 8 dimensions, 10 scored questions, 5 maturity levels.
 * Dimensions 1 (Ticket & Case) has 2 questions (1A/1B); dimensions 2–8 have 1 each.
 * Weights sourced from Gartner CXM, Forrester 6 CXM, Zendesk/ESG, COPC, XM Institute.
 */

import type { QuizConfig } from "./types";

export const CX_CONFIG: QuizConfig = {
  segment: "cx",
  i18nNamespace: "quiz.cx",
  levelPageSlugPrefix: "cx-maturity-level",

  dimensions: [
    { id: "tickets",      nameKey: "quiz.cx.dim.tickets",      weight: 0.18, commercialAngleKey: "quiz.cx.commercial.tickets",      benchmarkKey: "quiz.cx.benchmark.tickets" },
    { id: "omnichannel",  nameKey: "quiz.cx.dim.omnichannel",  weight: 0.13, commercialAngleKey: "quiz.cx.commercial.omnichannel",  benchmarkKey: "quiz.cx.benchmark.omnichannel" },
    { id: "selfservice",  nameKey: "quiz.cx.dim.selfservice",  weight: 0.13, commercialAngleKey: "quiz.cx.commercial.selfservice",  benchmarkKey: "quiz.cx.benchmark.selfservice" },
    { id: "agents",       nameKey: "quiz.cx.dim.agents",       weight: 0.12, commercialAngleKey: "quiz.cx.commercial.agents",       benchmarkKey: "quiz.cx.benchmark.agents" },
    { id: "satisfaction",  nameKey: "quiz.cx.dim.satisfaction",  weight: 0.13, commercialAngleKey: "quiz.cx.commercial.satisfaction",  benchmarkKey: "quiz.cx.benchmark.satisfaction" },
    { id: "analytics",    nameKey: "quiz.cx.dim.analytics",    weight: 0.10, commercialAngleKey: "quiz.cx.commercial.analytics",    benchmarkKey: "quiz.cx.benchmark.analytics" },
    { id: "knowledge",    nameKey: "quiz.cx.dim.knowledge",    weight: 0.11, commercialAngleKey: "quiz.cx.commercial.knowledge",    benchmarkKey: "quiz.cx.benchmark.knowledge" },
    { id: "proactive",    nameKey: "quiz.cx.dim.proactive",    weight: 0.10, commercialAngleKey: "quiz.cx.commercial.proactive",    benchmarkKey: "quiz.cx.benchmark.proactive" },
  ],

  questions: [
    // Dimension 1: Ticket & Case Management (18%) — 2 questions
    {
      id: "cx-1a",
      questionKey: "quiz.cx.q.1a.text",
      dimensionId: "tickets",
      options: [
        { score: 1, labelKey: "quiz.cx.q.1a.opt1" },
        { score: 2, labelKey: "quiz.cx.q.1a.opt2" },
        { score: 3, labelKey: "quiz.cx.q.1a.opt3" },
        { score: 4, labelKey: "quiz.cx.q.1a.opt4" },
        { score: 5, labelKey: "quiz.cx.q.1a.opt5" },
      ],
    },
    {
      id: "cx-1b",
      questionKey: "quiz.cx.q.1b.text",
      dimensionId: "tickets",
      options: [
        { score: 1, labelKey: "quiz.cx.q.1b.opt1" },
        { score: 2, labelKey: "quiz.cx.q.1b.opt2" },
        { score: 3, labelKey: "quiz.cx.q.1b.opt3" },
        { score: 4, labelKey: "quiz.cx.q.1b.opt4" },
        { score: 5, labelKey: "quiz.cx.q.1b.opt5" },
      ],
    },
    // Dimension 2: Omnichannel Experience (13%) — 1 question
    {
      id: "cx-2a",
      questionKey: "quiz.cx.q.2a.text",
      dimensionId: "omnichannel",
      options: [
        { score: 1, labelKey: "quiz.cx.q.2a.opt1" },
        { score: 2, labelKey: "quiz.cx.q.2a.opt2" },
        { score: 3, labelKey: "quiz.cx.q.2a.opt3" },
        { score: 4, labelKey: "quiz.cx.q.2a.opt4" },
        { score: 5, labelKey: "quiz.cx.q.2a.opt5" },
      ],
    },
    // Dimension 3: Customer Self-Service (13%) — 1 question
    {
      id: "cx-3a",
      questionKey: "quiz.cx.q.3a.text",
      dimensionId: "selfservice",
      options: [
        { score: 1, labelKey: "quiz.cx.q.3a.opt1" },
        { score: 2, labelKey: "quiz.cx.q.3a.opt2" },
        { score: 3, labelKey: "quiz.cx.q.3a.opt3" },
        { score: 4, labelKey: "quiz.cx.q.3a.opt4" },
        { score: 5, labelKey: "quiz.cx.q.3a.opt5" },
      ],
    },
    // Dimension 4: Agent Productivity & Enablement (12%) — 1 question
    {
      id: "cx-4a",
      questionKey: "quiz.cx.q.4a.text",
      dimensionId: "agents",
      options: [
        { score: 1, labelKey: "quiz.cx.q.4a.opt1" },
        { score: 2, labelKey: "quiz.cx.q.4a.opt2" },
        { score: 3, labelKey: "quiz.cx.q.4a.opt3" },
        { score: 4, labelKey: "quiz.cx.q.4a.opt4" },
        { score: 5, labelKey: "quiz.cx.q.4a.opt5" },
      ],
    },
    // Dimension 5: Customer Satisfaction & Feedback (13%) — 1 question
    {
      id: "cx-5a",
      questionKey: "quiz.cx.q.5a.text",
      dimensionId: "satisfaction",
      options: [
        { score: 1, labelKey: "quiz.cx.q.5a.opt1" },
        { score: 2, labelKey: "quiz.cx.q.5a.opt2" },
        { score: 3, labelKey: "quiz.cx.q.5a.opt3" },
        { score: 4, labelKey: "quiz.cx.q.5a.opt4" },
        { score: 5, labelKey: "quiz.cx.q.5a.opt5" },
      ],
    },
    // Dimension 6: Support Analytics & AI Readiness (10%) — 1 question
    {
      id: "cx-6a",
      questionKey: "quiz.cx.q.6a.text",
      dimensionId: "analytics",
      options: [
        { score: 1, labelKey: "quiz.cx.q.6a.opt1" },
        { score: 2, labelKey: "quiz.cx.q.6a.opt2" },
        { score: 3, labelKey: "quiz.cx.q.6a.opt3" },
        { score: 4, labelKey: "quiz.cx.q.6a.opt4" },
        { score: 5, labelKey: "quiz.cx.q.6a.opt5" },
      ],
    },
    // Dimension 7: Knowledge Management for Support (11%) — 1 question
    {
      id: "cx-7a",
      questionKey: "quiz.cx.q.7a.text",
      dimensionId: "knowledge",
      options: [
        { score: 1, labelKey: "quiz.cx.q.7a.opt1" },
        { score: 2, labelKey: "quiz.cx.q.7a.opt2" },
        { score: 3, labelKey: "quiz.cx.q.7a.opt3" },
        { score: 4, labelKey: "quiz.cx.q.7a.opt4" },
        { score: 5, labelKey: "quiz.cx.q.7a.opt5" },
      ],
    },
    // Dimension 8: Proactive Support & Customer Success (10%) — 1 question
    {
      id: "cx-8a",
      questionKey: "quiz.cx.q.8a.text",
      dimensionId: "proactive",
      options: [
        { score: 1, labelKey: "quiz.cx.q.8a.opt1" },
        { score: 2, labelKey: "quiz.cx.q.8a.opt2" },
        { score: 3, labelKey: "quiz.cx.q.8a.opt3" },
        { score: 4, labelKey: "quiz.cx.q.8a.opt4" },
        { score: 5, labelKey: "quiz.cx.q.8a.opt5" },
      ],
    },
  ],

  levels: [
    { level: 1, labelKey: "quiz.cx.level.1.label", descriptionKey: "quiz.cx.level.1.desc", scoreRange: [0, 20],   ctaKey: "quiz.cx.level.1.cta", urgency: "critical" },
    { level: 2, labelKey: "quiz.cx.level.2.label", descriptionKey: "quiz.cx.level.2.desc", scoreRange: [21, 40],  ctaKey: "quiz.cx.level.2.cta", urgency: "high" },
    { level: 3, labelKey: "quiz.cx.level.3.label", descriptionKey: "quiz.cx.level.3.desc", scoreRange: [41, 60],  ctaKey: "quiz.cx.level.3.cta", urgency: "medium" },
    { level: 4, labelKey: "quiz.cx.level.4.label", descriptionKey: "quiz.cx.level.4.desc", scoreRange: [61, 80],  ctaKey: "quiz.cx.level.4.cta", urgency: "low" },
    { level: 5, labelKey: "quiz.cx.level.5.label", descriptionKey: "quiz.cx.level.5.desc", scoreRange: [81, 100], ctaKey: "quiz.cx.level.5.cta", urgency: "low" },
  ],
};
