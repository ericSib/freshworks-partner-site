/**
 * Lighthouse CI configuration.
 *
 * Requires Chrome installed on the CI runner. Run locally with:
 *   npx @lhci/cli autorun
 *
 * Sprint 16 — Core Web Vitals quality gate.
 */
module.exports = {
  ci: {
    collect: {
      url: [
        "http://localhost:3000/fr",
        "http://localhost:3000/en",
        "http://localhost:3000/fr/quiz",
        "http://localhost:3000/fr/mentions-legales",
      ],
      startServerCommand: "npm run start",
      startServerReadyPattern: "Ready",
      startServerReadyTimeout: 30000,
      numberOfRuns: 1,
      settings: {
        chromeFlags: "--headless --no-sandbox",
        onlyCategories: [
          "performance",
          "accessibility",
          "best-practices",
          "seo",
        ],
      },
    },
    assert: {
      assertions: {
        "categories:performance": ["error", { minScore: 0.9 }],
        "categories:accessibility": ["error", { minScore: 0.9 }],
        "categories:best-practices": ["error", { minScore: 0.9 }],
        "categories:seo": ["error", { minScore: 0.9 }],
      },
    },
    upload: {
      target: "temporary-public-storage",
    },
  },
};
