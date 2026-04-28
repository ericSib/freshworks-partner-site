/**
 * CookieBanner — RGPD consent UI tests (US-S20-BUG.1).
 *
 * The bug we're fixing: clicking Accept or Decline did not hide the
 * banner because `useSyncExternalStore` was subscribed only to the
 * `storage` DOM event, which fires only for changes from OTHER tabs.
 * Same-tab changes (the user's own click) never triggered a re-snapshot.
 *
 * These tests pin down the contract: same-tab clicks must hide the
 * banner immediately, and the cross-tab `storage` event must keep
 * working too.
 */

import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";

// Mock next-intl — identity translator (returns the key as-is).
vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

// localStorage mock is provided by vitest.setup.ts (T33 / D11) — fresh
// instance per test, no cross-file leak. The previous defensive local
// mock is no longer needed.

import CookieBanner from "../CookieBanner";

const CONSENT_KEY = "was-analytics-consent";

describe("CookieBanner (US-S20-BUG.1)", () => {

  it("renders the banner when no consent decision is stored", () => {
    render(<CookieBanner />);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "accept" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "decline" })).toBeInTheDocument();
  });

  it("hides the banner immediately on click 'accept' (same-tab change)", () => {
    render(<CookieBanner />);
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "accept" }));

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(localStorage.getItem(CONSENT_KEY)).toBe("granted");
  });

  it("hides the banner immediately on click 'decline' (same-tab change)", () => {
    render(<CookieBanner />);
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "decline" }));

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(localStorage.getItem(CONSENT_KEY)).toBe("denied");
  });

  it("does not render when a consent decision is already stored on mount", () => {
    localStorage.setItem(CONSENT_KEY, "granted");
    render(<CookieBanner />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("hides cross-tab when a 'storage' event is received with the consent key", () => {
    render(<CookieBanner />);
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    // Simulate the storage event a second tab would dispatch
    act(() => {
      localStorage.setItem(CONSENT_KEY, "granted");
      window.dispatchEvent(
        new StorageEvent("storage", { key: CONSENT_KEY, newValue: "granted" })
      );
    });

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
