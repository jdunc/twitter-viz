(function() {
    function chatGrabber(timeRange) {
        console.log('ja;lsdfkjalsdfja');
        // when called, chatGrabber should return an array filled with messages that match the timeRange parameter (in miliseconds)
        let messages = JSON.parse(sessionStorage.getItem('twitchMessages')) || [];
        let times = messages.map((elem) => {
            return elem.time
        })
        // new Date is used to convert the ISO formatted date back into a javascript date object, allowing the getTime method to be used
        console.log(new Date(times[0]).getTime());


        // mapWordData(recentMessages)
    }

    let timeRange = 5000;
    chatGrabber(timeRange)
    setInterval(() => {
        chatGrabber(timeRange)
    }, timeRange);
}())
