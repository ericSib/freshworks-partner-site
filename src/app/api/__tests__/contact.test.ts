import { describe, it, expect, beforeEach, vi } from "vitest";
import { POST } from "@/app/api/contact/route";
import { resetRateLimiter } from "@/lib/rate-limit";

// Ensure dev mode: no Resend key, no HubSpot token
vi.stubEnv("RESEND_API_KEY", "");
vi.stubEnv("HUBSPOT_ACCESS_TOKEN", "");

/** Build a valid base payload that passes all validation rules. */
function validPayload(overrides: Record<string, unknown> = {}) {
  return {
    name: "Jean Dupont",
    email: "jean@example.com",
    company: "Acme Corp",
    challenge: "adoption",
    ...overrides,
  };
}

/** Helper to construct a Request object for the contact endpoint. */
function createRequest(body: unknown): Request {
  return new Request("http://localhost:3000/api/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-forwarded-for": "127.0.0.1",
    },
    body: JSON.stringify(body),
  });
}

describe("POST /api/contact", () => {
  beforeEach(() => {
    resetRateLimiter();
  });

  // ── 1. Valid payload → 200 ────────────────────────────────────────────
  it("returns 200 with { success: true } for a valid payload", async () => {
    const response = await POST(createRequest(validPayload()));
    const json = await response.json();

    expect(response.status).toBe(200);
    expect(json).toEqual({ success: true });
  });

  // ── 2. Missing company → 400 ─────────────────────────────────────────
  it("returns 400 when the company field is missing", async () => {
    const payload = validPayload();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { company, ...withoutCompany } = payload;

    const response = await POST(createRequest(withoutCompany));
    const json = await response.json();

    expect(response.status).toBe(400);
    expect(json.error).toBe("Validation failed");
    expect(json.details).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ field: "company" }),
      ])
    );
  });

  // ── 3. Invalid email → 400 ───────────────────────────────────────────
  it("returns 400 with details mentioning 'Invalid email format'", async () => {
    const response = await POST(
      createRequest(validPayload({ email: "not-email" }))
    );
    const json = await response.json();

    expect(response.status).toBe(400);
    expect(json.error).toBe("Validation failed");
    expect(json.details).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ message: "Invalid email format" }),
      ])
    );
  });

  // ── 4. Invalid challenge value → 400 ─────────────────────────────────
  it("returns 400 for an invalid challenge value", async () => {
    const response = await POST(
      createRequest(validPayload({ challenge: "invalid-value" }))
    );
    const json = await response.json();

    expect(response.status).toBe(400);
    expect(json.error).toBe("Validation failed");
  });

  // ── 5. Name too long (200 chars) → 400 ───────────────────────────────
  it("returns 400 when name is 200 characters", async () => {
    const longName = "A".repeat(200);
    const response = await POST(
      createRequest(validPayload({ name: longName }))
    );
    const json = await response.json();

    expect(response.status).toBe(400);
    expect(json.error).toBe("Validation failed");
    expect(json.details).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ field: "name" }),
      ])
    );
  });

  // ── 6. Rate limiting → 6th request returns 429 ───────────────────────
  it("returns 429 with 'Too many requests' after exceeding the rate limit", async () => {
    // The rate limiter allows MAX_REQUESTS (5) per window.
    for (let i = 0; i < 5; i++) {
      const response = await POST(createRequest(validPayload()));
      expect(response.status).toBe(200);
    }

    // The 6th request from the same IP should be rate-limited.
    const response = await POST(createRequest(validPayload()));
    const json = await response.json();

    expect(response.status).toBe(429);
    expect(json.error).toBe("Too many requests");
  });

  // ── 7. Honeypot filled → silent 200 (bot trap) ───────────────────────
  // NOTE: The current Zod schema enforces `website: z.string().max(0).optional()`,
  // which means a non-empty website value is rejected at the validation layer
  // before reaching the honeypot check in the route handler. If the schema is
  // relaxed (e.g., removing the max(0) constraint) to let the honeypot value
  // pass through to the route, this test will pass as written. For now, the
  // test validates the intended design: bots that fill the hidden field are
  // silently accepted with no actual processing.
  it("returns 200 silently when the honeypot field is filled", async () => {
    const response = await POST(
      createRequest(validPayload({ website: "http://spam.com" }))
    );
    const json = await response.json();

    expect(response.status).toBe(200);
    expect(json).toEqual({ success: true });
  });
});
