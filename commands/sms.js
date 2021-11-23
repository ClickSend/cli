const yargs = require("yargs")

exports.command = 'sms <command>'
exports.desc = 'SMS (Simple Messaging Service) related commands'
exports.builder = function(yargs) {
    yargs.commandDir( 'sms_commands')
}
exports.hander = function(argv){}