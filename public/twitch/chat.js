(function() {
    function chatGrabber(timeRange) {
        console.log('ja;lsdfkjalsdfja');
        // when called, chatGrabber should return an array filled with messages that match the timeRange parameter (in miliseconds)
        let messages = JSON.parse(sessionStorage.getItem('twitchMessages'));
        if (messages !== null) {
            let times = messages.map((elem)=>{
                return elem.time
            })
            console.log(times[0]);
        }

        // mapWordData(recentMessages)
    }

    let timeRange = 5000;
    chatGrabber(timeRange)
    setInterval(()=>{
        console.log('in set interval');
        chatGrabber(timeRange)
    }, timeRange);
}())
