import { describe, it, expect } from "vitest";
import { splitName, buildProperties } from "@/lib/hubspot";

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
