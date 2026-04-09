import { vi } from "vitest";

/**
 * Mock matchMedia with addEventListener support.
 * Required by useReducedMotion which subscribes to 'change' events.
 */
export function mockMatchMedia(matches: boolean) {
  vi.stubGlobal(
    "matchMedia",
    vi.fn().mockReturnValue({
      matches,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })
  );
}
