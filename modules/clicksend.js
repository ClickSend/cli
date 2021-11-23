const https = require('follow-redirects').https;
const fs = require('fs');

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

    debug( 4, "Sending POST to " + yargs.host + yargs.path, yargs );

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

        debug( 5, "POST Options : ", yargs );
        debug( 5, options, yargs );
        debug( 5, "\nPOST Payload :", yargs );
        debug( 5,  content, yargs );

        req.write(content);
        req.end();
    })
    return P;
}

function output( obj, yargs ) {
    var formatted = undefined;

    // format choices : ['pretty', 'raw', 'object' ],
    if( yargs.format === 'pretty' ) {
        formatted = JSON.stringify( obj, null, '\t');
    }
    else if( yargs.format === 'raw' ) {
        formatted = JSON.stringify( obj );
    }
    // Probably wrong - as it truncates data, but it makes for pretty output to console.
    else {
        formatted = obj;
    }
    

    if( yargs.output.includes( 'console' ) ) {
        console.log( formatted );
    }
    if( yargs.output.includes( 'debug' ) ) {
        console.debug( formatted );
    }
    if( yargs.output.includes( 'error' ) ) {
        console.error( formatted );
    }
    if( yargs.output.includes( 'file' ) ) {
        var fileName = yargs.fileName
        fs.writeFile( fileName, formatted.toString(), err => {
            if( err){
                console.error(err);
                return;
            }
        })
    }
}

function debug( level, message, yargs ) {
    if( level <= yargs.debug ) {
        console.debug( message );
    }
}

module.exports = { executeGet, executePost, executePostJSON, output, debug }