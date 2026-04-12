/** @type {import('@stryker-mutator/api/core').PartialStrykerOptions} */
const config = {
  testRunner: "vitest",
  vitest: {
    configFile: "vitest.config.ts",
  },
  mutate: [
    "src/lib/validation.ts",
    "src/lib/rate-limit.ts",
    "src/lib/analytics.ts",
    "src/lib/quiz/hubspot.ts",
    "src/hooks/useQuizSubmit.ts",
  ],
  reporters: ["clear-text", "html"],
  // Initial baseline: 56.04% (Sprint 14). Ratchet +5% per sprint.
  // hubspot.ts drags the score (26%) — infra wrappers are hard to
  // mutation-test without a real HTTP client mock.
  thresholds: {
    high: 80,
    low: 55,
    break: 55,
  },
  concurrency: 2,
  timeoutMS: 30000,
};

export default config;
