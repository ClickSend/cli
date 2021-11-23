#!/usr/bin/env node
const chalk = require('chalk');
const { hideBin } = require('yargs/helpers')

/**
 * account create
 * account view details
 * account view usage
 * account verification send
 * account verify
 * account username remind
 * account password forgot
 * account password change
 */


require('yargs/yargs')(hideBin(process.argv))
  .scriptName("clicksend")
  .commandDir('commands')
  .usage(
    '\n'
    + chalk.bold(chalk.yellow('ClickSend Command Line Interface'))
    + '\n'
    + '\n'
    + chalk.bold('Usage: $0 <command> [options]'
    ))
  .demandCommand()
  .option('csuser', {
    describe: 'Your ClickSend user name. If not provided through the command line, the tool will attempt to read this value from the environment varialble CLICKSEND_USER.',
    requiresArg: true,
    demandOption: false,
    type: 'string',
    group: 'ClickSend Connection Options:'
  })
  .option('cstoken', {
    describe: 'Your access token you generated for this tool. If not provided through the command line, the tool will attempt to read this value from the environment varialble CLICKSEND_TOKEN.',
    requiresArg: true,
    demandOption: false,
    type: 'string',
    group: 'ClickSend Connection Options:'
  })
  
  .option('verbose', {
    alias: 'V',
    describe: 'Verbose output.',
    type: 'boolean',
    group: 'Debugging:'
  })
  .option('debug', {
    alias: 'D',
    describe: 'Provide debugging output to the console.',
    type: 'boolean',
    group: 'Debugging:'
  })
  .help()
  .parse()
