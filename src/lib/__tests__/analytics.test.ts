/**
 * Tests for analytics helper and consent logic.
 * US-22.8
 */

import { describe, it, expect, vi, beforeEach } from "vitest";
import { hasConsent, setConsent, CONSENT_KEY } from "@/lib/analytics";
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
