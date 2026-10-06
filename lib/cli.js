/**
 * Get the command line args.
 * 
 * Args:
 *   --url: string - The url
 *   --selector: string - The selector
 *   --attribute: string - The attribute name
 *   [--useprop: boolean] - Use the attribute name to get a property by name instead (false default)
 *   [--timeout: number] - The timeout (undefined (puppeteer) default)
 *   [--launchargs: string] - The puppeteer launchargs JSON (undefined (puppeteer) default).
 * 
 * Copyright (c) 2025, Alex Grant <alex@localNerve.com> (https://www.localnerve.com)
 * Licensed under the MIT license.
 */
import { parseArgs } from 'node:util';
import debugLib from '@localnerve/debug';

const debug = debugLib('cli');

export default function getCommandLineArgs (argv) {
  debug('process argv', argv);

  const { values: args } = parseArgs({
    args: argv,
    options: {
      url: { type: 'string' },
      selector: { type: 'string' },
      attribute: { type: 'string' },
      useprop: { type: 'boolean', default: false },
      timeout: { type: 'string', default: undefined },
      launchargs: { type: 'string', default: undefined }
    },
    strict: false
  });

  debug('parsed args', args);

  if (!(args.url && args.selector && args.attribute)) {
    return null;
  }

  if (args.useprop) {
    const useprop = args.useprop.trim().toLowerCase();
    if (useprop !== 'true' && useprop !== 'false') {
      debug('useprop was not "true" or "false"', useprop);
      return null;
    }
    args.useprop = useprop === 'true';
  }

  if (args.timeout) {
    const timeout = parseInt(args.timeout, 10); 
    if (!timeout) {
      debug('could not parse timeout to decimal integer', args.timeout);
      return null;
    }
    args.timeout = timeout;
  }

  if (args.launchargs) {
    let launchargs;
    try {
      launchargs = JSON.parse(args.launchargs);
    } catch (e) {
      debug('launchargs was not valid json', args.launchargs, e);
      return null;
    }
    args.launchargs = launchargs;
  }

  return args;
}