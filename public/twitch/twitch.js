function loadFeaturedStream(topStream) {
    $('#stream').attr('src',
        `http://player.twitch.tv/?channel=${topStream[0].stream.channel.name}`
    );
    $('#chat').attr('src',
        `http://www.twitch.tv/${topStream[0].stream.channel.name}/chat`
    );
}

function loadSelectedStream() {
    let streamName = $('#inputField').val();
    $('#stream').attr('src',
        `http://player.twitch.tv/?channel=${streamName}`
    );
    $('#chat').attr('src',
        `http://www.twitch.tv/${streamName}/chat`
    );
}
