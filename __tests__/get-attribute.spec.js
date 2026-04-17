/**
 * Test the get attribute module
 * 
 * Copyright (c) 2025, Alex Grant <alex@localNerve.com> (https://www.localnerve.com)
 * Licensed under the MIT license.
 */
import { describe, it } from 'node:test';
import assert from 'node:assert';
import getAttr from '../lib/get-attribute.js';
import { config as testConfig } from './globals/server.js';

describe('get-attribute', () => {
  const origin = testConfig.origin;
  // These match inside the test fixture:
  const selector = 'a[href^="/videos"]';
  const attribute = 'href';

  const url = `${testConfig.origin}/twitch-gigaohmbio.html`;

  it('should get attribute', async () => {    
    const value = await getAttr(url, selector, attribute);

    assert.ok(value?.split('/').includes('videos'));
    assert.match(value, /^\/videos/);
  }, 10000);

  it('should get prop', async () => {
    const value = await getAttr(url, selector, attribute, {
      useProp: true
    });

    assert.ok(value?.split('/').includes('videos'));
    assert.match(value, new RegExp(`^${origin}`));
  }, 10000);

  it('should handle bad url', () => {
    return new Promise((resolve, reject) => {
      getAttr('http://bad.local', selector, attribute)
        .then(() => {
          reject(new Error('should have thrown an error'));
        })
        .catch(e => {
          assert.match(e.message, /ERR_NAME_NOT_RESOLVED/);
          resolve();
        });
    });
  }, 10000);

  it('should handle timeout', () => {
    return new Promise((resolve, reject) => {
      getAttr(`${testConfig.origin}/longtime-6000`, selector, attribute, {
        timeout: 2000
      })
        .then(attributeValue => {
          assert.ok(attributeValue === null);
          resolve();
        })
        .catch(reject)
    });
  });
});