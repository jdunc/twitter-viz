function loadFeaturedStream(topStream) {
    $('#stream').attr('src',
        `http://player.twitch.tv/?channel=${topStream[0].stream.channel.name}`
    );
    $('#chat').attr('src',
        `http://www.twitch.tv/${topStream[0].stream.channel.name}/chat`
    );
}
