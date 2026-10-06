/**
 * Vitest Configuration
 * ======================
 *
 * Configuration for the Vitest testing framework.
 * Vitest is a Vite-native testing framework that's fast and compatible
 * with the existing Vite setup.
 *
 * Features:
 * - React Testing Library support via jsdom environment
 * - Global test utilities (describe, it, expect)
 * - Path aliases matching vite.config.js
 * - Coverage reporting ready
 *
 * Run tests:
 *   npm test          # Run tests in watch mode
 *   npm run test:coverage  # Generate coverage report
 */

import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],

  test: {
    // Use jsdom for DOM testing (React components)
    environment: "jsdom",

    // Make test globals available (describe, it, expect, etc.)
    globals: true,

    // Setup file to run before each test file
    setupFiles: ["./src/client/__tests__/setup.js"],

    // Include patterns for test files
    include: ["src/**/*.{test,spec}.{js,jsx}"],

    // Exclude patterns
    exclude: ["node_modules", "dist"],

    // Coverage configuration
    coverage: {
      reporter: ["text", "json", "html"],
      exclude: [
        "node_modules/",
        "src/**/__tests__/**",
        "src/**/*.test.{js,jsx}",
        "src/**/*.spec.{js,jsx}",
      ],
    },
  },

  // Path aliases (same as vite.config.js)
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
