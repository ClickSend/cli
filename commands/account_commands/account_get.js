const cs = require( '../../modules/clicksend.js')

/**
 ** Exports for the command line processor
 **/

exports.command = 'get';
exports.desc = "Get account details.";

exports.builder = {}

exports.handler = async function(yargs) {
    let result = await cs.executeGet( '/v3/account', yargs );
    cs.output( result, yargs );
    return result;
}
