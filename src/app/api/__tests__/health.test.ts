import { describe, it, expect } from "vitest";
import { GET } from "@/app/api/health/route";

describe("GET /api/health", () => {
  it("returns 200 status", async () => {
    const response = await GET();

    expect(response.status).toBe(200);
  });

  it("returns body with status, timestamp, and version", async () => {
    const response = await GET();
    const json = await response.json();

    expect(json).toHaveProperty("status", "ok");
    expect(json).toHaveProperty("timestamp");
    expect(typeof json.timestamp).toBe("string");
    expect(json).toHaveProperty("version");
    expect(typeof json.version).toBe("string");
  });

  it("returns a valid ISO 8601 timestamp", async () => {
    const response = await GET();
    const json = await response.json();

    const parsed = new Date(json.timestamp);
    expect(parsed.toISOString()).toBe(json.timestamp);
    expect(Number.isNaN(parsed.getTime())).toBe(false);
  });
});
