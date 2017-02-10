function loadFeaturedStream(topStream) {
    $('#stream').attr('src',
        `http://player.twitch.tv/?channel=${topStream}`
    );
    $('#chat').attr('src',
        `http://www.twitch.tv/${topStream}/chat`
    );
}

function loadSelectedStream() {
    let streamName = $('#streamInput').val();
    $('#stream').attr('src',
        `http://player.twitch.tv/?channel=${streamName}`
    );
    $('#chat').attr('src',
        `http://www.twitch.tv/${streamName}/chat`
    );
    $('#streamInput').val('');
    return streamName;
}
