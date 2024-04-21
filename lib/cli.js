/**
 * Get the command line args.
 * 
 * Args are url, selector, attribute, and [useprop].
 */
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

function getCommandLineArgs (argv) {
  const args = yargs(hideBin(argv)).argv;
  const prerequisite = args.url && args.selector && args.attribute;
  if (!prerequisite) {
    return null;
  }
  return args;
}

module.exports = getCommandLineArgs;