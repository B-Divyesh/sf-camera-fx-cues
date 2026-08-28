import { defineConfig } from '@playwright/test';

const baseURL = process.env.PLAYWRIGHT_BASE_URL || 'http://127.0.0.1:4173';

export default defineConfig({
  testDir: './tests',
  timeout: 30_000,
  use: {
    baseURL,
    headless: true,
    launchOptions: { args: ['--use-fake-device-for-media-stream', '--use-fake-ui-for-media-stream'] }
  },
  webServer: process.env.PLAYWRIGHT_BASE_URL ? undefined : { command: 'npm run build && npm run preview -- --host 127.0.0.1 --port 4173', port: 4173, reuseExistingServer: !process.env.CI }
});
