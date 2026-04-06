"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

interface StaggerChildrenProps {
  children: React.ReactNode[];
  staggerDelay?: number;
  duration?: number;
  className?: string;
  threshold?: number;
}

export default function StaggerChildren({
  children,
  staggerDelay = 100,
  duration = 600,
  className = "",
  threshold = 0.1,
}: StaggerChildrenProps) {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>({ threshold });

  return (
    <div ref={ref} className={className}>
      {children.map((child, i) => (
        <div
          key={i}
          className={`transition-all ease-out ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-6"
          }`}
          style={{
            transitionDuration: `${duration}ms`,
            transitionDelay: isVisible ? `${i * staggerDelay}ms` : "0ms",
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
}
