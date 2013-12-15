// app/models/user.js
// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var userSchema = mongoose.Schema({

    local            : {
        name         : String,
        email        : String,
        password     : String,
    },
    facebook         : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    },
    twitter          : {
        id           : String,
        token        : String,
        displayName  : String,
        username     : String
    },
    google           : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    },
    tickets          : Number,
    active           : Boolean,
    activateHash     : String,
    changePswdHash   : String

});

// checking if password is valid using bcrypt
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

userSchema.methods.manageTickets = function(tickets) {
    var user = this;
    user.tickets = user.tickets ? user.tickets : 0;
    user.tickets += tickets;
};

userSchema.methods.activate = function(status) {
    var user = this;
    user.active = status;
};

userSchema.methods.generateToken = function(status) {
    var user = this,
        hash = ""

    for( var i=0; i < 6; i++ )
        hash += Math.floor(Math.random() * 9);

    console.log(hash);

    user.activateHash = hash;

    return hash;
};

// this method hashes the password and sets the users password
userSchema.methods.hashPassword = function(password) {
    var user = this;

    // hash the password
    bcrypt.hash(password, null, null, function(err, hash) {
        if (err)
            return next(err);

        user.local.password = hash;
    });

};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);
