'use strict';

const express = require('express');
const app = express.Router();
let Twitter = require('twitter');
//store all the verifications in a .env file, receive keys and secrets by creating an app at https://apps.twitter.com/
let client = new Twitter({
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token_key: process.env.ACCESS_TOKEN_KEY,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET
});
//this is an express route that will return tweets given a specific search term passed in the url
app.get('/getTweets/:search', function(req, res) {
    //path is the twitter api endpoint you want to access, see all endpoints here: https://dev.twitter.com/rest/reference
    let path = 'search/tweets.json'
        //params are the values to url encode when hitting the twitter endpoint
    let params = {
        q: req.params.search,
        count: 100,
    }
    let count = 1;
    let obj = {};
    getTweets(path, params, count, obj);

    function getTweets(path, params, count, obj) {
        //this is the twitter module's method of hitting the endpoint and returning the results
        client.get(path, params, function(error, tweets, response) {
            if (error) throw error;
            let max_id = tweets.search_metadata.max_id;
            let lastTweetIndex = tweets.statuses.length - 1;
            let since_id = tweets.statuses[lastTweetIndex].id;
            let maxCount = 2; //the total number of calls to api we want to make per search term
            //add these paramateres max_id and since_id so that future searches don't return the same tweets
            params.max_id = max_id;
            params.since_id = since_id;
            if (count === 1) {
                obj.tweets = tweets;
                obj.response = response;
                count++;
                getTweets(path, params, count, obj);
                // console.log('p1', params);
                // console.log(max_id, since_id);
            } else if (count <= maxCount) {
                obj.tweets.statuses.push(tweets.statuses);
                let responseName = `response${count}`;
                obj[responseName] = response;
                // console.log('length', obj.tweets.length);
                // console.log('p2', params);
                // console.log(max_id, since_id);
                if (count === maxCount) {
                    let tweetsArray = [];
                    obj.tweets.statuses.forEach(function(item, index) {
                        tweetsArray.push(item.text);
                    });
                    let allTweetsText = tweetsArray.join(' ');
                    let allTweetsParsed = allTweetsText.replace(/\b\S*?http\S*\b/g, " ");
                    allTweetsParsed = allTweetsParsed.replace(/@\w*:*?/g, "");
                    allTweetsParsed = allTweetsParsed.replace(/ RT /g, " ");
                    obj.text = allTweetsParsed;

                    res.send(obj);
                } else {
                    count++;
                    getTweets(path, params, count, obj);
                }
            }
        }); //end of client.get
    }
    //stream is an alternate method to receive tweets by updating periodically when new tweets are released, very slow for development, don't understand it's usefulness for us
    // let stream = client.stream('statuses/filter', {
    //     track: 'javascript, kittens, joy, monday'
    // });
    // stream.on('data', function(event) {
    //     console.log(event && event.text);
    // });
});



module.exports = app;
