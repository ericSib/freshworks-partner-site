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
  // Sprint 14 baseline: 56.04%. Sprint 15: 71.43% after hubspot.ts tests.
  // Ratchet +5% per sprint.
  thresholds: {
    high: 80,
    low: 60,
    break: 60,
  },
  concurrency: 2,
  timeoutMS: 30000,
};

export default config;
