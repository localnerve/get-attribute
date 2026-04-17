/**
 * Test command from the top
 * 
 * Copyright (c) 2025, Alex Grant <alex@localNerve.com> (https://www.localnerve.com)
 * Licensed under the MIT license.
 */

import path from 'node:path';
import url from 'node:url';
import assert from 'node:assert';
import { describe, it } from 'node:test';
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

  function run (t, expectedCode, args) {
    return new Promise((resolve, reject) => {
      const cp = spawn(command, args, {
        stdio: 'inherit'
      });
      const exit = t.mock.fn();
      cp.on('error', reject);
      cp.on('exit', exitCode.bind(null, exit));
      cp.on('close', () => {
        assert.strictEqual(exit.actualCode, expectedCode);
        assert.strictEqual(exit.mock.callCount(), 1);
        resolve();
      });
    });
  }

  it('no input', t => {
    return run(t, 1, []);
  });

  it('bad args', t => {
    return run(t, 1, ['one', 'two', 'three']);
  });

  it('bad selector', t => {
    return run(t, 2, [
      `--url=${url}`,
      '--selector=nomatch',
      `--attribute=${attribute}`,
      `--timeout=4000`
    ]);
  }, 10000);

  it('good arguments', t => {
    return run(t, 0, [
      `--url=${url}`,
      `--selector=${selector}`,
      `--attribute=${attribute}`,
      `--useprop=${useprop}`
    ]);
  }, 10000);
});