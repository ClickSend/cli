const cs = require('../../modules/clicksend.js')

/**
 ** Exports for the command line processor
 **/

exports.command = 'cancel';
exports.desc = "Cancel scheduled message(s)\n\n"
    + "You can either cancel a specific message if you have the message ID, or, if you do not provide a message ID, all scheduled messages will be cancelled.";
exports.builder = function (yargs) {
    yargs
        .option('messageId', {
            describe: 'The message IDs to cancel.\n',
            type: 'array',
            requiresArg: true,
            demandOption: false,
            group: 'SMS Cancel Options:'
        })
}

exports.handler = async function (yargs) {
    try {
        let result;

        if( yargs.messageId ) {
            result = new Array();

            for( let i = 0; i < yargs.messageId.length; i++ ) {
                result.push( await cs.executePut( '/v3/sms/' + yargs.messageId[i] + '.cancel', 'application/json', '', yargs) );
            }
        }
        else {
            result = await cs.executePut('/v3/sms/cancel-all', undefined, undefined, yargs);
        }

        cs.debug(4, result, yargs);
        cs.output(result, yargs);

        return result;
    }
    catch (ex) {
        cs.output(ex, yargs);
    }
}
