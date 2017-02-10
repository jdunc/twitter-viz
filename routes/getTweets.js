'use strict';

const express = require('express');
const app = express.Router();
const Twitter = require('twitter');
const wordfrequency = require('../public/js/wordfrequency').wordfrequency;
//store all the verifications in a .env file, receive keys and secrets by creating an app at https://apps.twitter.com/
const client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});
//this is an express route that will return tweets given a specific search term passed in the url
app.get('/getTweets/:search', function(req, res) {
    //path is the twitter api endpoint you want to access, see all endpoints here: https://dev.twitter.com/rest/reference
    let path = 'search/tweets.json'
        //params are the values to url encode when hitting the twitter endpoint
    let params = {
        q: req.params.search,
        count: 100,
        '-filter': 'retweets'
    }
    let count = 1;
    let obj = {};
    getTweets(path, params, count, obj);

    function getTweets(path, params, count, obj, tweetStatuses) {
        //this is the twitter module's method of hitting the endpoint and returning the results
        client.get(path, params, function(error, tweets, response) {
            if (error) {
                return res.status(400).send(error);
            };
            let max_id = tweets.search_metadata.max_id_str;
            let lastTweetIndex = tweets.statuses.length - 1;
            let since_id = tweets.statuses[lastTweetIndex].id;
            let maxCount = 3; //the total number of calls to api we want to make per search term
            //add these paramateres max_id and since_id so that future searches don't return the same tweets
            params.max_id = tweets.statuses[lastTweetIndex].id_str;
            // params.since_id = tweets.search_metadata.max_id_str;
            if (count === 1) {
                //add the results from the twitter api call to "obj" so that it can be stored between twitter api calls
                obj.tweets = tweets;
                obj.response = response;
                count++;
                getTweets(path, params, count, obj, tweetStatuses);
            } else if (count <= maxCount) {
                //add new results to existing results in object
                tweets.statuses.forEach(function(item, index) {
                    obj.tweets.statuses.push(item);
                });
                let responseName = `response${count}`;
                obj[responseName] = response;
                if (count === maxCount) {
                    // console.log('max', count, obj.tweets.statuses.length);
                    let tweetsImagesArray = [];
                    let tweetsArray = [];
                    //add text of tweet to array and add image url if it exists
                    obj.tweets.statuses.forEach(function(item, index) {
                        tweetsArray.push(item.text);
                        if (item.entities.media !== undefined && (item.entities.media[0].type === "photo" || item.entities.media[0].type === "animated_gif")) {
                            tweetsImagesArray.push(item.entities.media[0].media_url);
                        }
                    });
                    //combine and clean the text of the tweets
                    let allTweetsText = tweetsArray.join(' ');
                    let allTweetsParsed = allTweetsText.replace(/\b\S*?http\S*\b/g, " ").replace(/@\w*:*?/g, "").replace(/ RT /g, " ");
                    obj.text = allTweetsParsed;
                    let wordFrequencyObject = wordfrequency(obj.text);
                    let sendResults = {
                        text: wordFrequencyObject,
                        images: tweetsImagesArray
                    }
                    res.send(sendResults);
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
