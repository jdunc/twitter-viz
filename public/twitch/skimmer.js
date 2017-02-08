(function() {
  const token = JSON.parse(docCookies.getItem('token').substr(2)).access_token;

  Promise.all([
    $.ajax('https://api.twitch.tv/kraken/user', {
      headers: {
        'Accept': 'application/vnd.twitchtv.v3+json',
        'Authorization': `OAuth ${token}`,
        'Client-ID': 'ipr78n41sqd6fqbacj2gykwv5lxpnd',
      }
    }),
    $.ajax('https://api.twitch.tv/kraken/streams/featured', {
      headers: {
        'Accept': 'application/vnd.twitchtv.v3+json',
        'Authorization': `OAuth ${token}`,
        'Client-ID': 'ipr78n41sqd6fqbacj2gykwv5lxpnd',
      }
    })
  ]).then((values) => {
    $('#stream').attr('src',
      `http://player.twitch.tv/?channel=${values[1].featured[0].stream.channel.name}`
    );
    $('#chat').attr('src',
      `http://www.twitch.tv/${values[1].featured[0].stream.channel.name}/chat`
    );
    // call function to embed featured stream in front end
    chatSkimmer(values[0].name, values[1].featured[0].stream.channel.name,
      token);
  })

  function chatSkimmer(username, channel, token) {
    const password = `oauth:${token}`;
    // add password, username to sessionStorage
    if (!sessionStorage.getItem('password')) {
      console.log('first time storing');
      sessionStorage.setItem('password', password);
      sessionStorage.setItem('username', username);
    } else {
      console.log('session storage already has username and password');
    }

    const options = {
      options: {
        debug: true
      },
      connection: {
        reconnect: true
      },
      identity: {
        username: sessionStorage.getItem('username'),
        password: sessionStorage.getItem('password')
      },
      channels: [`#${channel}`]
    };
    const client = new tmi.client(options);
    client.connect();
    let messages;
    sessionStorage.setItem('twitchMessages', JSON.stringify([]))
    client.on('message', (channel, userstate, message, self) => {
      // Handle different message types..
      if (userstate["message-type"] === 'chat') {
        messages = JSON.parse(sessionStorage.getItem('twitchMessages'));
        messages.push({
          message: message,
          time: new Date()
        });
        sessionStorage.setItem(
          'twitchMessages', JSON.stringify(messages));
      }
    });
  }
}())
