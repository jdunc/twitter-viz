(function() {
    // every 1000 milliseconds (second parameter), startChatGrabLoop returns array of messages sent in past 5000 milliseconds (first parameter)
    startChatGrabLoop(30000, 5000);

    function chatGrabber(timeRange) {
        // when called, chatGrabber should return an array filled with messages that match the timeRange parameter (in milliseconds)
        let messages = JSON.parse(sessionStorage.getItem('twitchMessages')) || [];
        let times = messages.map((elem) => {
                return new Date(elem.time).getTime()
            })
            // new Date is used to convert the ISO formatted date back into a javascript date object, allowing the getTime method to be used
        let lastMessage = times[times.length - 1];
        let lastMessages = [];
        // goes through times array starting at end (most recent) and adds all messages with corresponding index
        for (let i = times.length - 1; i > -1; i--) {
            if (lastMessage - times[i] <= timeRange) {
                lastMessages.push(messages[i].message)
            } else {
                break
            }
        }
        // console.log(lastMessages);
        mapWordData(lastMessages);
    }

    function startChatGrabLoop(timeRange, updateInterval) {
        chatGrabber(timeRange)
        setInterval(() => {
            chatGrabber(timeRange)
        }, updateInterval);
    }

    function mapWordData(messages) {
        let wordFreq = [];
        // refactor this ugly shit please
        const stopWords = [
            'about', 'after', 'all', 'also', 'am', 'an', 'and', 'another', 'any', 'are', 'as', 'at', 'be',
            'because', 'been', 'before', 'being', 'between', 'both', 'but', 'by', 'came', 'can',
            'come', 'could', 'did', 'do', 'each', 'for', 'from', 'get', 'got', 'has', 'had',
            'he', 'have', 'her', 'here', 'him', 'himself', 'his', 'how', 'if', 'in', 'into',
            'is', 'it', 'like', 'make', 'many', 'me', 'might', 'more', 'most', 'much', 'must',
            'my', 'never', 'now', 'of', 'on', 'only', 'or', 'other', 'our', 'out', 'over',
            'said', 'same', 'see', 'should', 'since', 'some', 'still', 'such', 'take', 'than',
            'that', 'the', 'their', 'them', 'then', 'there', 'these', 'they', 'this', 'those',
            'through', 'to', 'too', 'under', 'up', 'very', 'was', 'way', 'we', 'well', 'were',
            'what', 'where', 'which', 'while', 'who', 'with', 'would', 'you', 'your', 'a', 'i', 'so'
        ];
        // messages is an array of most recent chat messages (as strings)
        for (let i = 0; i < messages.length; i++) {
            let lower = messages[i].toLowerCase();
            let words = lower.split(' ');
            let filteredWords = words.filter(value => stopWords.indexOf(value.toLowerCase()) === -1);
            for (let j = 0; j < filteredWords.length; j++) {
                if (wordFreq[filteredWords[j]]) {
                    wordFreq[filteredWords[j]]++;
                } else {
                    wordFreq[filteredWords[j]] = 1;
                }
            }
        }
        let topWords = [];
        for (var key in wordFreq) {
            topWords.push({
                'word': key,
                'value': wordFreq[key]
            });
        };
        topWords.sort((a, b) => {
            return b.value - a.value
        });
        let streamName = sessionStorage.getItem('streamName');
        topWords = topWords.slice(0, 9);
        let words = topWords.map(e => e.word);
        let values = topWords.map(e => e.value);
        if (typeof chart !== 'undefined') {
            chart.update();
        } else {
            const chart = generateChart(words, values, streamName);
        }

        // console.log(wordFreq, topWords);
    }

}())
