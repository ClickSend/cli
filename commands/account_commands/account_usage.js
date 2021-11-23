const yargs = require('yargs');
const cs = require( './../../modules/clicksend.js')

/**
 ** Exports for the command line processor
 **/

exports.command = 'usage';
exports.desc = "Get account usage statistics grouped by subaccount.";

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

exports.handler = async function(yargs) {
    var path = '/v3/account/usage/' + yargs.year + '/' + yargs.month + '/subaccount';
    var result = await cs.executeGet( path, yargs );
    cs.output( result, yargs );
    return result;
}

