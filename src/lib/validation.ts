/**
 * Shared validation utilities.
 * Single source of truth for field-level validation rules.
 */

import { z } from "zod";

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Allowed challenge keys — must match CHALLENGE_KEYS in useContactForm. */
export const VALID_CHALLENGES = [
  "adoption",
  "cx",
  "tool",
  "migration",
  "scale",
  "itam",
  "other",
] as const;

/** Server-side Zod schema for the /api/contact payload. */
export const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required")
    .max(100, "Name must be 100 characters or fewer"),
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .max(254, "Email must be 254 characters or fewer")
    .regex(EMAIL_REGEX, "Invalid email format"),
  company: z
    .string()
    .trim()
    .min(1, "Company is required")
    .max(200, "Company must be 200 characters or fewer"),
  challenge: z.enum(VALID_CHALLENGES, {
    error: `Challenge must be one of: ${VALID_CHALLENGES.join(", ")}`,
  }),
  /** Honeypot field — passed through to route handler for silent reject. */
  website: z.string().optional().default(""),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

// ─── Quiz submission ────────────────────────────────────────────────────

/** Allowed quiz segments. Kept in lockstep with QuizSegment (src/config/quiz/types.ts). */
export const QUIZ_SEGMENTS = ["itsm", "cx", "esm"] as const;

/** Urgency labels emitted by the maturity level computation. */
export const MATURITY_URGENCIES = ["critical", "high", "medium", "low"] as const;

/** Maturity level shape returned by `getMaturityLevel`. */
export const maturityLevelSchema = z.object({
  level: z.number().int().min(1).max(5),
  labelKey: z.string().min(1),
  descriptionKey: z.string().min(1),
  ctaKey: z.string().min(1),
  urgency: z.enum(MATURITY_URGENCIES),
});

/** Demographics captured before the quiz starts. */
export const quizDemographicsSchema = z.object({
  companySize: z.string().trim().min(1, "companySize is required"),
  industry: z.string().trim().min(1, "industry is required"),
  role: z.string().trim().min(1, "role is required"),
});

/** A single weakest-dimension entry (surfaced in "quick wins"). */
export const weakestDimensionSchema = z.object({
  id: z.string().min(1),
  score: z.number().min(0).max(5),
  nameKey: z.string().min(1),
  commercialAngleKey: z.string().min(1),
});

/** Server-side Zod schema for the /api/quiz/submit payload. */
export const quizSubmitSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .max(254, "Email must be 254 characters or fewer")
    .regex(EMAIL_REGEX, "Invalid email format"),
  segment: z.enum(QUIZ_SEGMENTS, {
    error: `Segment must be one of: ${QUIZ_SEGMENTS.join(", ")}`,
  }),
  overallScore: z.number().min(0).max(100),
  maturityLevel: maturityLevelSchema,
  // Values are the averages returned by calculateDimensionScores
  // (1..5 scale, averaged from per-question scores).
  dimensionScores: z
    .record(z.string(), z.number().min(0).max(5))
    .refine((scores) => Object.keys(scores).length > 0, {
      message: "dimensionScores cannot be empty",
    }),
  demographics: quizDemographicsSchema,
  weakestDimensions: z.array(weakestDimensionSchema).min(1).max(8),
});

export type QuizSubmitPayload = z.infer<typeof quizSubmitSchema>;
