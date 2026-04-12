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
  // Sprint 15: 71.43%. Sprint 16 ratchet to 65%.
  // Ratchet +5% per sprint.
  thresholds: {
    high: 80,
    low: 65,
    break: 65,
  },
  concurrency: 2,
  timeoutMS: 30000,
};

export default config;
