/**
 * Get an attribute from a web page given url, selector, and attributeName.
 * 
 * Copyright (c) 2024, Alex Grant <alex@localNerve.com> (https://www.localnerve.com)
 * Licensed under the MIT license.
 */
const {default: puppeteer, TimeoutError} = require('puppeteer');
const debug = require('debug')('get-attribute');

async function getAttribute (url, selector, attribute, {
  useProp = false,
  timeout = 10000,
  launchArgs = {}
} = {}) {
  debug('args', 
    `url=${url}`,
    `selector=${selector}`, 
    `attribute=${attribute}`, 
    `useProp=${useProp}`,
    `timeout=${timeout}`,
    `launchargs=${JSON.stringify(launchArgs)}`
  );

  const browser = await puppeteer.launch(launchArgs);
  let attributeValue = null;

  debug('launched successfully');

  try {
    const page = await browser.newPage();
    await page.goto(url, {
      timeout
    });

    debug('navigated to url successfully');

    const sel = await page.waitForSelector(selector, {
      timeout
    });

    debug('waited for selector successfully');

    /* istanbul ignore next */
    attributeValue = await sel?.evaluate((el, attrName, useProp) => {
      if (useProp) {
        return el[attrName];
      }
      return el.getAttribute(attrName);
    }, attribute, useProp);

    debug('got attribute value', attributeValue);

  } catch (e) {
    if (!(e instanceof TimeoutError)) {
      throw e;
    }
    debug('received TimeoutError', e.message);
  } finally {
    await browser.close();
  }

  return attributeValue;
}

module.exports = getAttribute;