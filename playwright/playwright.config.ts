/**
 * Playwright Configuration for Focus System Tests
 *
 * Reference: docs/architecture/FOCUS_AUTHORITY.md
 *
 * Setup:
 * 1. pnpm add -D @playwright/test
 * 2. npx playwright install
 * 3. pnpm run test:focus
 */

import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  use: {
    baseURL: "http://localhost:6006",
    trace: "on-first-retry",
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],

  webServer: {
    command: "pnpm storybook",
    url: "http://localhost:6006",
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  },
});
