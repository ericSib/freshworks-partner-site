/**
 * Tests for analytics helper and consent logic.
 * US-22.8
 */

import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  hasConsent,
  setConsent,
  CONSENT_KEY,
  trackEvent,
  trackQuizComplete,
  trackQuizStarted,
  trackQuizFormShown,
  trackQuizLeadSubmitted,
  trackQuizResultsViewed,
  trackQuizPdfDownloaded,
  trackContactSubmit,
  trackCtaHero,
  trackCtaSticky,
  trackCalendlyOpened,
} from "@/lib/analytics";
import frMessages from "@/messages/fr.json";
import enMessages from "@/messages/en.json";

// Mock localStorage
const store: Record<string, string> = {};
const localStorageMock = {
  getItem: vi.fn((key: string) => store[key] ?? null),
  setItem: vi.fn((key: string, value: string) => {
    store[key] = value;
  }),
  removeItem: vi.fn((key: string) => {
    delete store[key];
  }),
  clear: vi.fn(() => {
    Object.keys(store).forEach((key) => delete store[key]);
  }),
  length: 0,
  key: vi.fn(),
};

Object.defineProperty(global, "localStorage", { value: localStorageMock });

beforeEach(() => {
  localStorageMock.clear();
  vi.clearAllMocks();
});

describe("Analytics consent (US-22.8)", () => {
  it("hasConsent returns false when no decision stored", () => {
    expect(hasConsent()).toBe(false);
  });

  it("hasConsent returns true after setConsent(true)", () => {
    setConsent(true);
    expect(store[CONSENT_KEY]).toBe("granted");
    expect(hasConsent()).toBe(true);
  });

  it("hasConsent returns false after setConsent(false)", () => {
    setConsent(false);
    expect(store[CONSENT_KEY]).toBe("denied");
    expect(hasConsent()).toBe(false);
  });

  it("CONSENT_KEY is a stable string", () => {
    expect(CONSENT_KEY).toBe("was-analytics-consent");
  });
});

describe("Cookie banner i18n (US-22.8)", () => {
  it("FR has cookies namespace with all required keys", () => {
    expect(frMessages.cookies.bannerLabel).toBeTruthy();
    expect(frMessages.cookies.message).toBeTruthy();
    expect(frMessages.cookies.accept).toBeTruthy();
    expect(frMessages.cookies.decline).toBeTruthy();
  });

  it("EN has cookies namespace with all required keys", () => {
    expect(enMessages.cookies.bannerLabel).toBeTruthy();
    expect(enMessages.cookies.message).toBeTruthy();
    expect(enMessages.cookies.accept).toBeTruthy();
    expect(enMessages.cookies.decline).toBeTruthy();
  });
});

// ---------------------------------------------------------------------------
// US-21.6 — GA4 trackers coverage
// ---------------------------------------------------------------------------

describe("Analytics trackers (US-21.6)", () => {
  const gtagMock = vi.fn();

  /**
   * Grant consent without going through `setConsent()` — that helper calls
   * `gtag("consent", "update", ...)` on granted and would pollute our
   * assertions on tracker call counts. For these tests we only care about
   * the tracker side-effects, not the consent-update gtag call (already
   * covered by the "Analytics consent (US-22.8)" describe above).
   */
  function grantConsent(): void {
    store[CONSENT_KEY] = "granted";
  }

  beforeEach(() => {
    localStorageMock.clear();
    vi.clearAllMocks();
    vi.stubGlobal("gtag", gtagMock);
    // Also mirror it onto `window` since the module reads `window.gtag`.
    (window as unknown as { gtag: typeof gtagMock }).gtag = gtagMock;
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    delete (window as unknown as { gtag?: unknown }).gtag;
  });

  describe("trackEvent", () => {
    it("is a no-op when consent is not granted (scenario 1)", () => {
      // hasConsent() === false (no decision stored)
      trackEvent({ action: "test_action" });

      expect(gtagMock).not.toHaveBeenCalled();
    });

    it("is a no-op when consent is denied", () => {
      setConsent(false);
      trackEvent({ action: "test_action" });

      expect(gtagMock).not.toHaveBeenCalled();
    });

    it("does not throw when gtag is absent on the window (scenario 2)", () => {
      grantConsent();
      // Simulate gtag blocked by adblocker or not yet loaded
      delete (window as unknown as { gtag?: unknown }).gtag;
      vi.unstubAllGlobals();

      expect(() => trackEvent({ action: "test" })).not.toThrow();
    });

    it("forwards the full payload to gtag when consent is granted (scenario 3)", () => {
      grantConsent();

      trackEvent({
        action: "click",
        category: "nav",
        label: "header",
        value: 1,
      });

      expect(gtagMock).toHaveBeenCalledTimes(1);
      expect(gtagMock).toHaveBeenCalledWith("event", "click", {
        event_category: "nav",
        event_label: "header",
        value: 1,
      });
    });

    it("forwards undefined fields for minimal payloads", () => {
      grantConsent();

      trackEvent({ action: "ping" });

      expect(gtagMock).toHaveBeenCalledWith("event", "ping", {
        event_category: undefined,
        event_label: undefined,
        value: undefined,
      });
    });
  });

  describe("trackQuizComplete", () => {
    it("emits quiz_complete with rounded score and segment label (scenario 4)", () => {
      grantConsent();

      trackQuizComplete("itsm", 72.4);

      expect(gtagMock).toHaveBeenCalledTimes(1);
      expect(gtagMock).toHaveBeenCalledWith("event", "quiz_complete", {
        event_category: "engagement",
        event_label: "itsm",
        value: 72,
      });
    });

    it("rounds 72.6 up to 73", () => {
      grantConsent();

      trackQuizComplete("cx", 72.6);

      expect(gtagMock).toHaveBeenCalledWith("event", "quiz_complete", {
        event_category: "engagement",
        event_label: "cx",
        value: 73,
      });
    });

    it("is a no-op when consent is missing", () => {
      trackQuizComplete("itsm", 80);

      expect(gtagMock).not.toHaveBeenCalled();
    });
  });

  describe("trackContactSubmit", () => {
    it("emits contact_submit under the conversion category (scenario 5)", () => {
      grantConsent();

      trackContactSubmit();

      expect(gtagMock).toHaveBeenCalledTimes(1);
      expect(gtagMock).toHaveBeenCalledWith("event", "contact_submit", {
        event_category: "conversion",
        event_label: undefined,
        value: undefined,
      });
    });

    it("is a no-op when consent is missing", () => {
      trackContactSubmit();

      expect(gtagMock).not.toHaveBeenCalled();
    });
  });

  // -------------------------------------------------------------------------
  // US-S20-5 — Funnel quiz tracking (5 events post-segment-selection)
  // -------------------------------------------------------------------------

  describe("Funnel quiz tracking (US-S20-5)", () => {
    it("trackQuizStarted accepts the 3 segments incl. ESM (D20)", () => {
      grantConsent();

      trackQuizStarted("esm");

      expect(gtagMock).toHaveBeenCalledWith("event", "quiz_started", {
        event_category: "engagement",
        event_label: "esm",
        value: undefined,
      });
    });

    it("trackQuizComplete now accepts ESM segment (S20 dette S19)", () => {
      grantConsent();

      trackQuizComplete("esm", 65);

      expect(gtagMock).toHaveBeenCalledWith("event", "quiz_complete", {
        event_category: "engagement",
        event_label: "esm",
        value: 65,
      });
    });

    it("trackQuizFormShown emits with segment label and score value", () => {
      grantConsent();

      trackQuizFormShown("itsm", 78);

      expect(gtagMock).toHaveBeenCalledWith("event", "quiz_form_shown", {
        event_category: "conversion",
        event_label: "itsm",
        value: 78,
      });
    });

    it("trackQuizLeadSubmitted emits with segment + level encoded in label", () => {
      grantConsent();

      trackQuizLeadSubmitted("cx", 72, 3);

      expect(gtagMock).toHaveBeenCalledWith("event", "quiz_lead_submitted", {
        event_category: "conversion",
        event_label: "cx-level-3",
        value: 72,
      });
    });

    it("trackQuizResultsViewed encodes hasRoi flag in label", () => {
      grantConsent();

      trackQuizResultsViewed("esm", 4, true);

      expect(gtagMock).toHaveBeenCalledWith("event", "quiz_results_viewed", {
        event_category: "engagement",
        event_label: "esm-roi",
        value: 4,
      });
    });

    it("trackQuizResultsViewed encodes no-roi case", () => {
      grantConsent();

      trackQuizResultsViewed("itsm", 2, false);

      expect(gtagMock).toHaveBeenCalledWith("event", "quiz_results_viewed", {
        event_category: "engagement",
        event_label: "itsm",
        value: 2,
      });
    });

    it("trackQuizPdfDownloaded emits with segment-level label", () => {
      grantConsent();

      trackQuizPdfDownloaded("cx", 5);

      expect(gtagMock).toHaveBeenCalledWith("event", "quiz_pdf_downloaded", {
        event_category: "conversion",
        event_label: "cx-level-5",
        value: 5,
      });
    });

    it("all funnel trackers are no-op when consent is missing (RGPD)", () => {
      // No grantConsent() — consent is denied/unset
      trackQuizStarted("itsm");
      trackQuizFormShown("itsm", 80);
      trackQuizLeadSubmitted("cx", 70, 3);
      trackQuizResultsViewed("esm", 4, true);
      trackQuizPdfDownloaded("itsm", 2);

      expect(gtagMock).not.toHaveBeenCalled();
    });
  });

  // -------------------------------------------------------------------------
  // US-S20-6 — CTA tracking (hero + sticky + calendly)
  // -------------------------------------------------------------------------

  describe("CTA tracking (US-S20-6)", () => {
    it("trackCtaHero('primary') emits with primary variant label", () => {
      grantConsent();

      trackCtaHero("primary");

      expect(gtagMock).toHaveBeenCalledWith("event", "cta_hero_click", {
        event_category: "engagement",
        event_label: "primary",
        value: undefined,
      });
    });

    it("trackCtaHero('secondary') emits with secondary variant label", () => {
      grantConsent();

      trackCtaHero("secondary");

      expect(gtagMock).toHaveBeenCalledWith("event", "cta_hero_click", {
        event_category: "engagement",
        event_label: "secondary",
        value: undefined,
      });
    });

    it("trackCtaSticky emits with sticky label under engagement", () => {
      grantConsent();

      trackCtaSticky();

      expect(gtagMock).toHaveBeenCalledWith("event", "cta_sticky_click", {
        event_category: "engagement",
        event_label: undefined,
        value: undefined,
      });
    });

    it("trackCalendlyOpened encodes source in label", () => {
      grantConsent();

      trackCalendlyOpened("hero");
      trackCalendlyOpened("sticky");
      trackCalendlyOpened("contact");

      expect(gtagMock).toHaveBeenCalledTimes(3);
      expect(gtagMock).toHaveBeenNthCalledWith(1, "event", "calendly_opened", {
        event_category: "conversion",
        event_label: "hero",
        value: undefined,
      });
      expect(gtagMock).toHaveBeenNthCalledWith(2, "event", "calendly_opened", {
        event_category: "conversion",
        event_label: "sticky",
        value: undefined,
      });
      expect(gtagMock).toHaveBeenNthCalledWith(3, "event", "calendly_opened", {
        event_category: "conversion",
        event_label: "contact",
        value: undefined,
      });
    });

    it("CTA trackers are no-op when consent is missing (RGPD)", () => {
      trackCtaHero("primary");
      trackCtaSticky();
      trackCalendlyOpened("contact");

      expect(gtagMock).not.toHaveBeenCalled();
    });
  });
});
