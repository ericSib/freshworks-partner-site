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
      // D13 — incremental ratchet of the coverage gate.
      // Sprint 13→14: 70 → 75 (branches 60 → 65). Sprint 16 cible 80.
      // Current post-Sprint 13 snapshot:
      //   lines 88.40% / branches 77.54% / functions 87.01% / statements 87.57%
      thresholds: {
        lines: 75,
        branches: 65,
        functions: 75,
        statements: 75,
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
