'use strict';

var mongoose = require('mongoose');

var userModel = function () {

    //Define a super simple schema for our products.
    var userSchema = mongoose.Schema({
        name: String,
        email: String,
        password: String,
        tickets: Integer,
        status: Boolean
    });

    return mongoose.model('User', userSchema);

};

module.exports = new userModel();