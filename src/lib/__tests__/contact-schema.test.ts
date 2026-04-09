import { describe, it, expect } from "vitest";
import { contactFormSchema, VALID_CHALLENGES } from "@/lib/validation";

// ---------------------------------------------------------------------------
// Helper — a valid payload reused across tests
// ---------------------------------------------------------------------------
const validPayload = {
  name: "Jean Dupont",
  email: "jean@example.com",
  company: "Acme Corp",
  challenge: "adoption" as const,
};

// ---------------------------------------------------------------------------
// contactFormSchema
// ---------------------------------------------------------------------------
describe("contactFormSchema", () => {
  // 1. Valid payload
  it("accepts a fully valid payload", () => {
    const result = contactFormSchema.safeParse(validPayload);
    expect(result.success).toBe(true);
  });

  // 2. Missing name
  it("rejects when name is missing", () => {
    const { name: _, ...noName } = validPayload;
    const result = contactFormSchema.safeParse(noName);

    expect(result.success).toBe(false);
    if (!result.success) {
      const nameErrors = result.error.issues.filter(
        (i) => i.path[0] === "name"
      );
      expect(nameErrors.length).toBeGreaterThan(0);
    }
  });

  // 3. Missing email
  it("rejects when email is missing", () => {
    const { email: _, ...noEmail } = validPayload;
    const result = contactFormSchema.safeParse(noEmail);

    expect(result.success).toBe(false);
    if (!result.success) {
      const emailErrors = result.error.issues.filter(
        (i) => i.path[0] === "email"
      );
      expect(emailErrors.length).toBeGreaterThan(0);
    }
  });

  // 4. Invalid email format
  it('returns "Invalid email format" for a malformed email', () => {
    const result = contactFormSchema.safeParse({
      ...validPayload,
      email: "not-an-email",
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      const messages = result.error.issues.map((i) => i.message);
      expect(messages).toContain("Invalid email format");
    }
  });

  // 5. Name too long (101 chars)
  it("rejects a name longer than 100 characters", () => {
    const result = contactFormSchema.safeParse({
      ...validPayload,
      name: "A".repeat(101),
    });

    expect(result.success).toBe(false);
  });

  // 6. Email too long (255 chars)
  it("rejects an email longer than 254 characters", () => {
    const longLocal = "a".repeat(250);
    const result = contactFormSchema.safeParse({
      ...validPayload,
      email: `${longLocal}@example.com`, // 262 chars, well over 254
    });

    expect(result.success).toBe(false);
  });

  // 7. Company too long (201 chars)
  it("rejects a company longer than 200 characters", () => {
    const result = contactFormSchema.safeParse({
      ...validPayload,
      company: "C".repeat(201),
    });

    expect(result.success).toBe(false);
  });

  // 8. Invalid challenge value
  it("rejects an invalid challenge value and mentions the valid ones", () => {
    const result = contactFormSchema.safeParse({
      ...validPayload,
      challenge: "sql_injection",
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      const msg = result.error.issues.map((i) => i.message).join(" ");
      // The error should reference at least some of the valid values
      for (const valid of VALID_CHALLENGES) {
        expect(msg).toContain(valid);
      }
    }
  });

  // 9. Valid challenge "adoption"
  it('accepts the challenge value "adoption"', () => {
    const result = contactFormSchema.safeParse({
      ...validPayload,
      challenge: "adoption",
    });

    expect(result.success).toBe(true);
  });

  // 10. Empty website (honeypot) — allowed
  it("accepts an empty website string (honeypot not triggered)", () => {
    const result = contactFormSchema.safeParse({
      ...validPayload,
      website: "",
    });

    expect(result.success).toBe(true);
  });

  // 11. Filled website (honeypot) — passes Zod, route handler rejects silently
  it("passes a non-empty website through to the route handler", () => {
    const result = contactFormSchema.safeParse({
      ...validPayload,
      website: "https://spam.bot",
    });

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.website).toBe("https://spam.bot");
    }
  });

  // 12. Extra fields are stripped
  it("strips unknown fields from the parsed output", () => {
    const result = contactFormSchema.safeParse({
      ...validPayload,
      extraField: "should be removed",
      anotherExtra: 42,
    });

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).not.toHaveProperty("extraField");
      expect(result.data).not.toHaveProperty("anotherExtra");
    }
  });
});
