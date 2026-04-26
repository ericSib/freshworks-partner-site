/**
 * Sender helper tests — guards against Resend sender drift (Drop S19 D9).
 *
 * Before T23, the `from:` was hardcoded in 4 call-sites
 * (api/contact + api/quiz/submit, both admin notif + user reply).
 * A typo in any of the 4 places would silently break delivery without
 * any test catching it. T23 centralizes the sender + asserts the format.
 */

import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { getSenderEmail, getDefaultSender, getReplySender } from "../sender";

describe("Resend sender helper (T23)", () => {
  const ORIGINAL_ENV = process.env.RESEND_FROM_EMAIL;

  beforeEach(() => {
    delete process.env.RESEND_FROM_EMAIL;
  });

  afterEach(() => {
    if (ORIGINAL_ENV !== undefined) {
      process.env.RESEND_FROM_EMAIL = ORIGINAL_ENV;
    } else {
      delete process.env.RESEND_FROM_EMAIL;
    }
  });

  describe("getSenderEmail()", () => {
    it("falls back to noreply@update.whataservice.fr when env var is unset (D27 default)", () => {
      expect(getSenderEmail()).toBe("noreply@update.whataservice.fr");
    });

    it("reads RESEND_FROM_EMAIL when set", () => {
      process.env.RESEND_FROM_EMAIL = "noreply@example.fr";
      expect(getSenderEmail()).toBe("noreply@example.fr");
    });

    it("throws when the env var is not a valid email format", () => {
      process.env.RESEND_FROM_EMAIL = "not-an-email";
      expect(() => getSenderEmail()).toThrow(/Invalid RESEND_FROM_EMAIL/);
    });

    it("throws when the env var is empty string", () => {
      process.env.RESEND_FROM_EMAIL = "";
      // Empty string => fallback to default per nullish-coalescing
      expect(getSenderEmail()).toBe("noreply@update.whataservice.fr");
    });
  });

  describe("getDefaultSender()", () => {
    it("returns 'What A Service <email>' format for admin notifications", () => {
      expect(getDefaultSender()).toBe("What A Service <noreply@update.whataservice.fr>");
    });

    it("uses the env var value if set", () => {
      process.env.RESEND_FROM_EMAIL = "noreply@example.fr";
      expect(getDefaultSender()).toBe("What A Service <noreply@example.fr>");
    });
  });

  describe("getReplySender()", () => {
    it("returns 'Eric Sib — What A Service <email>' format for user replies", () => {
      expect(getReplySender()).toBe(
        "Eric Sib — What A Service <noreply@update.whataservice.fr>"
      );
    });
  });
});
