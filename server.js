var express = require('express');
var passport = require('passport');
var Strategy = require('passport-twitter').Strategy;
require('dotenv').config();
const port = process.env.PORT || 8000;
const signInRoute = require('./routes/signIn');
const getTweets = require('./routes/getTweets');
const twitch = require('./routes/twitch');

var app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(getTweets);
app.use('/twitch', twitch);



app.listen(port);

console.log('server here on port ', port);
