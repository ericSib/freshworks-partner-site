"use client";

import { useState } from "react";
import { ITSM_CONFIG, CX_CONFIG, type QuizSegment } from "@/config/quiz";
import QuizSelector from "./QuizSelector";
import QuizContainer from "./QuizContainer";

/**
 * Top-level quiz orchestrator — manages the full journey:
 *
 * 1. Segment selection (ITSM vs CX) — QuizSelector
 * 2. Demographics + Questions + Results — QuizContainer (with segment-specific config)
 *
 * The user MUST choose their track before seeing any questions.
 * ITSM and CX have different questions, dimensions, weights, and recommendations.
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
  const config = selectedSegment === "cx" ? CX_CONFIG : ITSM_CONFIG;

  return (
    <section className="relative">
      <QuizContainer
        config={config}
        onRestart={() => setSelectedSegment(null)}
      />
    </section>
  );
}
