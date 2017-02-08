function loadFeaturedStream(values) {
    $('#stream').attr('src',
        `http://player.twitch.tv/?channel=${values[1].featured[0].stream.channel.name}`
    );
    $('#chat').attr('src',
        `http://www.twitch.tv/${values[1].featured[0].stream.channel.name}/chat`
    );
}
