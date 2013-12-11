'use strict';

var db = require('./lib/database'),
    express = require('express');

var kraken = require('kraken-js'),
    app = {};


app.configure = function configure(nconf, next) {
    // Fired when an app configures itself
    db.config(nconf.get('databaseConfig'));
    next(null);
};


app.requestStart = function requestStart(server) {
    // Fired at the beginning of an incoming request
};


app.requestBeforeRoute = function requestBeforeRoute(server) {
    // Fired before routing occurs
    server.use(express.methodOverride());
};


app.requestAfterRoute = function requestAfterRoute(server) {
    // Fired after routing occurs
};


kraken.create(app).listen(function (err) {
    if (err) {
        console.error(err);
    }
});
