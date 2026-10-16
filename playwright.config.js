// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
testDir: './tests',

// Test execution settings
timeout: 30000,
expect: {
timeout: 10000,
},

// Run tests one at a time
fullyParallel: false,
workers: 1,

// Retry failed tests on CI
forbidOnly: !!process.env.CI,
retries: process.env.CI ? 2 : 0,

// Test report
reporter: 'html',

// Shared browser settings
use: {
actionTimeout: 10000,
navigationTimeout: 30000,

trace: 'retain-on-failure',
screenshot: 'only-on-failure',

},

// Browser project
projects: [
{
name: 'chromium',
use: {
...devices['Desktop Chrome'],
baseURL: 'https://www.saucedemo.com',
headless: false,
launchOptions: {
slowMo: 1000,
},
},
},
],
});

