function loadFeaturedStream(values) {
    $('#stream').attr('src',
        `http://player.twitch.tv/?channel=${values[1].featured[0].stream.channel.name}`
    );
    $('#chat').attr('src',
        `http://www.twitch.tv/${values[1].featured[0].stream.channel.name}/chat`
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
