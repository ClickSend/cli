const yargs = require("yargs")

exports.command = 'account <command>'
exports.desc = 'Account-related commands'
exports.builder = function(yargs) {
    yargs.commandDir( 'account_commands')
}
exports.hander = function(argv){}