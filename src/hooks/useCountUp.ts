"use client";

import { useEffect, useState } from "react";
import { useScrollReveal } from "./useScrollReveal";
import { useReducedMotion } from "./useReducedMotion";

interface UseCountUpOptions {
  end: number;
  duration?: number;
  delay?: number;
}

export function useCountUp<T extends HTMLElement = HTMLDivElement>({
  end,
  duration = 2000,
  delay = 0,
}: UseCountUpOptions) {
  const { ref, isVisible } = useScrollReveal<T>({ threshold: 0.3 });
  const reducedMotion = useReducedMotion();
  const [count, setCount] = useState(reducedMotion ? end : 0);

  useEffect(() => {
    if (!isVisible || reducedMotion) return;

    const timeout = setTimeout(() => {
      const startTime = performance.now();

      const animate = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setCount(Math.round(eased * end));

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    }, delay);

    return () => clearTimeout(timeout);
  }, [isVisible, end, duration, delay, reducedMotion]);

  return { ref, count, isVisible };
}
