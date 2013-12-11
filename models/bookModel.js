'use strict';

var mongoose = require('mongoose');

var bookModel = function () {

    //Define a super simple schema for our products.
    var bookSchema = mongoose.Schema({
        name: String,
        category: String
    });

    return mongoose.model('Book', bookSchema);

};

module.exports = new bookModel();