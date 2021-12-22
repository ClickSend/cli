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
            describe: 'To whom this message should be sent.  A mobile phone number in E.164 format.',
            type: 'array',
            requiresArg: true,
            demandOption: false,
            group: 'SMS Send Options:'
        })
        .option('list', {
            describe: 'Your list ID if sending to a whole list.  Can be used instead of \'to\'.',
            requiresArg: true,
            demandOption: false,
            type: 'string',
            group: 'SMS Send Options:'
        })
        .option('from', {
            describe: 'Your sender ID.  If none specified, then a shared number is used.  If a non-phone-nuber is used, no reply option is available to the recipient.',
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
        .option('schedule', {
            describe: "When to send this message, in this format.  e.g. 'YYYY-MM-DD HH:MM' or 'YYYY-MM-DD HH:MM GMT-08:00'.  If no GMT offset is provided, you will schedule in the current time zone.",
            requiresArg: true,
            demandOption: false,
            type: 'string',
            group: 'SMS Send Options:'
        })
        .option('reference', {
            describe: 'Your reference. Will be passed back with all replies and delivery reports.',
            requiresArg: true,
            demandOption: false,
            type: 'string',
            group: 'SMS Send Options:'
        })
        .option('email', {
            describe: 'An email address to which any replies should be sent.',
            requiresArg: true,
            demandOption: false,
            type: 'string',
            group: 'SMS Send Options:'
        })

        .conflicts( 'to', 'list')
}

exports.handler = async function (yargs) {
    let payload = {}

    let schedule = undefined;

    // There doesn't seem to be a mutually exclusive required option in yargs
    if( !yargs.to && !yargs.list ) {
        throw 'Missing required arguments: to or list';
    }

    // If yargs.schedule a valid date?
    if (yargs.schedule) {
        schedule = new Date(yargs.schedule);

        if (schedule < Date.now()) {
            throw 'Scheduled date/time is in the past.';
        }
    }

    payload.messages = new Array();

    if (Array.isArray(yargs.to)) {
        for (let i = 0; i < yargs.to.length; i++) {
            let message = {
                to: yargs.to[i],
                from: yargs.from,
                source: 'CLI',
                body: yargs.body,
                schedule: schedule ? (schedule.valueOf() / 1000) : undefined,
                custom_string: yargs.reference,
                from_email: yargs.email,
                country: yargs.country
            }
            payload.messages.push(message);
        }
    }
    else {
        let message = {
            list_id : yargs.list,
            from: yargs.from,
            source: 'CLI',
            body: yargs.body,
            schedule: schedule ? schedule.valueOf() : undefined,
            custom_string: yargs.reference,
            from_email: yargs.email,
            country: yargs.country
        }
        payload.messages.push(message);
    }

    const result = await cs.executePostJSON('/v3/sms/send', payload, yargs);
    cs.output(result, yargs);
    return result;
}
