
async function accountCommand(args) {
    console.log( "Running...")
}


/**
 ** Exports for the command line processor
 **/

exports.command = 'usage';
exports.desc = "Get account usage statistics grouped by subaccount.";
exports.handler = function( argv ) {
    console.log( 'woopdie doo');
}

exports.builder = function(yargs){
    yargs
    .option( 'year', {
        alias : 'Y',
        describe : 'Your account usage year. For example : 2019',
        type : 'number',
        requiresArg: true,
        demandOption: true,
        group: 'Account Usage Options:'
    })
    .option( 'month', {
        alias : 'M',
        describe : 'Your account usage month.  For example : 4',
        type : 'number',
        requiresArg: true,
        demandOption: true,
        group: 'Account Usage Options:'
    })
}

exports.handler = function(argv) {
    console.log( 'Creating account for %s', argv.firstName)
}

