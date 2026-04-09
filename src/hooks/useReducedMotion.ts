"use client";

import { useCallback, useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function getSnapshot(): boolean {
  return window.matchMedia(QUERY).matches;
}

function getServerSnapshot(): boolean {
  return false;
}

/**
 * Reactive hook for `prefers-reduced-motion`.
 *
 * Unlike a one-shot read, this subscribes to changes via
 * `matchMedia.addEventListener('change', ...)` so the UI updates
 * immediately if the user toggles the OS setting mid-session.
 */
export function useReducedMotion(): boolean {
  const subscribe = useCallback((onStoreChange: () => void) => {
    const mql = window.matchMedia(QUERY);
    mql.addEventListener("change", onStoreChange);
    return () => mql.removeEventListener("change", onStoreChange);
  }, []);

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
