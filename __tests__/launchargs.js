/**
 * Puppeteer launchargs for testing.
 * Makes sure puppeteer can always run in test and dev containers.
 * 
 * Environment Note:
 * Non x86 (the chromium default binary) environments must prep and supply PUPPETEER_EXECUTABLE_PATH
 * 
 * Copyright (c) 2025, Alex Grant <alex@localNerve.com> (https://www.localnerve.com)
 * Licensed under the MIT license.
 */

export const launchArgs = {
  executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || undefined,
  args: [
    '--no-sandbox', 
    '--disable-setuid-sandbox',
    '--disable-dev-shm-usage'
  ]
};