const cs = require('../../modules/clicksend.js')

/**
 ** Exports for the command line processor
 **/

exports.command = 'send';
exports.desc = "Send an SMS";
exports.handler = function (yargs) {
    sendSMS(yargs);
}

exports.builder = function (yargs) {
    yargs
        .option('to', {
            describe: 'To whom this message should be sent.  A mobile phone number in E.164 format',
            type: 'array',
            requiresArg: true,
            demandOption: true,
            group: 'SMS Send Options:'
        })
        .option('from', {
            describe: 'Your sender ID',
            type: 'string',
            requiresArg: true,
            demandOption: false,
            group: 'SMS Send Options:'
        })
        .option('body', {
            describe: 'Your message.  Note that long messages may be sent in multiple parts.',
            type: 'string',
            requiresArg: true,
            demandOption: true,
            group: 'SMS Send Options:'
        })
}

exports.handler = async function (yargs) {
    var payload = {}
    payload.messages = new Array();
    if( Array.isArray(yargs.to)) {
        for( var i = 0; i < yargs.to.length; i++ ) {
            var message = {
                to: yargs.to[i],
                from: yargs.from,
                source : 'CLI',
                body : yargs.body
            }            
            payload.messages.push( message );
        }
    }
    else {
        var message = {
            to: yargs.to,
            from: yargs.from,
            source : 'CLI',
            body : yargs.body
        }            
        payload.messages.push( message );
    }

    const result = await cs.executePostJSON('/v3/sms/send', payload, yargs);
    cs.output( result, yargs );
    return result;
}
