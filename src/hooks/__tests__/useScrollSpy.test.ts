import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useScrollSpy } from "../useScrollSpy";

beforeEach(() => {
  vi.restoreAllMocks();
  // Reset scroll position
  Object.defineProperty(window, "scrollY", { value: 0, writable: true });
});

describe("useScrollSpy", () => {
  it("returns empty string when no sections match", () => {
    const { result } = renderHook(() =>
      useScrollSpy(["services", "about", "contact"], 100)
    );

    expect(result.current).toBe("");
  });

  it("returns the active section when scrolled past its offset", () => {
    // Mock section elements
    const sections = {
      services: { offsetTop: 500 },
      about: { offsetTop: 1000 },
      contact: { offsetTop: 1500 },
    };

    vi.spyOn(document, "getElementById").mockImplementation(
      (id: string) => (sections as Record<string, unknown>)[id] as HTMLElement | null
    );

    const { result } = renderHook(() =>
      useScrollSpy(["services", "about", "contact"], 100)
    );

    // Simulate scroll to 950 → scrollY + offset = 1050, should be past "about" but not "contact"
    act(() => {
      Object.defineProperty(window, "scrollY", { value: 950 });
      window.dispatchEvent(new Event("scroll"));
    });

    expect(result.current).toBe("about");
  });

  it("returns the last section when scrolled to bottom", () => {
    const sections = {
      services: { offsetTop: 500 },
      about: { offsetTop: 1000 },
      contact: { offsetTop: 1500 },
    };

    vi.spyOn(document, "getElementById").mockImplementation(
      (id: string) => (sections as Record<string, unknown>)[id] as HTMLElement | null
    );

    const { result } = renderHook(() =>
      useScrollSpy(["services", "about", "contact"], 100)
    );

    act(() => {
      Object.defineProperty(window, "scrollY", { value: 2000 });
      window.dispatchEvent(new Event("scroll"));
    });

    expect(result.current).toBe("contact");
  });
});
