const express = require('express');
const mocha = require('mocha');
const chai = require('chai').expect;
const app = require('../server');
const request = require('supertest');

describe('GET /', () => {
    it('responds with OK', done => {
        request(app)
            .get('/')
            .expect(200, done);
    });
})

describe('GET /getTweets', () => {
    it('responds period', done => {
        request(app)
            .get('/getTweets/kittens')
            .expect(200, done);
    })
})
