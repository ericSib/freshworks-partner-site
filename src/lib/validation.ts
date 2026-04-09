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
