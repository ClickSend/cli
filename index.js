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


const yargs = require('yargs/yargs')(hideBin(process.argv))
  .scriptName("clicksend")
  .commandDir('commands')
  .usage(
    '\n'
    + chalk.bold(chalk.yellow('ClickSend Command Line Interface'))
    + '\n'
    + '\n'
    + chalk.bold('Usage: $0 <command> [options]'
    + '\n'
    + '\n'
    + 'To get help on a specific command, use \'clicksend <command> --help\'\n'
    ))
  .demandCommand()
  .option('csuser', {
    describe: 'Your ClickSend user name.\n\nIf not provided through the command line, the tool will attempt to read this value from the environment varialble CLICKSEND_USER.\n',
    requiresArg: true,
    demandOption: false,
    type: 'string',
    group: 'ClickSend Connection Options:'
  })
  .option('cstoken', {
    describe: 'Your access token you generated for this tool.\n\nIf not provided through the command line, the tool will attempt to read this value from the environment varialble CLICKSEND_TOKEN.\n',
    requiresArg: true,
    demandOption: false,
    type: 'string',
    group: 'ClickSend Connection Options:'
  })
  .option('cshost', {
    desc : 'The ClickSend host to which you wish to connect.\n\n',
    default : 'rest.clicksend.com',
    type : 'string',
    group: 'ClickSend Connection Options:',
    hidden : true
  })

  .option('debug', {
    alias: 'D',
    describe: 'Debugging level from 0 to 5.  Where 0 is "off" and 5 is every possible message.\n',
    type: 'number',
    default : 0,
    hidden: true,
    group: 'Debug Options:'
  })
  .option( 'output', {
    alias : 'O',
    describe : 'Where the output from this command will be sent.\n\nYou can specify multiple destinations.  If you specify \'none\' as an option, it will override any other output directives.\n',
    type : 'array',
    default : 'console',
    choices : [ 'console', 'file', 'none', 'debug', 'error' ],
    group: 'Output Options:',
    hidden : true
  })
  .option( 'format', {
    alias : 'F',
    desc : 'How to format the output\n\nNot thata \'object\' format does not work well being written to files and data written using this format is subject to data trucation in all cases, but it looks cool.\n',
    default : 'pretty',
    choices : ['pretty', 'raw', 'object' ],
    group: 'Output Options:',
    hidden : true
  })
  .option( 'file', {
    desc : 'When writing output to a file, this is the file name to which to write.  If no directory is specified, the file will be created in the current directory.\n',
    default : 'clicksend-output.json',
    group : 'Output Options:',
    hidden : true
  })
  .option( 'version', {
    desc : 'Show the version number',
    hidden : true
  })
  
  .help( "help")
  ;

yargs.wrap(Math.min(120,yargs.terminalWidth())).parse();