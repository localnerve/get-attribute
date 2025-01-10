/**
 * Get the command line args.
 * 
 * Args are url, selector, attribute, and [useprop].
 * 
 * Copyright (c) 2025, Alex Grant <alex@localNerve.com> (https://www.localnerve.com)
 * Licensed under the MIT license.
 */
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const debug = require('debug')('cli');

function getCommandLineArgs (argv) {
  debug('process argv', argv);

  const args = yargs(hideBin(argv)).argv;
  const prerequisite = args.url && args.selector && args.attribute;

  debug('parsed args', args);

  if (!prerequisite) {
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

module.exports = getCommandLineArgs;