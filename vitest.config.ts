import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
    include: ["src/**/*.test.{ts,tsx}"],
    coverage: {
      provider: "v8",
      include: ["src/hooks/**", "src/lib/**", "src/app/api/**"],
      reporter: ["text", "lcov"],
      // D13 — incremental ratchet of the coverage gate: +10 pts per sprint.
      // Sprint 14: 60 → 70 (branches 50 → 60). Sprint 16 cible 80.
      // Current post-Sprint 14 snapshot:
      //   lines 86.12% / branches 75.40% / functions 83.11% / statements 85.24%
      thresholds: {
        lines: 70,
        branches: 60,
        functions: 70,
        statements: 70,
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
