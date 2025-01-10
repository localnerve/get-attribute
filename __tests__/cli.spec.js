/**
 * Test the cli module
 * 
 * Copyright (c) 2025, Alex Grant <alex@localNerve.com> (https://www.localnerve.com)
 * Licensed under the MIT license.
 */
const getArgs = require('../lib/cli');

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
      headless: true
    })}`
  ];

  test('no arguments', () => {
    const args = getArgs(noargs);
    expect(args).toBeNull();
  });

  test('bad arguments', () => {
    const args = getArgs(badargs);
    expect(args).toBeNull();
  });

  test('bad useprop', () => {
    const badUseProp = allargs.slice();
    badUseProp[5] = '--useprop=monkey';
    const args = getArgs(badUseProp);
    expect(args).toBeNull();
  });

  test('bad timeout', () => {
    const badTimeout = allargs.slice();
    badTimeout[6] = '--timeout=monkey';
    const args = getArgs(badTimeout);
    expect(args).toBeNull();
  });

  test('bad launchargs', () => {
    const badLaunchArgs = allargs.slice();
    badLaunchArgs[7] = '--launchargs=monkey';
    args = getArgs(badLaunchArgs);
    expect(args).toBeNull();
  });

  test('incomplete args', () => {
    const args = getArgs(goodargs.slice(3));
    expect(args).toBeNull();
  });

  test('good args', () => {
    const args = getArgs(goodargs);
    expect(args).not.toBeNull();
    expect(args.url).toEqual(url);
    expect(args.selector).toEqual(selector);
    expect(args.attribute).toEqual(attribute);
  });

  test('complete args', () => {
    const args = getArgs(allargs);
    expect(args).not.toBeNull();
    expect(args.url).toEqual(url);
    expect(args.selector).toEqual(selector);
    expect(args.attribute).toEqual(attribute);
    expect(args.useprop).toEqual(useprop);
    expect(args.timeout).toEqual(timeout);
    expect(args.launchargs).toEqual({headless});
  });
});