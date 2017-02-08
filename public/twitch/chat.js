(function() {
    function chatGrabber(timeRange) {
        // when called, chatGrabber should return an array filled with messages that match the timeRange parameter (in miliseconds)
        let messages = JSON.parse(sessionStorage.getItem('twitchMessages')) || [];
        let times = messages.map((elem) => {
            return new Date(elem.time).getTime()
        })
        // new Date is used to convert the ISO formatted date back into a javascript date object, allowing the getTime method to be used
        let lastMessage = times[times.length-1];
        let lastMessages = [];
        // goes through times array starting at end (most recent) and adds all messages with corresponding index
        for (let i = times.length-1; i > -1; i--) {
            if (lastMessage - times[i] <= timeRange) {
                lastMessages.push(messages[i].message)
            } else {
                break
            }
        }
        console.log(lastMessages);
        // mapWordData(recentMessages)
    }

    // every second, chatGrabber returns array of messages sent in past 5 seconds
    let timeRange = 5000;
    chatGrabber(timeRange)
    setInterval(() => {
        chatGrabber(timeRange)
    }, 1000);
}())
