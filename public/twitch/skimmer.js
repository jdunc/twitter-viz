(function(){
const token = JSON.parse(docCookies.getItem('token').substr(2)).access_token;
const username = $.ajax('https://api.twitch.tv/kraken/user',
{
  headers:
  {
    'Accept': 'application/vnd.twitchtv.v3+json',
    'Authorization': `OAuth ${token}`,
    'Client-ID': 'ipr78n41sqd6fqbacj2gykwv5lxpnd',
  }
}).done((data)=>console.log(data, 'yay'););//this needs be the username
const password = 'oauth:' + token;
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
        password: password
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
