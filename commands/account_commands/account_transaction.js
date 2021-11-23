const yargs = require('yargs');
const cs = require( '../../modules/clicksend.js')

/**
 ** Exports for the command line processor
 ** TODO - This needs to be disabled until pagination is working in the executeGet function.  This should be automatic.
 **/

exports.command = 'transaction';
exports.desc = "Get recharge transactions for this account";

exports.builder = {}

exports.handler = async function(yargs) {
    var path = '/v3/recharge/transactions'
    var result = await cs.executeGet( path, yargs );
    cs.output( result, yargs );
    return result;
}

