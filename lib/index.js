/**
 * Scrape a webpage for an attribute, write to standard out.
 * 
 * get-attribute --url=<url> --selector=<selector> --attribute=<attribute-name> [--useprop=false] [--timeout=10000]
 * 
 * Copyright (c) 2025, Alex Grant <alex@localNerve.com> (https://www.localnerve.com)
 * Licensed under the MIT license.
 */
const getArgs = require('./cli');
const getAttr = require('./get-attribute');

const syntax = 'get-attribute --url=https://host.dom --selector=a[href^="/videos"] --attribute=href [--useprop=false] [--timeout=10000] [--launchargs=\'{"json":true}\']';
const args = getArgs(process.argv);

if (args) {
  (async () => {
    const attributeValue = 
      await getAttr(args.url, args.selector, args.attribute, {
        useProp: args.useprop,
        timeout: args.timeout,
        launchArgs: args.launchargs
      });
    if (!attributeValue) {
      console.error('Failed to retrieve attribute');
      process.exit(2);
    } else {
      console.log(attributeValue);
    }
  })();
} else {
  console.error(`Argument error:\n\t${syntax}`);
  console.error('Use DEBUG=cli for more info');
  process.exit(1);
}
