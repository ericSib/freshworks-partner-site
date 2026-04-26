/**
 * Analytics helper — GA4 event tracking.
 *
 * All events are sent conditionally: only when the user has given
 * cookie consent (checked via localStorage). If gtag is not loaded
 * (no consent or blocked), calls are silently ignored.
 *
 * US-22.8
 */

// Consent storage key — shared with CookieBanner
export const CONSENT_KEY = "was-analytics-consent";

/** Check if user has given analytics consent. */
export function hasConsent(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(CONSENT_KEY) === "granted";
}

/** Set analytics consent state. */
export function setConsent(granted: boolean): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(CONSENT_KEY, granted ? "granted" : "denied");

  // Update gtag consent if already loaded
  if (granted && typeof window.gtag === "function") {
    window.gtag("consent", "update", {
      analytics_storage: "granted",
    });
  }
}

// ---------------------------------------------------------------------------
// Custom events
// ---------------------------------------------------------------------------

type GtagEvent = {
  action: string;
  category?: string;
  label?: string;
  value?: number;
};

/** Send a custom GA4 event (only if consent is granted). */
export function trackEvent({ action, category, label, value }: GtagEvent): void {
  if (!hasConsent()) return;
  if (typeof window.gtag !== "function") return;

  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value,
  });
}

/** Quiz segment slug — kept narrow to prevent typos when wiring call-sites. */
type QuizSegmentLabel = "itsm" | "cx" | "esm";

/** Track quiz completion (legacy event from S18, kept for back-compat). */
export function trackQuizComplete(segment: QuizSegmentLabel, score: number): void {
  trackEvent({
    action: "quiz_complete",
    category: "engagement",
    label: segment,
    value: Math.round(score),
  });
}

/** Track contact form submission. */
export function trackContactSubmit(): void {
  trackEvent({
    action: "contact_submit",
    category: "conversion",
  });
}

// ---------------------------------------------------------------------------
// US-S20-5 — Funnel quiz tracking (5 events post segment selection)
//
// Events form the macro funnel:
//   started → form_shown → lead_submitted → results_viewed → pdf_downloaded
//
// `quiz_question_completed` (per-question granular event) is intentionally
// out of scope for S20 — high volume, low ROI for funnel optimization.
// ---------------------------------------------------------------------------

/** Fired when the visitor picks a segment (ITSM/CX/ESM) on the quiz home. */
export function trackQuizStarted(segment: QuizSegmentLabel): void {
  trackEvent({
    action: "quiz_started",
    category: "engagement",
    label: segment,
  });
}

/** Fired when the email gate becomes visible (post free results screen). */
export function trackQuizFormShown(segment: QuizSegmentLabel, scoreGlobal: number): void {
  trackEvent({
    action: "quiz_form_shown",
    category: "conversion",
    label: segment,
    value: Math.round(scoreGlobal),
  });
}

/** Fired when the visitor submits the lead form (email captured + CRM upsert). */
export function trackQuizLeadSubmitted(
  segment: QuizSegmentLabel,
  scoreGlobal: number,
  level: number
): void {
  trackEvent({
    action: "quiz_lead_submitted",
    category: "conversion",
    label: `${segment}-level-${level}`,
    value: Math.round(scoreGlobal),
  });
}

/** Fired when the gated results screen is rendered (after free + email gate). */
export function trackQuizResultsViewed(
  segment: QuizSegmentLabel,
  level: number,
  hasRoi: boolean
): void {
  trackEvent({
    action: "quiz_results_viewed",
    category: "engagement",
    label: hasRoi ? `${segment}-roi` : segment,
    value: level,
  });
}

/** Fired when the visitor downloads their personal PDF report. */
export function trackQuizPdfDownloaded(segment: QuizSegmentLabel, level: number): void {
  trackEvent({
    action: "quiz_pdf_downloaded",
    category: "conversion",
    label: `${segment}-level-${level}`,
    value: level,
  });
}

// ---------------------------------------------------------------------------
// Type augmentation for window.gtag
// ---------------------------------------------------------------------------

declare global {
  interface Window {
    gtag: ((...args: unknown[]) => void) | undefined;
    dataLayer: unknown[];
  }
}
