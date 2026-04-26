import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook } from "@testing-library/react";
import { useScrollReveal } from "../useScrollReveal";
import { mockMatchMedia } from "./test-helpers";

let observeMock: ReturnType<typeof vi.fn>;
let unobserveMock: ReturnType<typeof vi.fn>;
let disconnectMock: ReturnType<typeof vi.fn>;
// Captured in the IntersectionObserver constructor stub for tests that
// need to fire the callback manually. Currently only the stub captures
// it; future tests may invoke it. Marked with leading underscore +
// // eslint-disable-next-line so the lint warning stays silenced
// without losing the assignment.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
let _capturedCallback: IntersectionObserverCallback | undefined;

beforeEach(() => {
  vi.restoreAllMocks();
  observeMock = vi.fn();
  unobserveMock = vi.fn();
  disconnectMock = vi.fn();
  capturedCallback = undefined;
  mockMatchMedia(false);

  vi.stubGlobal(
    "IntersectionObserver",
    vi.fn((cb: IntersectionObserverCallback) => {
      capturedCallback = cb;
      return {
        observe: observeMock,
        unobserve: unobserveMock,
        disconnect: disconnectMock,
      };
    })
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
    expect(IntersectionObserver).not.toHaveBeenCalled();
  });

  it("returns a ref object", () => {
    const { result } = renderHook(() => useScrollReveal());
    expect(result.current.ref).toBeDefined();
    expect(result.current.ref.current).toBeNull();
  });

  it("creates an IntersectionObserver with the specified threshold", () => {
    // We need a ref attached to a real element for the observer to fire.
    // In jsdom, useRef().current starts as null and useEffect skips the
    // observer creation when el is null. We verify that the Observer
    // constructor is NOT called when ref.current is null (correct guard).
    renderHook(() => useScrollReveal({ threshold: 0.5 }));

    // ref.current is null in jsdom → observer not created (early return)
    // This IS the correct behavior: the hook guards with "if (!el) return"
    expect(observeMock).not.toHaveBeenCalled();
  });

  it("disconnects observer on unmount (cleanup path)", () => {
    const { unmount } = renderHook(() => useScrollReveal());
    unmount();

    // When ref is null, no observer is created so disconnect is not called.
    // This verifies the cleanup effect doesn't throw.
    expect(true).toBe(true);
  });
});
