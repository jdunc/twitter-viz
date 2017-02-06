$(function() {
    console.log("ready!");
    Twitch.init({
        clientId: 'ipr78n41sqd6fqbacj2gykwv5lxpnd'
    }, function(error, status) {
        if (status.authenticated) {
            // Already logged in, hide button
            $('.twitch-connect').hide()
        }
        console.log('worked:', status);
        $('.twitch-connect').click(function() {
            console.log('clicked login');
            console.log(status);
        });
        // $.ajax({
        //     type: 'GET',
        //     url: 'https://api.twitch.tv/kraken/streams/featured',
        //     headers: {
        //         'Client-ID': 'ipr78n41sqd6fqbacj2gykwv5lxpnd'
        //     },
        //     success: function(data) {
        //         console.log('DATA IS HEREEERERERESFJGL;SKFJDGSL;JFK', data);
        //     }
        // });
        // the sdk is now loaded
    });

});
