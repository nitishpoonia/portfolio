import { defineConfig } from "@playwright/test";

// Browser smoke test: `npm run test:e2e` builds nothing itself; it starts the
// production server (`next start`) on an in-memory database filled from content/.
// Run `DATABASE_URL=pglite:memory npm run build` first (CI does).
const PORT = 3100;
export default defineConfig({
  testDir: "e2e",
  timeout: 30_000,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL: `http://localhost:${PORT}`,
    // Locally you can point at an installed Chrome instead of downloading one.
    launchOptions: process.env.PW_CHROME ? { executablePath: process.env.PW_CHROME } : {},
  },
  webServer: {
    command: `npx next start -p ${PORT}`,
    port: PORT,
    env: { DATABASE_URL: "pglite:memory" },
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
});
