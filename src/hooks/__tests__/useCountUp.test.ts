import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook } from "@testing-library/react";
import { useCountUp } from "../useCountUp";

beforeEach(() => {
  vi.restoreAllMocks();
  vi.stubGlobal(
    "matchMedia",
    vi.fn().mockReturnValue({ matches: false })
  );

  vi.stubGlobal(
    "IntersectionObserver",
    vi.fn(() => ({
      observe: vi.fn(),
      unobserve: vi.fn(),
      disconnect: vi.fn(),
    }))
  );
});

describe("useCountUp", () => {
  it("starts at 0 when reduced motion is disabled", () => {
    const { result } = renderHook(() => useCountUp({ end: 100 }));
    expect(result.current.count).toBe(0);
  });

  it("starts at end value when reduced motion is enabled", () => {
    vi.stubGlobal(
      "matchMedia",
      vi.fn().mockReturnValue({ matches: true })
    );

    const { result } = renderHook(() => useCountUp({ end: 100 }));
    expect(result.current.count).toBe(100);
  });

  it("returns isVisible=false before intersection", () => {
    const { result } = renderHook(() => useCountUp({ end: 50 }));
    expect(result.current.isVisible).toBe(false);
  });

  it("returns a ref object", () => {
    const { result } = renderHook(() => useCountUp({ end: 50 }));
    expect(result.current.ref).toBeDefined();
    expect(result.current.ref.current).toBeNull();
  });

  it("starts visible and at end value with reduced motion", () => {
    vi.stubGlobal(
      "matchMedia",
      vi.fn().mockReturnValue({ matches: true })
    );

    const { result } = renderHook(() => useCountUp({ end: 42 }));
    expect(result.current.isVisible).toBe(true);
    expect(result.current.count).toBe(42);
  });
});
