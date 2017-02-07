var express = require('express');
var passport = require('passport');
var Strategy = require('passport-twitter').Strategy;
require('dotenv').config();
const port = process.env.PORT || 8000;
const signInRoute = require('./routes/signIn');
const getTweets = require('./routes/getTweets');
const twitch = require('./routes/twitch');


// Configure the Twitter strategy for use by Passport. All this commented out code is for user login, maybe don't need at all in our app
//
// OAuth 1.0-based strategies require a `verify` function which receives the
// credentials (`token` and `tokenSecret`) for accessing the Twitter API on the
// user's behalf, along with the user's profile.  The function must invoke `cb`
// with a user object, which will be set at `req.user` in route handlers after
// authentication.
// console.log('process', process.env.CONSUMER_KEY);
// passport.use(new Strategy({
//         consumerKey: process.env.CONSUMER_KEY,
//         consumerSecret: process.env.CONSUMER_SECRET,
//         callbackURL: '/login/twitter/return'
//     },
//     function(token, tokenSecret, profile, cb) {
//         // In this example, the user's Twitter profile is supplied as the user
//         // record.  In a production-quality application, the Twitter profile should
//         // be associated with a user record in the application's database, which
//         // allows for account linking and authentication with other identity
//         // providers.
//         return cb(null, profile);
//     }));
//
//
// // Configure Passport authenticated session persistence.
// //
// // In order to restore authentication state across HTTP requests, Passport needs
// // to serialize users into and deserialize users out of the session.  In a
// // production-quality application, this would typically be as simple as
// // supplying the user ID when serializing, and querying the user record by ID
// // from the database when deserializing.  However, due to the fact that this
// // example does not have a database, the complete Twitter profile is serialized
// // and deserialized.
// passport.serializeUser(function(user, cb) {
//     cb(null, user);
// });
//
// passport.deserializeUser(function(obj, cb) {
//     cb(null, obj);
// });
//
//
// // Create a new Express application.
//
// // Configure view engine to render EJS templates.
//
// // Use application-level middleware for common functionality, including
// // logging, parsing, and session handling.
// app.use(require('morgan')('combined'));
// app.use(require('cookie-parser')());
// app.use(require('body-parser').urlencoded({
//     extended: true
// }));
// app.use(require('express-session')({
//     secret: 'keyboard cat',
//     resave: true,
//     saveUninitialized: true
// }));
//
//
// // Initialize Passport and restore authentication state, if any, from the
// // session.
// app.use(passport.initialize());
// app.use(passport.session());
// app.use(signInRoute);

var app = express();
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(getTweets);
app.use('/twitch', twitch);



app.listen(port);

console.log('server here');
