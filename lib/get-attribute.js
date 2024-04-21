/**
 * Get an attribute from a web page given url, selector, and attributeName.
 */
const {default: puppeteer, TimeoutError} = require('puppeteer');

async function getAttribute (url, selector, attribute, {
  useProp = false,
  timeout = 10000
} = {}) {
  const browser = await puppeteer.launch();
  let attributeValue = null;

  try {
    const page = await browser.newPage();
    await page.goto(url, {
      timeout
    });
    const sel = await page.waitForSelector(selector, {
      timeout
    });
    /* istanbul ignore next */
    attributeValue = await sel?.evaluate((el, attrName, useProp) => {
      if (useProp) {
        return el[attrName];
      }
      return el.getAttribute(attrName);
    }, attribute, useProp);
  } catch (e) {
    if (!(e instanceof TimeoutError)) {
      throw e;
    }
  } finally {
    await browser.close();
  }

  return attributeValue;
}

module.exports = getAttribute;