/**
 * Get the command line args.
 * 
 * Args are url, selector, attribute, and [useprop].
 * 
 * Copyright (c) 2024, Alex Grant <alex@localNerve.com> (https://www.localnerve.com)
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
  return args;
}

module.exports = getCommandLineArgs;