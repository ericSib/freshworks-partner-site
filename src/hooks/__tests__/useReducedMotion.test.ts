import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useReducedMotion } from "../useReducedMotion";

// ── Mock infrastructure ─────────────────────────────────────────────

type ChangeListener = () => void;

/** Create a controllable matchMedia mock that supports change events. */
function createMqlMock(initialMatches: boolean) {
  let matches = initialMatches;
  const listeners: Set<ChangeListener> = new Set();

  const mql = {
    get matches() {
      return matches;
    },
    addEventListener: vi.fn((_event: string, cb: ChangeListener) => {
      listeners.add(cb);
    }),
    removeEventListener: vi.fn((_event: string, cb: ChangeListener) => {
      listeners.delete(cb);
    }),
  };

  return {
    mql,
    /** Simulate the user toggling the OS reduced-motion setting. */
    toggle() {
      matches = !matches;
      listeners.forEach((cb) => cb());
    },
    listeners,
  };
}

// ── Tests ────────────────────────────────────────────────────────────

describe("useReducedMotion", () => {
  let mock: ReturnType<typeof createMqlMock>;

  beforeEach(() => {
    mock = createMqlMock(false);
    vi.stubGlobal("matchMedia", vi.fn().mockReturnValue(mock.mql));
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("returns false when prefers-reduced-motion is not active", () => {
    const { result } = renderHook(() => useReducedMotion());
    expect(result.current).toBe(false);
  });

  it("returns true when prefers-reduced-motion is active", () => {
    mock = createMqlMock(true);
    vi.stubGlobal("matchMedia", vi.fn().mockReturnValue(mock.mql));

    const { result } = renderHook(() => useReducedMotion());
    expect(result.current).toBe(true);
  });

  it("queries the correct media query string", () => {
    renderHook(() => useReducedMotion());

    expect(window.matchMedia).toHaveBeenCalledWith(
      "(prefers-reduced-motion: reduce)"
    );
  });

  it("subscribes to change events on mount", () => {
    renderHook(() => useReducedMotion());
    expect(mock.mql.addEventListener).toHaveBeenCalledWith(
      "change",
      expect.any(Function)
    );
  });

  it("unsubscribes from change events on unmount", () => {
    const { unmount } = renderHook(() => useReducedMotion());
    unmount();

    expect(mock.mql.removeEventListener).toHaveBeenCalledWith(
      "change",
      expect.any(Function)
    );
  });

  it("reacts to OS setting change mid-session", () => {
    const { result } = renderHook(() => useReducedMotion());
    expect(result.current).toBe(false);

    act(() => {
      mock.toggle();
    });

    expect(result.current).toBe(true);
  });

  it("reacts to toggling back to no-preference", () => {
    mock = createMqlMock(true);
    vi.stubGlobal("matchMedia", vi.fn().mockReturnValue(mock.mql));

    const { result } = renderHook(() => useReducedMotion());
    expect(result.current).toBe(true);

    act(() => {
      mock.toggle();
    });

    expect(result.current).toBe(false);
  });
});
