"use client";

import { useEffect, useState } from "react";

interface TextRevealProps {
  text: string;
  className?: string;
  delayPerWord?: number;
  initialDelay?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
}

export default function TextReveal({
  text,
  className = "",
  delayPerWord = 60,
  initialDelay = 300,
  as: Tag = "h1",
}: TextRevealProps) {
  const [isReady, setIsReady] = useState(false);
  const words = text.split(" ");

  useEffect(() => {
    // Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      setIsReady(true);
      return;
    }

    const timer = setTimeout(() => setIsReady(true), initialDelay);
    return () => clearTimeout(timer);
  }, [initialDelay]);

  return (
    <Tag className={className}>
      {words.map((word, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden mr-[0.3em] last:mr-0"
        >
          <span
            className={`inline-block transition-all duration-500 ease-out ${
              isReady
                ? "translate-y-0 opacity-100"
                : "translate-y-[110%] opacity-0"
            }`}
            style={{
              transitionDelay: isReady ? `${i * delayPerWord}ms` : "0ms",
            }}
          >
            {word}
          </span>
        </span>
      ))}
    </Tag>
  );
}
