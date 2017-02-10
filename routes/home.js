'use strict';

const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.render('landing2');
});

router.get('/twitter', (req, res, next) => {
    res.render('twitter-d3');
});


module.exports = router;
