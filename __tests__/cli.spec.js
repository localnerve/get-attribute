/**
 * Test the cli module
 */
const getArgs = require('../lib/cli');

describe('get-args', () => {
  const noargs = [];
  const badargs = ['one', 'two', 'three'];
  const url = 'https://host.dom';
  const selector = 'a[href^=/videos]';
  const attribute = 'href';
  const goodargs = ['one', 'two', `--url=${url}`, `--selector=${selector}`, `--attribute=${attribute}`];

  test('no arguments', () => {
    const args = getArgs(noargs);
    expect(args).toBeNull();
  });

  test('bad arguments', () => {
    const args = getArgs(badargs);
    expect(args).toBeNull();
  });

  test('incomplete args', () => {
    const args = getArgs(goodargs.slice(3));
    expect(args).toBeNull();
  });

  test('complete args', () => {
    const args = getArgs(goodargs);
    expect(args).not.toBeNull();
    expect(args.url).toEqual(url);
    expect(args.selector).toEqual(selector);
    expect(args.attribute).toEqual(attribute);
  });
});