'use strict';


module.exports = function (server) {

    var Book = require('../models/bookModel');

    server.get('/books', function (req, res) {
        Book.find(function (err, books) {
            
            if (err) {
                console.log(err);
            }

            console.log(books);

            res.json(books);
        });
        
    });

    server.post('/books', function (req, res) {
        //Retrieve data
        var name = req.body.name;
        var category = req.body.category;

        //Create a new instance of a Product
        var newBook = new Book({name: name, category: category});

        //Save it to the database.
        newBook.save();

        res.redirect('/');
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
