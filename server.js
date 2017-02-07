var express = require('express');
require('dotenv').config();
const port = process.env.PORT || 8000;
const getTweets = require('./routes/getTweets');
const twitch = require('./routes/twitch');
const home = require('./routes/home');


var app = express();

app.use(express.static('public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(home);
app.use(getTweets);
app.use('/twitch', twitch);



app.listen(port);

console.log('server here on port ', port);
