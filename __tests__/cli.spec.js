/**
 * Test the cli module
 * 
 * Copyright (c) 2025, Alex Grant <alex@localNerve.com> (https://www.localnerve.com)
 * Licensed under the MIT license.
 */
import assert from 'node:assert';
import { describe, it } from 'node:test';
import getArgs from '../lib/cli.js';

describe('get-args', () => {
  const noargs = [];
  const badargs = ['one', 'two', 'three'];
  const url = 'https://host.dom';
  const selector = 'a[href^=/videos]';
  const attribute = 'href';
  const useprop = true;
  const timeout = 5000;
  const headless = true;
  const goodargs = ['one', 'two', `--url=${url}`, `--selector=${selector}`, `--attribute=${attribute}`];
  const allargs = [
    'one',
    'two',
    `--url=${url}`,
    `--selector=${selector}`,
    `--attribute=${attribute}`,
    `--useprop=${useprop}`,
    `--timeout=${timeout}`,
    `--launchargs=${JSON.stringify({
      headless
    })}`
  ];

  it('no arguments', () => {
    const args = getArgs(noargs);
    assert.ok(args === null);
  });

  it('bad arguments', () => {
    const args = getArgs(badargs);
    assert.ok(args === null);
  });

  it('bad useprop', () => {
    const badUseProp = allargs.slice();
    badUseProp[5] = '--useprop=monkey';
    const args = getArgs(badUseProp);
    assert.ok(args === null);
  });

  it('bad timeout', () => {
    const badTimeout = allargs.slice();
    badTimeout[6] = '--timeout=monkey';
    const args = getArgs(badTimeout);
    assert.ok(args === null);
  });

  it('bad launchargs', () => {
    const badLaunchArgs = allargs.slice();
    badLaunchArgs[7] = '--launchargs=monkey';
    const args = getArgs(badLaunchArgs);
    assert.ok(args === null);
  });

  it('incomplete args', () => {
    const args = getArgs(goodargs.slice(3));
    assert.ok(args === null);
  });

  it('good args', () => {
    const args = getArgs(goodargs);
    assert.ok(args !== null);
    assert.strictEqual(args.url, url);
    assert.strictEqual(args.selector, selector);
    assert.strictEqual(args.attribute, attribute);
  });

  it('complete args', () => {
    const args = getArgs(allargs);
    assert.ok(args !== null);
    assert.strictEqual(args.url, url);
    assert.strictEqual(args.selector, selector);
    assert.strictEqual(args.attribute, attribute);
    assert.strictEqual(args.useprop, useprop);
    assert.strictEqual(args.timeout, timeout);
    assert.deepStrictEqual(args.launchargs, {headless});
  });
});