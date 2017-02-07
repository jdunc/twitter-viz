const tmi = require('tmi.js');
const twitch = require('../hidden/twitch');
const LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./scratch');
const username = twitch.username;
const oauthKey = twitch.oauthKey;
const channel = twitch.channel;
const options = {
    options: {
        debug: true
    },
    connection: {
        reconnect: true
    },
    identity: {
        username: username,
        password: oauthKey
    },
    channels: [`#${channel}`]
};
const client = new tmi.client(options);
client.connect();
let messages = []
client.on('message', (channel, userstate, message, self) => {
    // Don't listen to my own messages..
    if (self) return;

    // Handle different message types..
    switch(userstate["message-type"]) {
        case "action":
            // This is an action message..
            break;
        case "chat":
            messages.push(message)
            localStorage.setItem('messages', messages);
            // This is a chat message..
            break;
        case "whisper":
            // This is a whisper..
            break;
        default:
            // Something else ?
            break;
    }
});
