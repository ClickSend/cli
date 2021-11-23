
async function accountCommand(args) {
    console.log( "Running...")
}


/**
 ** Exports for the command line processor
 **/

exports.command = 'create';
exports.desc = "Create a new account";
exports.handler = function( argv ) {
    console.log( 'woopdie doo');
}
exports.builder = function(yargs){
    yargs
    .option( 'username', {
        alias : 'U',
        describe : 'A user name for this account',
        type : 'string',
        requiresArg: true,
        demandOption: true,
        group: 'Account Creation Options:'
    })
    .option( 'password', {
        alias : 'P',
        describe : 'A password for this account - note that this will be stored in the command history and you may wish to purge this',
        type : 'string',
        requiresArg: true,
        demandOption: true,
        group: 'Account Creation Options:'
    })    
    .option( 'mobile', {
        alias : 'M',
        describe : 'The mobile number for this account - in E.164 format to ensure acceptance (other formats might work too)',
        type : 'string',
        requiresArg: true,
        demandOption: true,
        group: 'Account Creation Options:'
    })    
    .option( 'email', {
        alias : 'E',
        describe : 'The email address for this account',
        type : 'string',
        requiresArg: true,
        demandOption: true,
        group: 'Account Creation Options:'
    })
    .option( 'firstName', {
        alias : 'F',
        describe : 'The first name of the account holder.',
        type : 'string',
        requiresArg: true,
        demandOption: true,
        group: 'Account Creation Options:'
    })
    .option( 'lastName', {
        alias : 'L',
        describe : 'The surname of the account holder.',
        type : 'string',
        requiresArg: true,
        demandOption: true,
        group: 'Account Creation Options:'
    })
    .option( 'accountName', {
        alias : 'A',
        describe : 'Your delivery to value.',
        type : 'string',
        requiresArg: true,
        demandOption: true,
        group: 'Account Creation Options:'
    })
    .option( 'country', {
        alias : 'C',
        describe : 'The two character country code for the account holder\'s country',
        type : 'string',
        requiresArg: true,
        demandOption: true,
        group: 'Account Creation Options:'
    })
}

exports.handler = function(argv) {
    console.log( 'Creating account for %s', argv.firstName)
}

exports.handler = async function (y) {};
