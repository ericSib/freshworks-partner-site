"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

type AnimationVariant =
  | "fade-up"
  | "fade-down"
  | "fade-left"
  | "fade-right"
  | "fade"
  | "scale";

interface AnimateOnScrollProps {
  children: React.ReactNode;
  variant?: AnimationVariant;
  delay?: number;
  duration?: number;
  className?: string;
  threshold?: number;
}

const variantStyles: Record<AnimationVariant, { from: string; to: string }> = {
  "fade-up": {
    from: "opacity-0 translate-y-6",
    to: "opacity-100 translate-y-0",
  },
  "fade-down": {
    from: "opacity-0 -translate-y-6",
    to: "opacity-100 translate-y-0",
  },
  "fade-left": {
    from: "opacity-0 translate-x-8",
    to: "opacity-100 translate-x-0",
  },
  "fade-right": {
    from: "opacity-0 -translate-x-8",
    to: "opacity-100 translate-x-0",
  },
  fade: {
    from: "opacity-0",
    to: "opacity-100",
  },
  scale: {
    from: "opacity-0 scale-95",
    to: "opacity-100 scale-100",
  },
};

export default function AnimateOnScroll({
  children,
  variant = "fade-up",
  delay = 0,
  duration = 600,
  className = "",
  threshold = 0.15,
}: AnimateOnScrollProps) {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>({ threshold });
  const { from, to } = variantStyles[variant];

  return (
    <div
      ref={ref}
      className={`transition-all ease-out ${isVisible ? to : from} ${className}`}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}
