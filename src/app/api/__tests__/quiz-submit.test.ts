import { describe, it, expect, beforeEach, vi } from "vitest";
import { POST } from "@/app/api/quiz/submit/route";
import { quizRateLimiter, contactRateLimiter } from "@/lib/rate-limit";

// Track Resend email sends across tests
const sendMock = vi.fn(() => Promise.resolve({ data: { id: "mock-id" } }));

// Mock the Resend SDK so we never make real HTTP calls even when the API
// key is set. The mock is hoisted by vi.mock so it applies to the import
// at the top of the route handler. The Resend constructor needs to be a
// real class to satisfy `new Resend(...)` in the route.
vi.mock("resend", () => ({
  Resend: class {
    emails = { send: sendMock };
  },
}));

// Dev mode by default: no email, no CRM
vi.stubEnv("RESEND_API_KEY", "");
vi.stubEnv("HUBSPOT_ACCESS_TOKEN", "");

function validPayload(overrides: Record<string, unknown> = {}) {
  return {
    email: "sophie.dsi@acme-corp.fr",
    segment: "itsm",
    overallScore: 62,
    maturityLevel: {
      level: 3,
      labelKey: "quiz.itsm.levels.established.label",
      descriptionKey: "quiz.itsm.levels.established.description",
      ctaKey: "quiz.itsm.levels.established.cta",
      urgency: "medium",
    },
    dimensionScores: {
      incident: 3.3,
      problem: 2.9,
      change: 3.0,
    },
    demographics: {
      companySize: "200_499",
      industry: "tech",
      role: "itDirector",
    },
    weakestDimensions: [
      {
        id: "automation",
        score: 2.5,
        nameKey: "quiz.itsm.dimensions.automation.name",
        commercialAngleKey: "quiz.itsm.dimensions.automation.angle",
      },
      {
        id: "asset_cmdb",
        score: 2.8,
        nameKey: "quiz.itsm.dimensions.asset_cmdb.name",
        commercialAngleKey: "quiz.itsm.dimensions.asset_cmdb.angle",
      },
      {
        id: "problem",
        score: 2.9,
        nameKey: "quiz.itsm.dimensions.problem.name",
        commercialAngleKey: "quiz.itsm.dimensions.problem.angle",
      },
    ],
    ...overrides,
  };
}

function createRequest(body: unknown, ip = "127.0.0.1"): Request {
  return new Request("http://localhost:3000/api/quiz/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-forwarded-for": ip,
    },
    body: JSON.stringify(body),
  });
}

describe("POST /api/quiz/submit", () => {
  beforeEach(() => {
    quizRateLimiter.reset();
    contactRateLimiter.reset();
    sendMock.mockClear();
    // Reset to dev-mode defaults between tests
    vi.stubEnv("RESEND_API_KEY", "");
    vi.stubEnv("HUBSPOT_ACCESS_TOKEN", "");
  });

  // ── 1. Valid payload ──────────────────────────────────────────────────
  it("returns 200 with { success: true } for a valid ITSM payload", async () => {
    const response = await POST(createRequest(validPayload()));
    const json = await response.json();

    expect(response.status).toBe(200);
    expect(json).toEqual({ success: true });
  });

  it("accepts a valid CX payload", async () => {
    const response = await POST(
      createRequest(validPayload({ segment: "cx" }))
    );
    const json = await response.json();

    expect(response.status).toBe(200);
    expect(json.success).toBe(true);
  });

  // ── 2. Invalid segment ────────────────────────────────────────────────
  it("returns 400 for an invalid segment enum value", async () => {
    const response = await POST(
      createRequest(validPayload({ segment: "foo" }))
    );
    const json = await response.json();

    expect(response.status).toBe(400);
    expect(json.error).toBe("Validation failed");
    expect(json.details).toEqual(
      expect.arrayContaining([expect.objectContaining({ field: "segment" })])
    );
  });

  // ── 3. Missing required fields ────────────────────────────────────────
  it("returns 400 when maturityLevel is missing", async () => {
    const payload = validPayload();
    delete (payload as Record<string, unknown>).maturityLevel;

    const response = await POST(createRequest(payload));
    const json = await response.json();

    expect(response.status).toBe(400);
    expect(json.error).toBe("Validation failed");
  });

  it("returns 400 when dimensionScores is empty", async () => {
    const response = await POST(
      createRequest(validPayload({ dimensionScores: {} }))
    );
    const json = await response.json();

    expect(response.status).toBe(400);
    expect(json.error).toBe("Validation failed");
  });

  // ── 4. Score range bounds ─────────────────────────────────────────────
  it("returns 400 when overallScore is below 0", async () => {
    const response = await POST(
      createRequest(validPayload({ overallScore: -1 }))
    );
    expect(response.status).toBe(400);
  });

  it("returns 400 when overallScore is above 100", async () => {
    const response = await POST(
      createRequest(validPayload({ overallScore: 101 }))
    );
    expect(response.status).toBe(400);
  });

  it("returns 400 when maturityLevel.level is outside 1-5", async () => {
    const response = await POST(
      createRequest(
        validPayload({
          maturityLevel: {
            level: 9,
            labelKey: "x",
            descriptionKey: "y",
            ctaKey: "z",
            urgency: "low",
          },
        })
      )
    );
    expect(response.status).toBe(400);
  });

  // ── 5. Email validation ───────────────────────────────────────────────
  it("returns 400 for a malformed email", async () => {
    const response = await POST(
      createRequest(validPayload({ email: "not-email" }))
    );
    const json = await response.json();

    expect(response.status).toBe(400);
    expect(json.details).toEqual(
      expect.arrayContaining([expect.objectContaining({ field: "email" })])
    );
  });

  // ── 6. Rate limiting ──────────────────────────────────────────────────
  it("returns 429 after exceeding the quiz rate limit (10 requests)", async () => {
    for (let i = 0; i < 10; i++) {
      const response = await POST(createRequest(validPayload()));
      expect(response.status).toBe(200);
    }

    const response = await POST(createRequest(validPayload()));
    const json = await response.json();

    expect(response.status).toBe(429);
    expect(json.error).toBe("Too many requests");
    expect(response.headers.get("Retry-After")).toBeTruthy();
  });

  it("does not share rate limit state with /api/contact", async () => {
    // Consume the /api/contact bucket (5/5) for this IP
    for (let i = 0; i < 5; i++) {
      expect(contactRateLimiter.check("203.0.113.10").allowed).toBe(true);
    }
    expect(contactRateLimiter.check("203.0.113.10").allowed).toBe(false);

    // The quiz endpoint must remain wide open for the same IP
    const response = await POST(
      createRequest(validPayload(), "203.0.113.10")
    );
    expect(response.status).toBe(200);
  });

  // ── 7. Email sending (Resend path) ────────────────────────────────────
  it("sends notification and confirmation emails when RESEND_API_KEY is set", async () => {
    vi.stubEnv("RESEND_API_KEY", "test-resend-key");

    const response = await POST(createRequest(validPayload()));
    expect(response.status).toBe(200);

    // Two emails: internal notification + prospect confirmation
    expect(sendMock).toHaveBeenCalledTimes(2);

    const calls = sendMock.mock.calls as unknown as Array<unknown[]>;
    const internalCall = calls[0][0] as {
      to: string[];
      subject: string;
      text: string;
    };
    const prospectCall = calls[1][0] as {
      to: string[];
      subject: string;
    };

    // Internal email goes to CONTACT_EMAIL and mentions the score
    expect(internalCall.subject).toContain("ITSM");
    expect(internalCall.subject).toContain("62");
    expect(internalCall.text).toContain("automation");

    // Confirmation email goes to the prospect
    expect(prospectCall.to).toEqual(["sophie.dsi@acme-corp.fr"]);
    expect(prospectCall.subject).toContain("Score de Maturité");
  });

  it("returns 500 when the underlying JSON body cannot be parsed", async () => {
    const request = new Request("http://localhost:3000/api/quiz/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-forwarded-for": "127.0.0.1",
      },
      body: "not-json",
    });

    const response = await POST(request);
    expect(response.status).toBe(500);
  });
});
