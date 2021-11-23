const cs = require( './../../modules/clicksend.js')

async function accountCommand(args) {
    console.log( "Running...")
}


/**
 ** Exports for the command line processor
 **/

exports.command = 'details';
exports.desc = "Get account Get account details.";
exports.handler = function( argv ) {
    console.log( 'woopdie doo');
}

exports.builder = {}

exports.handler = async function(yargs) {
    var result = await cs.executeGet( '/v3/account', yargs );
    console.log( result );
    return result;
}

