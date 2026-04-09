/**
 * Quiz configuration barrel export.
 * Import configs via: import { ITSM_CONFIG, CX_CONFIG } from "@/config/quiz";
 */

export { ITSM_CONFIG } from "./itsm";
export { CX_CONFIG } from "./cx";
export { DEMOGRAPHIC_FIELDS } from "./types";
export type {
  QuizConfig,
  QuizSegment,
  QuizQuestion,
  QuizOption,
  QuizDimension,
  MaturityLevel,
  DimensionRecommendation,
  DemographicField,
} from "./types";
