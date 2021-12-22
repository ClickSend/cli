const cs = require('../../modules/clicksend.js')

/**
 ** Exports for the command line processor
 **/

exports.command = 'receipts';
exports.desc = "Get SMS Receipts";

exports.handler = async function (yargs) {
    const result = getReceiptPage( 1, yargs );
    return result;
}

async function  getReceiptPage( pageNumber, yargs ) {
    const result = await cs.executePostJSON('/v3/sms/receipts', { 'url' : 'foo'}, yargs);
    cs.output( result, yargs );
    return result;
}
