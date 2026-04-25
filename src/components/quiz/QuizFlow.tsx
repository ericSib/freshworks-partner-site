"use client";

import { useState } from "react";
import {
  ITSM_CONFIG,
  CX_CONFIG,
  ESM_CONFIG,
  type QuizConfig,
  type QuizSegment,
} from "@/config/quiz";
import QuizSelector from "./QuizSelector";
import QuizContainer from "./QuizContainer";

const CONFIG_BY_SEGMENT: Record<QuizSegment, QuizConfig> = {
  itsm: ITSM_CONFIG,
  cx: CX_CONFIG,
  esm: ESM_CONFIG,
};

/**
 * Top-level quiz orchestrator — manages the full journey:
 *
 * 1. Segment selection (ITSM / CX / ESM) — QuizSelector
 * 2. Demographics + Questions + Results — QuizContainer (with segment-specific config)
 *
 * The user MUST choose their track before seeing any questions.
 * Each segment has its own questions, dimensions, weights, and recommendations.
 */
export default function QuizFlow() {
  const [selectedSegment, setSelectedSegment] = useState<QuizSegment | null>(
    null
  );

  // Phase 1: Segment selection
  if (!selectedSegment) {
    return <QuizSelector onSelect={setSelectedSegment} />;
  }

  // Phase 2: Quiz with segment-specific config
  return (
    <section className="relative">
      <QuizContainer
        config={CONFIG_BY_SEGMENT[selectedSegment]}
        onRestart={() => setSelectedSegment(null)}
      />
    </section>
  );
}
