import { describe, it, expect } from "vitest";
import { getRequestId, REQUEST_ID_HEADER } from "@/lib/request-id";

describe("getRequestId", () => {
  it("returns existing x-request-id header if present", () => {
    const request = new Request("https://example.com", {
      headers: { "x-request-id": "existing-123" },
    });

    expect(getRequestId(request)).toBe("existing-123");
  });

  it("generates a UUID when no x-request-id header present", () => {
    const request = new Request("https://example.com");
    const id = getRequestId(request);

    // UUID v4 format: 8-4-4-4-12 hex characters
    expect(id).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/
    );
  });

  it("generates unique IDs for different requests", () => {
    const req1 = new Request("https://example.com");
    const req2 = new Request("https://example.com");

    expect(getRequestId(req1)).not.toBe(getRequestId(req2));
  });

  it("exports the header name constant", () => {
    expect(REQUEST_ID_HEADER).toBe("x-request-id");
  });
});
