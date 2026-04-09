import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook } from "@testing-library/react";
import { useScrollReveal } from "../useScrollReveal";
import { mockMatchMedia } from "./test-helpers";

let observerCallbacks: Map<Element, IntersectionObserverCallback>;

beforeEach(() => {
  vi.restoreAllMocks();
  observerCallbacks = new Map();
  mockMatchMedia(false);

  vi.stubGlobal(
    "IntersectionObserver",
    vi.fn((cb: IntersectionObserverCallback) => ({
      observe: (el: Element) => {
        observerCallbacks.set(el, cb);
      },
      unobserve: vi.fn(),
      disconnect: vi.fn(),
    }))
  );
});

describe("useScrollReveal", () => {
  it("starts not visible", () => {
    const { result } = renderHook(() => useScrollReveal());
    expect(result.current.isVisible).toBe(false);
  });

  it("starts visible immediately when prefers-reduced-motion is active", () => {
    mockMatchMedia(true);
    const { result } = renderHook(() => useScrollReveal());
    expect(result.current.isVisible).toBe(true);
  });

  it("does not create an IntersectionObserver when prefers-reduced-motion is active", () => {
    mockMatchMedia(true);
    renderHook(() => useScrollReveal());
    expect(observerCallbacks.size).toBe(0);
  });

  it("returns a ref object", () => {
    const { result } = renderHook(() => useScrollReveal());
    expect(result.current.ref).toBeDefined();
    expect(result.current.ref.current).toBeNull();
  });
});
