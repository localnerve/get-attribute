/**
 * Test command from the top
 * 
 * Copyright (c) 2025, Alex Grant <alex@localNerve.com> (https://www.localnerve.com)
 * Licensed under the MIT license.
 */
/* eslint-disable jest/expect-expect */

import path from 'node:path';
import url from 'node:url';
import { expect, describe, jest, test } from '@jest/globals';
import { spawn } from 'node:child_process';
import testServer from './globals/server.js';

const thisDirname = url.fileURLToPath(new URL('.', import.meta.url));

describe('top level invocation', () => {
  const url = `${testServer.config.origin}/twitch-gigaohmbio.html`;
  const selector = 'a[href^="/videos"]';
  const attribute = 'href';
  const useprop = 'true';
  const command = path.resolve(thisDirname, '../bin/get-attribute');

  function exitCode (done, actualCode) {
    done.actualCode = actualCode;
    done();
  }

  function run (expectedCode, args) {
    return new Promise((resolve, reject) => {
      const cp = spawn(command, args, {
        stdio: 'inherit'
      });
      const exit = jest.fn();
      cp.on('error', reject);
      cp.on('exit', exitCode.bind(null, exit));
      cp.on('close', () => {
        expect(exit.actualCode).toEqual(expectedCode);
        expect(exit).toHaveBeenCalled();
        resolve();
      });
    });
  }

  test('no input', () => {
    return run(1, []);
  });

  test('bad args', () => {
    return run(1, ['one', 'two', 'three']);
  });

  test('bad selector', () => {
    return run(2, [
      `--url=${url}`,
      '--selector=nomatch',
      `--attribute=${attribute}`,
      `--timeout=4000`
    ]);
  }, 10000);

  test('good arguments', () => {
    return run(0, [
      `--url=${url}`,
      `--selector=${selector}`,
      `--attribute=${attribute}`,
      `--useprop=${useprop}`
    ]);
  }, 10000);
});