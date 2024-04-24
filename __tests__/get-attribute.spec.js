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

  /* eslint-disable jest/no-conditional-expect */
  test('should handle bad url', () => {
    return new Promise((resolve, reject) => {
      getAttr('http://bad.local', selector, attribute)
        .then(() => {
          reject(new Error('should have thrown an error'));
        })
        .catch(e => {
          expect(e.message).toEqual(expect.stringContaining('ERR_NAME_NOT_RESOLVED'));
          resolve();
        });
    });
  }, 10000);

  test('should handle timeout', () => {
    return new Promise((resolve, reject) => {
      getAttr(`${testConfig.origin}/longtime-6000`, selector, attribute, {
        timeout: 2000
      })
        .then(attributeValue => {
          expect(attributeValue).toBeNull();
          resolve();
        })
        .catch(reject)
    });
  });
  /* eslint-enable jest/no-conditional-expect */
});