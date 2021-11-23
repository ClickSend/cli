const https = require('follow-redirects').https;

function getBasic(credentials) {
    var mix = credentials.username + ":" + credentials.token;
    var result =  Buffer.from(mix).toString('base64');

    return result;
}

function getCSCredentials(yargs) {
    if (yargs.csuser == undefined) {
        // get it from the enviornment
        yargs.csuser = process.env.CLICKSEND_USER
    }

    if (yargs.cstoken == undefined) {
        // get it from the environment
        yargs.cstoken = process.env.CLICKSEND_TOKEN
    }
    var result = { 'username': yargs.csuser, 'token': yargs.cstoken }
    if( yargs.debug ) {
        console.debug( result );
    }

    return result;
}

async function executeGet(path, yargs) {
    var basic = getBasic(getCSCredentials(yargs));
    var P = new Promise((resolve, reject) => {
        var options = {
            'method': 'GET',
            'hostname': yargs.cshost,
            'path': path,
            'headers': {
                'Authorization': 'Basic ' + basic,
                'Accept': 'application/json'
            },
            'maxRedirects': 20
        };

        var req = https.request(options, function (res) {
            var chunks = [];

            res.on("data", function (chunk) {
                chunks.push(chunk);
            });

            res.on("end", function (chunk) {
                var body = Buffer.concat(chunks).toString();;
                var j = JSON.parse(body)
                resolve(j);
            });

            res.on("error", function (error) {
                reject(error);
            });
        });

        req.end();
    })

    return P;
}

async function executePostJSON( path, content, yargs ) {
    const data = JSON.stringify(content)
    return await executePost( path, 'applicaiton/json', data, yargs );
}

async function executePost( path, contentType, content, yargs ) {
    if( yargs.debug > 2 ) {
        console.log( "Sending POST to " + yargs.host + yargs.path );
    }

    var basic = getBasic(getCSCredentials(yargs));

    var P = new Promise((resolve, reject) => {
        var options = {
            'method': 'POST',
            'hostname': yargs.cshost,
            'path': path,
            'headers': {
                'Authorization': 'Basic ' + basic,
                'Accept': 'application/json',
                'Content-Type': contentType,
                'Content-Length': Buffer.byteLength(content)
            },
            'maxRedirects': 20
        };

        var req = https.request(options, function (res) {
            var chunks = [];

            res.on("data", function (chunk) {
                chunks.push(chunk);
            });

            res.on("end", function (chunk) {
                var body = Buffer.concat(chunks).toString();;
                var j = JSON.parse(body)
                resolve(j);
            });

            res.on("error", function (error) {
                reject(error);
            });
        });

        if( yargs.debug > 3 ) {
            console.log( "POST Options : " );
            console.log( options );
            console.log( "\nPOST Payload :" );
            console.log( content );
        }

        req.write(content);
        req.end();
    })
    return P;
}

module.exports = { executeGet, executePost, executePostJSON }