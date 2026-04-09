import { describe, it, expect } from "vitest";
import { EMAIL_REGEX } from "@/lib/validation";

// ---------------------------------------------------------------------------
// EMAIL_REGEX
// ---------------------------------------------------------------------------
describe("EMAIL_REGEX", () => {
  // ---- Valid emails -------------------------------------------------------
  describe("valid emails", () => {
    const validCases: string[] = [
      "user@example.com",
      "user.name@domain.co.uk",
      "user+tag@example.org",
      "firstname.lastname@company.com",
      "name@sub.domain.com",
      "user123@domain.io",
      "a@b.co",
    ];

    it.each(validCases)("should match %s", (email) => {
      expect(EMAIL_REGEX.test(email)).toBe(true);
    });
  });

  // ---- Invalid emails -----------------------------------------------------
  describe("invalid emails", () => {
    const invalidCases: [string, string][] = [
      ["", "empty string"],
      ["not-an-email", "missing @ and domain"],
      ["user@", "missing domain"],
      ["@domain.com", "missing local part"],
      ["user @example.com", "space in local part"],
      ["user@.com", "domain starts with dot"],
      ["user@domain .com", "space in domain"],
      ["user@@domain.com", "double @"],
      ["@", "only @"],
    ];

    it.each(invalidCases)("should reject '%s' (%s)", (email) => {
      expect(EMAIL_REGEX.test(email)).toBe(false);
    });
  });

  // ---- Edge cases ---------------------------------------------------------
  describe("edge cases", () => {
    it("should handle a very long but structurally valid email", () => {
      const localPart = "a".repeat(64);
      const domainLabel = "b".repeat(63);
      const longEmail = `${localPart}@${domainLabel}.com`;
      // The regex only checks structure, not RFC length limits
      expect(EMAIL_REGEX.test(longEmail)).toBe(true);
    });

    it("should reject an email that is only whitespace", () => {
      expect(EMAIL_REGEX.test("   ")).toBe(false);
    });

    it("should allow hyphens in the domain", () => {
      expect(EMAIL_REGEX.test("user@my-domain.com")).toBe(true);
    });

    it("should allow underscores in the local part", () => {
      expect(EMAIL_REGEX.test("first_last@example.com")).toBe(true);
    });

    it("should allow numeric-only local part", () => {
      expect(EMAIL_REGEX.test("12345@example.com")).toBe(true);
    });

    it("should allow numeric domain labels", () => {
      expect(EMAIL_REGEX.test("user@123.123.123.com")).toBe(true);
    });
  });
});

// ---------------------------------------------------------------------------
// Future: Zod contact form schema
// ---------------------------------------------------------------------------
// describe("contactFormSchema", () => {
//   -- tests for Zod schema will go here once it is added to validation.ts --
// });
