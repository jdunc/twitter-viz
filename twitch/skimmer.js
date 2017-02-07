(function(){
const username = twitch.username;//this needs be the username
const oauthKey = docCookies.getItem('token');
const channel = twitch.channel;//this needs to be the channel name
const options =
{
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

    // Handle different message types..
    switch(userstate["message-type"]) {
        case "chat":
            messages.push(message)
            sessionStorage.setItem('twitchMessages', messages);
        default:
            // Something else ?
            break;
    }
});
}())
