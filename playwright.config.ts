import { defineConfig, devices } from "@playwright/test";
export default defineConfig({
  testDir: "./tests",
  testMatch: "*.spec.ts",
  fullyParallel: true,
  use: {
    baseURL: "http://localhost:3107",
    screenshot: "only-on-failure",
  },
  projects: [
    {
      name: "mobile-safari",
      use: {
        ...devices["iPhone 13"],
        browserName: "webkit",
      },
    },
    {
      name: "desktop",
      use: {
        ...devices["Desktop Chrome"],
        channel: process.env.CI ? undefined : "chrome",
        viewport: { width: 1440, height: 1000 },
      },
    },
    {
      name: "mobile",
      use: {
        ...devices["iPhone 13"],
        defaultBrowserType: "chromium",
        channel: process.env.CI ? undefined : "chrome",
      },
    },
  ],
  webServer: {
    command: "npm run start -- --port 3107",
    url: "http://localhost:3107",
    reuseExistingServer: !process.env.CI,
  },
});
