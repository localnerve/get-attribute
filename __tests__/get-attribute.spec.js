/**
 * Test the get attribute module
 */
const getAttr = require('../lib/get-attribute');
const {config:testConfig} = require('./globals/server.js');

describe('get-attribute', () => {
  const origin = testConfig.origin;
  // These match inside the test fixture:
  const selector = 'a[href^="/videos"]';
  const attribute = 'href';

  const url = `${testConfig.origin}/twitch-gigaohmbio.html`;

  test('should get attribute', async () => {    
    const value = await getAttr(url, selector, attribute);

    expect(value?.split('/')).toContain('videos');
    expect(value).toEqual(expect.stringMatching(/^\/videos/));
  }, 10000);

  test('should get prop', async () => {
    const value = await getAttr(url, selector, attribute, {
      useProp: true
    });

    expect(value?.split('/')).toContain('videos');
    expect(value).toEqual(expect.stringMatching(new RegExp(`^${origin}`)));
  }, 10000);
});