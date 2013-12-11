'use strict';


module.exports = function (server) {

    var Book = require('../models/bookModel');
    var checkAuth = function(req, res, next) {
        if (!req.session.user_id) {
            res.redirect('/login');
        } else {
            next();
        }
    };

    server.get('/donate', checkAuth, function (req, res) {
        console.log('DONATE');
        res.render('donate');
    });
};
