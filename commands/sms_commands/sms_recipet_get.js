const cs = require('../../modules/clicksend.js')

/**
 ** Exports for the command line processor
 **/

exports.command = 'receipt';
exports.desc = "Get a specific SMS Receipt";

exports.builder = function (yargs) {
    yargs
        .option('messageId', {
            describe: 'The message ID(s) for which you would like a receipt',
            type: 'array',
            requiresArg: true,
            demandOption: true,
            group: 'SMS Receipt Options:'
        })
}

exports.handler = async function (yargs) {

    let result = new Array();

    if( Array.isArray(yargs.messageId)) {
        for( let i = 0; i < yargs.messageId.length; i++ ) {
            let receipt = getReceipt( yargs.messageId[ i ], yargs );
            result.push( receipt );
        }
    }
    else {
        result.push( getReceipt( yargs.messageId, yargs ));
    }

    return result;
}

async function  getReceipt( messageId, yargs ) {
    const result = await cs.executeGet('/v3/sms/receipts/' + messageId, yargs);
    cs.output( result, yargs );
    return result;
}
