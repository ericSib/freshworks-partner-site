import { describe, it, expect, vi, beforeEach, afterEach, type Mock } from "vitest";
import { buildQuizProperties, upsertHubSpotQuizLead } from "@/lib/quiz/hubspot";
import type { QuizSubmitPayload } from "@/lib/validation";

function validPayload(
  overrides: Partial<QuizSubmitPayload> = {}
): QuizSubmitPayload {
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

describe("buildQuizProperties", () => {
  it("maps every required field onto a HubSpot custom property", () => {
    const props = buildQuizProperties(validPayload());

    expect(props.email).toBe("sophie.dsi@acme-corp.fr");
    expect(props.quiz_segment).toBe("itsm");
    expect(props.quiz_score).toBe("62");
    expect(props.quiz_level).toBe("3");
    expect(props.quiz_company_size).toBe("200_499");
    expect(props.quiz_industry).toBe("tech");
    expect(props.quiz_role).toBe("itDirector");
    expect(props.hs_lead_status).toBe("NEW");
    expect(props.lifecyclestage).toBe("marketingqualifiedlead");
    expect(props.company).toBe("Quiz ITSM lead");
  });

  it("derives firstname from the email local-part", () => {
    const props = buildQuizProperties(
      validPayload({ email: "jean.dupont@example.fr" })
    );
    expect(props.firstname).toBe("Jean");

    const propsUnderscore = buildQuizProperties(
      validPayload({ email: "marc_leroy@example.fr" })
    );
    expect(propsUnderscore.firstname).toBe("Marc");

    const propsPlain = buildQuizProperties(
      validPayload({ email: "sophie@example.fr" })
    );
    expect(propsPlain.firstname).toBe("Sophie");
  });

  it("emits the top 3 weakest dimension ids in order", () => {
    const props = buildQuizProperties(validPayload());
    expect(props.quiz_weakest_dim_1).toBe("automation");
    expect(props.quiz_weakest_dim_2).toBe("asset_cmdb");
    expect(props.quiz_weakest_dim_3).toBe("problem");
  });

  it("fills empty slots when fewer than 3 weakest dimensions are provided", () => {
    const payload = validPayload({
      weakestDimensions: [
        {
          id: "automation",
          score: 2,
          nameKey: "quiz.itsm.dimensions.automation.name",
          commercialAngleKey: "quiz.itsm.dimensions.automation.angle",
        },
      ],
    });

    const props = buildQuizProperties(payload);
    expect(props.quiz_weakest_dim_1).toBe("automation");
    expect(props.quiz_weakest_dim_2).toBe("");
    expect(props.quiz_weakest_dim_3).toBe("");
  });

  it("stamps an ISO-8601 submitted_at timestamp", () => {
    const props = buildQuizProperties(validPayload());
    expect(props.quiz_submitted_at).toMatch(
      /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/
    );
    // Must be parseable back to a Date.
    expect(Number.isNaN(Date.parse(props.quiz_submitted_at))).toBe(false);
  });

  it("labels CX leads with the CX company marker", () => {
    const props = buildQuizProperties(validPayload({ segment: "cx" }));
    expect(props.company).toBe("Quiz CX lead");
    expect(props.quiz_segment).toBe("cx");
  });

  it("labels ESM leads with the ESM company marker", () => {
    const props = buildQuizProperties(validPayload({ segment: "esm" }));
    expect(props.company).toBe("Quiz ESM lead");
    expect(props.quiz_segment).toBe("esm");
  });

  it("attaches the recommended offer slug from the D22 matrix (SMI-offers)", () => {
    // ITSM × level 3 → migration (per OFFER_MATRIX)
    const itsmProps = buildQuizProperties(
      validPayload({
        segment: "itsm",
        maturityLevel: {
          level: 3,
          labelKey: "x",
          descriptionKey: "x",
          ctaKey: "x",
          urgency: "medium",
        },
      })
    );
    expect(itsmProps.smi_recommended_offer).toBe("migration");

    // ESM × level 1 → esm-sprints
    const esmProps = buildQuizProperties(
      validPayload({
        segment: "esm",
        maturityLevel: {
          level: 1,
          labelKey: "x",
          descriptionKey: "x",
          ctaKey: "x",
          urgency: "critical",
        },
      })
    );
    expect(esmProps.smi_recommended_offer).toBe("esm-sprints");

    // CX × level 5 → managed-excellence
    const cxProps = buildQuizProperties(
      validPayload({
        segment: "cx",
        maturityLevel: {
          level: 5,
          labelKey: "x",
          descriptionKey: "x",
          ctaKey: "x",
          urgency: "low",
        },
      })
    );
    expect(cxProps.smi_recommended_offer).toBe("managed-excellence");
  });

  it("uses the translator when provided to resolve the maturity label", () => {
    const t = (key: string) =>
      key === "quiz.itsm.levels.established.label" ? "Established" : key;
    const props = buildQuizProperties(validPayload(), t);
    expect(props.quiz_maturity_label).toBe("Established");
  });

  it("falls back to the raw i18n key when no translator is provided", () => {
    const props = buildQuizProperties(validPayload());
    expect(props.quiz_maturity_label).toBe(
      "quiz.itsm.levels.established.label"
    );
  });
});

// ---------------------------------------------------------------------------
// upsertHubSpotQuizLead — T5 Sprint 15 (network + error branch coverage)
// Same pattern as src/lib/__tests__/hubspot.test.ts (US-21.8)
// ---------------------------------------------------------------------------

describe("upsertHubSpotQuizLead — env + network branches (T5)", () => {
  let fetchMock: Mock;
  let logSpy: ReturnType<typeof vi.spyOn>;
  let errorSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    fetchMock = vi.fn();
    global.fetch = fetchMock as unknown as typeof fetch;
    logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it("skips silently when HUBSPOT_ACCESS_TOKEN is not set", async () => {
    vi.stubEnv("HUBSPOT_ACCESS_TOKEN", "");

    await expect(upsertHubSpotQuizLead(validPayload())).resolves.toBeUndefined();

    expect(fetchMock).not.toHaveBeenCalled();
    expect(logSpy).toHaveBeenCalledWith(
      expect.stringContaining("No HUBSPOT_ACCESS_TOKEN set")
    );
  });

  it("creates a new quiz lead when none exists (search → 0 → create)", async () => {
    vi.stubEnv("HUBSPOT_ACCESS_TOKEN", "fake-token-123");

    fetchMock
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ total: 0, results: [] }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ id: "new-quiz-lead" }),
      });

    await upsertHubSpotQuizLead(validPayload());

    expect(fetchMock).toHaveBeenCalledTimes(2);

    // First call → search
    const [searchUrl, searchInit] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(searchUrl).toContain("/crm/v3/objects/contacts/search");
    expect(searchInit.method).toBe("POST");

    // Second call → create
    const [createUrl, createInit] = fetchMock.mock.calls[1] as [string, RequestInit];
    expect(createUrl).toMatch(/\/crm\/v3\/objects\/contacts$/);
    expect(createInit.method).toBe("POST");
    expect(String(createInit.body)).toContain('"quiz_segment":"itsm"');
    expect(String(createInit.body)).toContain('"quiz_score":"62"');

    expect(logSpy).toHaveBeenCalledWith(
      expect.stringContaining("new-quiz-lead")
    );
  });

  it("updates an existing contact when search returns a hit", async () => {
    vi.stubEnv("HUBSPOT_ACCESS_TOKEN", "fake-token-123");

    fetchMock
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ total: 1, results: [{ id: "existing-99" }] }),
      })
      .mockResolvedValueOnce({ ok: true, json: async () => ({}) });

    await upsertHubSpotQuizLead(validPayload());

    expect(fetchMock).toHaveBeenCalledTimes(2);

    const [updateUrl, updateInit] = fetchMock.mock.calls[1] as [string, RequestInit];
    expect(updateUrl).toContain("/crm/v3/objects/contacts/existing-99");
    expect(updateInit.method).toBe("PATCH");

    expect(logSpy).toHaveBeenCalledWith(
      expect.stringContaining("existing-99")
    );
  });

  it("logs and resolves silently when search returns 5xx", async () => {
    vi.stubEnv("HUBSPOT_ACCESS_TOKEN", "fake-token-123");

    // search fails → findContactByEmail returns null → create attempted
    fetchMock
      .mockResolvedValueOnce({ ok: false, json: async () => ({}) })
      .mockResolvedValueOnce({
        ok: false,
        json: async () => ({ status: "error", message: "Create failed", category: "RATE_LIMITS" }),
      });

    await expect(upsertHubSpotQuizLead(validPayload())).resolves.toBeUndefined();
    expect(errorSpy).toHaveBeenCalledWith(
      expect.stringContaining("Quiz lead sync failed")
    );
  });

  it("logs and resolves silently when PATCH returns 5xx", async () => {
    vi.stubEnv("HUBSPOT_ACCESS_TOKEN", "fake-token-123");

    fetchMock
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ total: 1, results: [{ id: "existing-42" }] }),
      })
      .mockResolvedValueOnce({
        ok: false,
        json: async () => ({ status: "error", message: "Internal error", category: "INTERNAL_ERROR" }),
      });

    await expect(upsertHubSpotQuizLead(validPayload())).resolves.toBeUndefined();
    expect(errorSpy).toHaveBeenCalledWith(
      expect.stringContaining("Quiz lead sync failed")
    );
  });

  it("never throws — the quiz submit flow is always unblocked", async () => {
    vi.stubEnv("HUBSPOT_ACCESS_TOKEN", "fake-token-123");

    fetchMock.mockRejectedValue(new Error("total outage"));

    await expect(upsertHubSpotQuizLead(validPayload())).resolves.toBeUndefined();
    expect(errorSpy).toHaveBeenCalled();
  });
});
