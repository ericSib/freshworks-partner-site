/**
 * Quiz configuration types — shared between ITSM and CX assessments.
 *
 * Architecture: the quiz engine is data-driven. All questions, dimensions,
 * weights, and recommendations live in typed config objects. Components
 * iterate over configs; they never hard-code content.
 */

/** Identifies which assessment track the user is taking. */
export type QuizSegment = "itsm" | "cx";

/** A single answer option with descriptive text (blueprint: "descriptive choice"). */
export interface QuizOption {
  /** Score value 1–5 (never shown to user). */
  score: 1 | 2 | 3 | 4 | 5;
  /** i18n key for the descriptive text (3–5 lines). */
  labelKey: string;
}

/** A scored question belonging to a dimension. */
export interface QuizQuestion {
  /** Unique identifier (e.g. "itsm-1a", "cx-3a"). */
  id: string;
  /** i18n key for the question text. */
  questionKey: string;
  /** The dimension this question scores. */
  dimensionId: string;
  /** 5 descriptive-choice options, one per maturity level. */
  options: [QuizOption, QuizOption, QuizOption, QuizOption, QuizOption];
}

/** A maturity dimension with weight and metadata. */
export interface QuizDimension {
  /** Unique identifier (e.g. "incident", "omnichannel"). */
  id: string;
  /** i18n key for dimension display name. */
  nameKey: string;
  /** Weight as a decimal (0.10 = 10%). All weights must sum to 1.0. */
  weight: number;
  /** i18n key for commercial angle (shown in results). */
  commercialAngleKey: string;
  /** i18n key for benchmark data (shown in results). */
  benchmarkKey: string;
}

/** Maturity level label and description, per segment. */
export interface MaturityLevel {
  /** Level number 1–5. */
  level: 1 | 2 | 3 | 4 | 5;
  /** i18n key for level label (e.g. "Firefighting", "Reactive"). */
  labelKey: string;
  /** i18n key for operational description. */
  descriptionKey: string;
  /** Score range: [min, max] inclusive. */
  scoreRange: [number, number];
  /** i18n key for the CTA shown to users at this level. */
  ctaKey: string;
  /** Sales urgency: critical, high, medium, low. */
  urgency: "critical" | "high" | "medium" | "low";
}

/** Recommendation for a specific dimension + level combination. */
export interface DimensionRecommendation {
  dimensionId: string;
  /** i18n key for the recommendation text. */
  recommendationKey: string;
}

/** Complete quiz configuration for one segment (ITSM or CX). */
export interface QuizConfig {
  /** Segment identifier. */
  segment: QuizSegment;
  /** i18n namespace for all quiz text. */
  i18nNamespace: string;
  /** All dimensions with weights (must sum to 1.0). */
  dimensions: QuizDimension[];
  /** All scored questions (10 per assessment). */
  questions: QuizQuestion[];
  /** Maturity levels 1–5 with segment-specific labels. */
  levels: [MaturityLevel, MaturityLevel, MaturityLevel, MaturityLevel, MaturityLevel];
  /** SEO: URL slug prefix for level pages. */
  levelPageSlugPrefix: string;
}

/** Demographic question (not scored, collected on screen 1). */
export interface DemographicField {
  id: string;
  /** i18n key for field label. */
  labelKey: string;
  /** i18n keys for dropdown options. */
  optionKeys: string[];
}

/** Demographic fields shared between ITSM and CX. */
export const DEMOGRAPHIC_FIELDS: DemographicField[] = [
  {
    id: "companySize",
    labelKey: "quiz.demographics.companySize",
    optionKeys: [
      "quiz.demographics.size.50_199",
      "quiz.demographics.size.200_499",
      "quiz.demographics.size.500_999",
      "quiz.demographics.size.1000_2000",
      "quiz.demographics.size.2000_plus",
    ],
  },
  {
    id: "industry",
    labelKey: "quiz.demographics.industry",
    optionKeys: [
      "quiz.demographics.industry.tech",
      "quiz.demographics.industry.finance",
      "quiz.demographics.industry.healthcare",
      "quiz.demographics.industry.manufacturing",
      "quiz.demographics.industry.retail",
      "quiz.demographics.industry.education",
      "quiz.demographics.industry.government",
      "quiz.demographics.industry.services",
      "quiz.demographics.industry.telecom",
      "quiz.demographics.industry.other",
    ],
  },
  {
    id: "role",
    labelKey: "quiz.demographics.role",
    optionKeys: [
      "quiz.demographics.role.itDirector",
      "quiz.demographics.role.supportDirector",
      "quiz.demographics.role.operations",
      "quiz.demographics.role.other",
    ],
  },
];
