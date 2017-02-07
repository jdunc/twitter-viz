'use strict';

const express = require('express');
const app = express.Router();
var Twitter = require('twitter');

//store all the verifications in a .env file, receive keys and secrets by creating an app at https://apps.twitter.com/
var client = new Twitter({
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token_key: process.env.ACCESS_TOKEN_KEY,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET
});

//this is an express route that will return tweets given a specific search term passed in the url
app.get('/getTweets/:search', function(req, res) {

    // var path = 'favorites/list'; //an example endpoint to see the favorites of the specific user who created the app

    //path is the twitter api endpoint you want to access, see all endpoints here: https://dev.twitter.com/rest/reference
    var path = 'search/tweets.json'
        //params are the values to url encode when hitting the twitter endpoint
    var params = {
            q: req.params.search,
            count: 100
        }
        //this is the twitter module's method of hitting the endpoint and returning the results
    client.get(path, params, function(error, tweets, response) {
        if (error) throw error;
        var obj = {};
        obj.tweets = tweets;
        obj.response = response;
        res.send(obj);
    });

    //stream is an alternate method to receive tweets by updating periodically when new tweets are released, very slow for development, don't understand it's usefulness for us
    // var stream = client.stream('statuses/filter', {
    //     track: 'javascript, kittens, joy, monday'
    // });
    // stream.on('data', function(event) {
    //     console.log(event && event.text);
    // });

});



module.exports = app;
