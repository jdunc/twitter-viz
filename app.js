'use strict';

const express = require('express');
const path = require('path');
const port = process.env.PORT || 8000;
const app = express();
const home = require('./routes/home')

// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'))
app.use(express.static('images'))
    // app.use(bodyParser.json());

app.use(home);

app.use((_req, res, _next) => {
    res.sendStatus(404);
});

app.use((err, _req, res, _next) => {
    if (err.status) {
        return res
            .status(err.status)
            .set('Content-Type', 'text/plain')
            .send(err.message)
    }
    console.error(err.stack);
    res.sendStatus(500);
});

app.listen(port, () => {
    console.log('Listening on port', port);
});
module.exports = app;
