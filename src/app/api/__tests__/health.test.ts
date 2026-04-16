import { describe, it, expect, vi, afterEach } from "vitest";
import { GET } from "@/app/api/health/route";

function createRequest(deep = false): Request {
  const url = deep
    ? "http://localhost:3000/api/health?deep=1"
    : "http://localhost:3000/api/health";
  return new Request(url);
}

describe("GET /api/health", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it("returns 200 status for shallow check", async () => {
    const response = await GET(createRequest());
    expect(response.status).toBe(200);
  });

  it("returns body with status, timestamp, and version", async () => {
    const response = await GET(createRequest());
    const json = await response.json();

    expect(json).toHaveProperty("status", "ok");
    expect(json).toHaveProperty("timestamp");
    expect(typeof json.timestamp).toBe("string");
    expect(json).toHaveProperty("version");
    expect(typeof json.version).toBe("string");
  });

  it("returns a valid ISO 8601 timestamp", async () => {
    const response = await GET(createRequest());
    const json = await response.json();

    const parsed = new Date(json.timestamp);
    expect(parsed.toISOString()).toBe(json.timestamp);
    expect(Number.isNaN(parsed.getTime())).toBe(false);
  });

  it("does not include dependencies in shallow check", async () => {
    const response = await GET(createRequest());
    const json = await response.json();

    expect(json.dependencies).toBeUndefined();
  });

  it("includes dependencies in deep check when tokens are missing", async () => {
    vi.stubEnv("HUBSPOT_ACCESS_TOKEN", "");
    vi.stubEnv("RESEND_API_KEY", "");

    const response = await GET(createRequest(true));
    const json = await response.json();

    expect(json.dependencies).toHaveLength(2);
    expect(json.dependencies).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: "hubspot", status: "unavailable" }),
        expect.objectContaining({ name: "resend", status: "unavailable" }),
      ])
    );
  });
});
