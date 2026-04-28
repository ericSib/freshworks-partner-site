import "@testing-library/jest-dom/vitest";
import { vi, beforeEach } from "vitest";

/**
 * Shared localStorage mock (T33 / D11 retro S20).
 *
 * Reasoning : 2 test files used to install their own
 * `Object.defineProperty(global, "localStorage", ...)` mock. The
 * analytics.test.ts mock leaked across files, and `vi.clearAllMocks()`
 * in CookieBanner.test.tsx wiped the `vi.fn()` from the leaked store
 * mock — every CookieBanner test failed at first run with
 * "localStorage.setItem is not a function".
 *
 * Centralizing here with a fresh mock per `beforeEach` eliminates
 * cross-file leak. Each test sees a clean store and fresh `vi.fn()`
 * instances, so `vi.clearAllMocks()` no longer breaks anything.
 */
function createLocalStorageMock(): Storage {
  const store: Record<string, string> = {};
  return {
    getItem: vi.fn((key: string) => store[key] ?? null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = String(value);
    }),
    removeItem: vi.fn((key: string) => {
      delete store[key];
    }),
    clear: vi.fn(() => {
      Object.keys(store).forEach((k) => delete store[k]);
    }),
    key: vi.fn((i: number) => Object.keys(store)[i] ?? null),
    get length() {
      return Object.keys(store).length;
    },
  };
}

beforeEach(() => {
  Object.defineProperty(globalThis, "localStorage", {
    value: createLocalStorageMock(),
    writable: true,
    configurable: true,
  });
});
