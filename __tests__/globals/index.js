/**
 * Setup the test run globals.
 * Use experimental-test-isolation=none so setup and teardown can access the same globalThis.
 * 
 * Copyright (c) 2025, Alex Grant <alex@localNerve.com> (https://www.localnerve.com)
 * Licensed under the MIT license.
 */
import { before, after } from 'node:test';
import setup from './setup.js';
import teardown from './teardown.js';

before(async () => {
  await setup();
});

after(async () => {
  await teardown();
});