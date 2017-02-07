'use strict';

const express = require('express');
const app = express.Router();
var passport = require('passport');
var Strategy = require('passport-twitter').Strategy;

passport.use(new Strategy({
        consumerKey: process.env.CONSUMER_KEY,
        consumerSecret: process.env.CONSUMER_SECRET,
        callbackURL: '/login/twitter/return'
    },
    function(token, tokenSecret, profile, cb) {
        // In this example, the user's Twitter profile is supplied as the user
        // record.  In a production-quality application, the Twitter profile should
        // be associated with a user record in the application's database, which
        // allows for account linking and authentication with other identity
        // providers.
        return cb(null, profile);
    }));

app.get('/',
    function(req, res) {
        res.render('home', {
            user: req.user
        });
    });

app.get('/login',
    function(req, res) {
        res.render('login');
    });

app.get('/login/twitter',
    passport.authenticate('twitter'));

app.get('/login/twitter/return',
    passport.authenticate('twitter', {
        failureRedirect: '/login'
    }),
    function(req, res) {
        res.redirect('/');
    });

app.get('/profile',
    require('connect-ensure-login').ensureLoggedIn(),
    function(req, res) {
        res.render('profile', {
            user: req.user
        });
    });




module.exports = app;
