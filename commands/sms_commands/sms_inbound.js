const cs = require('../../modules/clicksend.js')

/**
 ** Exports for the command line processor
 **/

exports.command = 'inbound';
exports.desc = "Get inbound SMS messages\n\n"
    + "Generally inbound messages are going to be in response to a message that you sent (though not always). \n\n"
    + "You can look for responses to your outbound message by specifying the outbound message with the --outbound <messageId> parameter.  If you know the inbound message ID, you can grab that using the --inbound <messageId> parameter.\n\n"
    + "If you want to mark the messages as read, add the --read parameter.";
exports.builder = function (yargs) {
    yargs
        .option('incoming', {
            describe: 'The incoming (their) message ID(s) to process.\nDon\'t include this and get all incoming messages.\n',
            type: 'array',
            requiresArg: true,
            demandOption: false,
            group: 'SMS Inbound Options:'
        })
        .option('outgoing', {
            describe: 'The outgoing (your) message ID(s) to process.\nDon\'t include this and get all outgoing messages.\n',
            type: 'array',
            requiresArg: true,
            demandOption: false,
            group: 'SMS Inbound Options:'
        })
        .option('read', {
            describe: 'After getting messages, mark them as read.\nYou can add an optional date in yyyy-mm-dd format and only those messages that came in before the specified date will be marked as read.\n',
            type: 'string',
            requiresArg: false,
            demandOption: false,
            group: 'SMS Inbound Options:'
        })
}

exports.handler = async function (yargs) {
    try {
        // if we don't have a messages defined, grab them all
        var result = {};

        if (yargs.outgoing === undefined) {
            const messages = await cs.executeGet('/v3/sms/inbound', yargs);
            result.messages = messages;
        }
        else {
            const messages = await cs.executeGet('/v3/sms/inbound/', yargs.outgoing[0]);
            result.messages = messages;
        }
        // else {
        //     var messages = new Array();
        //     for (var i = 0; i < yargs.message.length; i++) {
        //         const message = await cs.executeGet('/v3/sms/inbound/' + yargs.message[i], yargs);
        //         messages.push(message);
        //     }
        //     result.messages = messages
        // }

        var readResults;

        // If we're doing "Read" then we have six options
        // Read - either it's (A) absent, (B) Present without a date or (C) present with a date
        // Message - either it's (D) not specified or (E) it is specified
        // A-D
        // A-E
        // B-D
        // B-E
        // C-D
        // C-E
        // C
        if (yargs.read === undefined) { // A
            // if the read flag wasn't specified, we are done here!
        }
        else if (yargs.read === '') { // B
            // Read is present without a date
            if (yargs.message === undefined) { // D - no message provided.
                readResults = new Array();
                const readResults = await cs.executePut('/v3/sms/inbound-read/', 'applicaiton/json', "", yargs);
                readResults.push(readResults);
            }
            else {  // E
                readResults = new Array();
                for (var i = 0; i < yargs.message.length; i++) {
                    const readResult = await cs.executePut('/v3/sms/inbound-read/' + yargs.message[i], 'applicaiton/json', "", yargs);
                    readResults.push(readResult);
                }
            }
        }
        else { // C - Read is present with a date

        }

        result.read = readResults;

        cs.debug(4, result, yargs);
        cs.output(result, yargs);
        return result;
    }
    catch (ex) {
        cs.output(ex, yargs);
    }
}
