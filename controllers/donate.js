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

    server.get('/donate/:id', function (req, res) {
        Book.findOne({ '_id': req.params.id }, {},  function (err, book) {
            if (err) return handleError(err);
            
            console.log('BOOK', book);
            res.render('admin/raffle', book);
            
        });

    });
};
