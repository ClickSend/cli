const yargs = require("yargs")
const cs = require('./../modules/clicksend.js')

exports.command = 'timezone'
exports.desc = 'Get a list of supported timezones.'
exports.handler = async function (yargs) {
    var result = await cs.executeGet('/v3/timezones', yargs);

    cs.output(result, yargs);
    
    return result;
}