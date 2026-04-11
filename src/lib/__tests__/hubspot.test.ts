import {
  describe,
  it,
  expect,
  vi,
  beforeEach,
  afterEach,
  type Mock,
} from "vitest";
import {
  splitName,
  buildProperties,
  upsertHubSpotContact,
} from "@/lib/hubspot";

// ---------------------------------------------------------------------------
// splitName
// ---------------------------------------------------------------------------
describe("splitName", () => {
  it('splits "Jean Dupont" into first and last name', () => {
    expect(splitName("Jean Dupont")).toEqual({
      firstname: "Jean",
      lastname: "Dupont",
    });
  });

  it('returns only firstname when single word "Jean"', () => {
    expect(splitName("Jean")).toEqual({
      firstname: "Jean",
      lastname: "",
    });
  });

  it('keeps everything after the first word as lastname for "Jean Pierre Dupont"', () => {
    expect(splitName("Jean Pierre Dupont")).toEqual({
      firstname: "Jean",
      lastname: "Pierre Dupont",
    });
  });

  it("trims leading/trailing and collapses inner whitespace", () => {
    expect(splitName("  Jean  Dupont  ")).toEqual({
      firstname: "Jean",
      lastname: "Dupont",
    });
  });

  it("returns empty strings for an empty input", () => {
    expect(splitName("")).toEqual({
      firstname: "",
      lastname: "",
    });
  });
});

// ---------------------------------------------------------------------------
// buildProperties
// ---------------------------------------------------------------------------
describe("buildProperties", () => {
  const payload = {
    name: "Jean Dupont",
    email: "jean@example.com",
    company: "Acme Corp",
    challenge: "adoption",
  };

  it("maps a full payload to the correct HubSpot properties", () => {
    const props = buildProperties(payload);

    expect(props).toEqual({
      email: "jean@example.com",
      firstname: "Jean",
      lastname: "Dupont",
      company: "Acme Corp",
      message: "Challenge: adoption",
      hs_lead_status: "NEW",
      lifecyclestage: "lead",
    });
  });

  it('sets hs_lead_status to "NEW"', () => {
    const props = buildProperties(payload);
    expect(props.hs_lead_status).toBe("NEW");
  });

  it('sets lifecyclestage to "lead"', () => {
    const props = buildProperties(payload);
    expect(props.lifecyclestage).toBe("lead");
  });

  it('formats message as "Challenge: {challenge}"', () => {
    const props = buildProperties({
      ...payload,
      challenge: "migration",
    });
    expect(props.message).toBe("Challenge: migration");
  });
});

// ---------------------------------------------------------------------------
// upsertHubSpotContact — US-21.8 (network + error branch coverage)
// ---------------------------------------------------------------------------

const validPayload = {
  name: "Sophie Dupont",
  email: "sophie@acme-corp.fr",
  company: "Acme Corp",
  challenge: "adoption",
};

describe("upsertHubSpotContact — env + network branches (US-21.8)", () => {
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

  // ── Scenario 3 — no token ──────────────────────────────────────────────
  it("skips silently when HUBSPOT_ACCESS_TOKEN is not set", async () => {
    vi.stubEnv("HUBSPOT_ACCESS_TOKEN", "");

    await expect(upsertHubSpotContact(validPayload)).resolves.toBeUndefined();

    expect(fetchMock).not.toHaveBeenCalled();
    expect(logSpy).toHaveBeenCalledWith(
      expect.stringContaining("No HUBSPOT_ACCESS_TOKEN")
    );
  });

  // ── Scenario 4 — not-found branch ──────────────────────────────────────
  it("creates a new contact when none exists (search → 0 results → create)", async () => {
    vi.stubEnv("HUBSPOT_ACCESS_TOKEN", "fake-token-123");

    fetchMock
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ total: 0, results: [] }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ id: "new-contact-id" }),
      });

    await upsertHubSpotContact(validPayload);

    expect(fetchMock).toHaveBeenCalledTimes(2);

    // First call → search
    const [searchUrl, searchInit] = fetchMock.mock.calls[0] as [
      string,
      RequestInit,
    ];
    expect(searchUrl).toContain("/crm/v3/objects/contacts/search");
    expect(searchInit.method).toBe("POST");
    expect(String(searchInit.body)).toContain(validPayload.email);

    // Second call → create
    const [createUrl, createInit] = fetchMock.mock.calls[1] as [
      string,
      RequestInit,
    ];
    expect(createUrl).toMatch(/\/crm\/v3\/objects\/contacts$/);
    expect(createInit.method).toBe("POST");
    expect(String(createInit.body)).toContain('"firstname":"Sophie"');
    expect(String(createInit.body)).toContain('"lastname":"Dupont"');

    expect(logSpy).toHaveBeenCalledWith(
      expect.stringContaining("Created contact new-contact-id")
    );
  });

  // ── Scenario 5 — found branch ──────────────────────────────────────────
  it("updates an existing contact when search returns a hit", async () => {
    vi.stubEnv("HUBSPOT_ACCESS_TOKEN", "fake-token-123");

    fetchMock
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          total: 1,
          results: [{ id: "existing-42" }],
        }),
      })
      .mockResolvedValueOnce({ ok: true, json: async () => ({}) });

    await upsertHubSpotContact(validPayload);

    expect(fetchMock).toHaveBeenCalledTimes(2);

    // Second call → PATCH on the existing contact
    const [updateUrl, updateInit] = fetchMock.mock.calls[1] as [
      string,
      RequestInit,
    ];
    expect(updateUrl).toContain("/crm/v3/objects/contacts/existing-42");
    expect(updateInit.method).toBe("PATCH");
    expect(String(updateInit.body)).toContain(validPayload.email);

    expect(logSpy).toHaveBeenCalledWith(
      expect.stringContaining("Updated contact existing-42")
    );
  });

  // ── Scenario 6 — error branches ────────────────────────────────────────
  it("logs and resolves silently when search returns 5xx", async () => {
    vi.stubEnv("HUBSPOT_ACCESS_TOKEN", "fake-token-123");

    // Search returns ok=false → findContactByEmail returns null → fallback create
    fetchMock
      .mockResolvedValueOnce({
        ok: false,
        json: async () => ({ message: "HubSpot is down" }),
      })
      .mockResolvedValueOnce({
        ok: false,
        json: async () => ({
          status: "error",
          message: "Create failed too",
          category: "RATE_LIMITS",
        }),
      });

    await expect(upsertHubSpotContact(validPayload)).resolves.toBeUndefined();

    expect(errorSpy).toHaveBeenCalledWith(
      expect.stringContaining("CRM sync failed"),
      expect.any(Error)
    );
  });

  it("logs and resolves silently when PATCH returns 5xx", async () => {
    vi.stubEnv("HUBSPOT_ACCESS_TOKEN", "fake-token-123");

    fetchMock
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          total: 1,
          results: [{ id: "existing-42" }],
        }),
      })
      .mockResolvedValueOnce({
        ok: false,
        json: async () => ({
          status: "error",
          message: "Internal server error",
          category: "INTERNAL_ERROR",
        }),
      });

    await expect(upsertHubSpotContact(validPayload)).resolves.toBeUndefined();

    expect(errorSpy).toHaveBeenCalledWith(
      expect.stringContaining("CRM sync failed"),
      expect.any(Error)
    );
  });

  it("logs and resolves silently when fetch throws a network error", async () => {
    vi.stubEnv("HUBSPOT_ACCESS_TOKEN", "fake-token-123");

    fetchMock.mockRejectedValueOnce(new Error("ECONNRESET"));
    // The catch block in upsertHubSpotContact short-circuits before a
    // second fetch call, but we mock one defensively anyway.
    fetchMock.mockRejectedValueOnce(new Error("ECONNRESET"));

    await expect(upsertHubSpotContact(validPayload)).resolves.toBeUndefined();

    expect(errorSpy).toHaveBeenCalled();
  });

  // ── Non-regression : funnel never blocked by CRM errors ────────────────
  it("never throws — the form submit flow is always unblocked", async () => {
    vi.stubEnv("HUBSPOT_ACCESS_TOKEN", "fake-token-123");

    // Brutal failure mode: both calls throw
    fetchMock.mockRejectedValue(new Error("total outage"));

    // Crucially: no .rejects assertion — we assert resolves
    await expect(upsertHubSpotContact(validPayload)).resolves.toBeUndefined();
  });
});
