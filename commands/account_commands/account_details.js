const cs = require( './../../modules/clicksend.js')

/**
 ** Exports for the command line processor
 **/

exports.command = 'details';
exports.desc = "Get account Get account details.";

exports.builder = {}

exports.handler = async function(yargs) {
    var result = await cs.executeGet( '/v3/account', yargs );
    cs.output( result, yargs );
    return result;
}

