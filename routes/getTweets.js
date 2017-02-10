'use strict';

const express = require('express');
const app = express.Router();
const Twitter = require('twitter');
const wordfrequency = require('../public/js/wordfrequency').wordfrequency;
const getTweets = require('../public/js/getTweetsfn').getTweets;

//this is an express route that will return tweets given a specific search term passed in the url
app.get('/getTweets/:search', function(req, res) {
    //path is the twitter api endpoint you want to access, see all endpoints here: https://dev.twitter.com/rest/reference
    let path = 'search/tweets.json'
        //params are the values to url encode when hitting the twitter endpoint
    let params = {
        q: req.params.search,
        count: 100,
        lang: 'en',
        '-filter': 'retweets'
    }
    let count = 1;
    let obj = {};
    getTweets(path, params, count, obj, res);
});

module.exports = app;
