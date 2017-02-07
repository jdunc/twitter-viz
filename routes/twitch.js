'use strict';

const express = require('express');
const router = express.Router();
const request = require('request');

router.get('/', (req, res, next) => {
    res.render('landing');
});

router.get('/response', (req, res, next) => {
    request.post('https://api.twitch.tv/kraken/oauth2/token', {
        'form': {
            'client_id': process.env.CLIENT_ID,
            'client_secret': process.env.CLIENT_SECRET,
            'grant_type': 'authorization_code',
            'redirect_uri': 'http://localhost:8000/twitch/response',
            'code': req.query.code
        }
    }, (err, httpResponse, body) => {
        console.log(JSON.parse(body).access_token);
        res.cookie('token', {
            'access_token': JSON.parse(body).access_token
        });
        res.render('twitchauthorized');
    });
})


module.exports = router;
