/**
 * Resend sender configuration — single source of truth.
 *
 * Before T23, the `from:` was hardcoded in 4 call-sites
 * (api/contact + api/quiz/submit, both admin notif + user reply).
 * Drop S19 D9 — desalignement sender Resend non capture par les tests.
 *
 * Now centralized + read from env var with safe fallback. Format
 * validation throws at first call to surface misconfig early.
 *
 * Env var: `RESEND_FROM_EMAIL` (Vercel Production + Preview + Dev).
 * Default (D27): noreply@update.whataservice.fr (Verified domain).
 */

const DEFAULT_SENDER_EMAIL = "noreply@update.whataservice.fr";

/** Loose RFC 5322 subset — sufficient to catch typos and misconfig. */
const SENDER_EMAIL_REGEX = /^[a-z0-9._-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;

/** Returns the bare sender email address. Throws if env var is set but invalid. */
export function getSenderEmail(): string {
  const value = process.env.RESEND_FROM_EMAIL || DEFAULT_SENDER_EMAIL;
  if (!SENDER_EMAIL_REGEX.test(value)) {
    throw new Error(
      `Invalid RESEND_FROM_EMAIL "${value}" — expected format: name@example.com`
    );
  }
  return value;
}

/** Returns "What A Service <email>" — for admin notifications. */
export function getDefaultSender(): string {
  return `What A Service <${getSenderEmail()}>`;
}

/** Returns "Eric Sib — What A Service <email>" — for user-facing replies. */
export function getReplySender(): string {
  return `Eric Sib — What A Service <${getSenderEmail()}>`;
}
