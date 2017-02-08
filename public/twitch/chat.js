(function() {
    let messageIndex = 0;
    function chatGrabber() {
        let messages = JSON.parse(sessionStorage.getItem('twitchMessages'))
        let recentMessages = messages.slice(messageIndex);
        console.log(recentMessages);
        // mapWordData(recentMessages)
        messageIndex = messages.length;
    }

    setInterval(chatGrabber, 30000);



    function chatTimeGrabber() {
        let messages = JSON.parse(sessionStorage.getItem('twitchMessages'))

    }
}())
