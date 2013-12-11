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

    server.post('/donate', checkAuth, function (req, res) {
        console.log(req);
        //Retrieve data
        var name = req.body.name;
        var category = req.body.category;
        var giver = req.session.user_id;

        //Create a new instance of a Product
        var newBook = new Book({name: name, category: category, giver: giver});

        //Save it to the database.
        newBook.save(function(err,book) {
            res.redirect('/donate/' + book.id);
        });

    });

    server.delete('/books', function (req, res) {
        Book.remove({_id: req.body.book_id}, function (err) {
            if (err) {
                console.log('Remove error: ', err);
            }
            res.redirect('/');
        });
    });
};
