const https = require('https');
const options = {
    hostname: 'https://api.twitter.com/oauth2/token?',
    path: '/',
    method: 'POST'
};

function getBearerToken() {
    consumerKey = process.env.CONSUMER_KEY;
    consumerSecret = process.env.CONSUMER_SECRET;
    const keyANdSecret = `${consumerKey}:${consumerSecret}`;

    https.get('https://encrypted.google.com/', (res) => {
        console.log('statusCode:', res.statusCode);
        console.log('headers:', res.headers);
        res.on('data', (d) => {
            process.stdout.write(d);
        });

    }).on('error', (e) => {
        console.error(e);
    });
}
module.exports = getBearerToken;
