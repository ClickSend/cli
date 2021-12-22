const yargs = require("yargs")
const cs = require('../modules/clicksend.js')

exports.command = 'country'
exports.desc = 'Get a list of countries.'
exports.handler = async function (yargs) {
    let result = await cs.executeGet('/v3/countries', yargs);

    cs.output(result, yargs);
    
    return result;
}
