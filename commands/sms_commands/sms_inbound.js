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
            describe: 'After getting messages, mark them as read.\n',
            type: 'boolean',
            requiresArg: false,
            demandOption: false,
            group: 'SMS Inbound Options:'
        })
}

exports.handler = async function (yargs) {
    try {
        // if we don't have a messages defined, grab them all
        let result = {};
        let outgoingQuery = "";
        let incomingQuery = "";
        let query = "";

        if (yargs.outgoing) {
            for (let i = 0; i < yargs.outgoing.length; i++) {
                if (i > 0) {
                    outgoingQuery += ',';
                }
                outgoingQuery += 'original_message_id:' + yargs.outgoing[i]
            }
        }

        if (yargs.incoming) {
            for (let i = 0; i < yargs.incoming.length; i++) {
                if (i > 0) {
                    incomingQuery += ',';
                }
                incomingQuery += 'message_id:' + yargs.incoming[i]
            }
        }


        if (outgoingQuery || incomingQuery) {
            query = "?q="
        }

        if (outgoingQuery) {
            query += outgoingQuery;
        }

        if (incomingQuery != "") {
            if (outgoingQuery != "") {
                query += ","
            }
            query += incomingQuery;
        }

        if (query != "") {
            query += "&operator=OR"
        }
        const messages = await cs.executeGet('/v3/sms/inbound' + query, yargs);

        result.messages = messages;

        result.read = new Array();


        if (yargs.read) {
            data = result.messages.data.data;
            for (let i = 0; i < data.length; i++) {
                const readResult = await cs.executePut('/v3/sms/inbound-read/' + data[i].message_id, 'applicaiton/json', "", yargs);
                readResult.message_id = data[i].message_id;
                result.read.push(readResult);
            }
        }

        cs.debug(4, result, yargs);
        cs.output(result, yargs);

        return result;
    }
    catch (ex) {
        cs.output(ex, yargs);
    }
}
