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

/** Track quiz completion. */
export function trackQuizComplete(segment: "itsm" | "cx", score: number): void {
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
// Type augmentation for window.gtag
// ---------------------------------------------------------------------------

declare global {
  interface Window {
    gtag: ((...args: unknown[]) => void) | undefined;
    dataLayer: unknown[];
  }
}
