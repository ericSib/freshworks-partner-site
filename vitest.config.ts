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
      // Sprint 15→16: 75 → 80 (branches 65 → 70). Sprint 18 cible 85.
      // Current post-Sprint 15 snapshot:
      //   lines 92.96% / branches 83.42% / functions 90.9% / statements 92.03%
      thresholds: {
        lines: 80,
        branches: 70,
        functions: 80,
        statements: 80,
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
