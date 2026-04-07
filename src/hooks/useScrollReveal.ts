"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

function getPrefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

interface UseScrollRevealOptions {
  threshold?: number;
  once?: boolean;
}

export function useScrollReveal<T extends HTMLElement = HTMLDivElement>({
  threshold = 0.15,
  once = true,
}: UseScrollRevealOptions = {}) {
  const ref = useRef<T>(null);
  const reducedMotion = useSyncExternalStore(
    () => () => {},
    getPrefersReducedMotion,
    () => false
  );
  const [isVisible, setIsVisible] = useState(reducedMotion);

  useEffect(() => {
    if (reducedMotion) return;

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.unobserve(el);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, once, reducedMotion]);

  return { ref, isVisible };
}
