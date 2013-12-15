// config/passport.js

// load all the things we need
var LocalStrategy   = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;

// load up the user model
var User = require('../app/models/user');

// load the auth variables
var configAuth = require('./auth');

// expose this function to our app using module.exports
module.exports = function(passport) {

	// // =========================================================================
 //    // passport session setup ==================================================
 //    // =========================================================================
 //    // required for persistent login sessions
 //    // passport needs ability token serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

 //    // =========================================================================
 //    // LOCAL LOGIN =============================================================
 //    // =========================================================================
 //    // we are using named strategies since we have one for login and one for signup
 //    // by default, if there was no name, it would just be called 'local'

    passport.use('local-login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) { // callback with email and password from our form

        User.findOne({ 'local.email' :  email }, function(err, user) {
            if (err) { 
              return done(err); 
            }

            if (!user) {
              return done(null, false);
            }

            if (!user.validPassword(password)) {
              return done(null, false);
            }

            return done(null, user);
        });

    }));


 //    // =========================================================================
 //    // LOCAL SIGNUP ============================================================
 //    // =========================================================================
 //    // we are using named strategies since we have one for login and one for signup
 //    // by default, if there was no name, it would just be called 'local'

    // passport.use('local-signup', new LocalStrategy({
    //     // by default, local strategy uses username and password, we will override with email
    //     usernameField : 'email',
    //     passwordField : 'password',
    //     passReqToCallback : true // allows us to pass back the entire request to the callback
    // },
    // function(req, email, password, done) {

    //     // find a user whose email is the same as the forms email
    //     // we are checking to see if the user trying to login already exists
    //     User.findOne({ 'local.email' :  email }, function(err, user) {
    //         // if there are any errors, return the error
    //         if (err)
    //             return done(err);

    //         // check to see if theres already a user with that email
    //         if (user) {
    //             return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
    //         } else {

    //             // if there is no user with that email
    //             // create the user
    //             var newUser            = new User();

    //             // set the user's local credentials
    //             newUser.local.email    = email;
    //             newUser.hashPassword(password);

    //             // save the user
    //             newUser.save(function(err) {
    //                 if (err)
    //                     throw err;
    //                 return done(null, newUser);
    //             });
    //         }

    //     });        

    // }));

    // =========================================================================
    // FACEBOOK ================================================================
    // =========================================================================
    passport.use(new FacebookStrategy({

        // pull in our app id and secret from our auth.js file
        clientID        : configAuth.facebookAuth.clientID,
        clientSecret    : configAuth.facebookAuth.clientSecret,
        callbackURL     : configAuth.facebookAuth.callbackURL

    },

    // facebook will send back the token and profile
    function(token, refreshToken, profile, done) {
        console.log('PASSPORT FACEBOOK');

        // asynchronous
        process.nextTick(function() {

            // find the user in the database based on their facebook id
            User.findOne({ 'facebook.id' : profile.id }, function(err, user) {

                // if there is an error, stop everything and return that
                // ie an error connecting to the database
                if (err)
                    return done(err);

                // if the user is found, then log them in
                if (user) {
                    return done(null, user); // user found, return that user
                } else {

                    // Checa se usuário já existe na base com email fornecido pelo FB, se tiver atualiza conta
                    User.find({ "local.email" : profile.emails[0].value}, function(err, user){
                        var _user = user[0];

                        if (!_user) {
                            _user = new User();
                            _user.local.name = profile.displayName;
                            _user.local.email = profile.emails[0].value;
                            // RANDOM 6 DIGISTS PASSWORD
                            _user.hashPassword(Math.floor(Math.random()*90000) + 100000);
                        }

                        _user.facebook.id    = profile.id; // set the users facebook id                   
                        _user.facebook.token = token; // we will save the token that facebook provides to the user                    
                        _user.facebook.name  = profile.displayName; // look at the passport user profile to see how names are returned
                        _user.facebook.email = profile.emails[0].value; // facebook can return multiple emails so we'll take the first

                        _user.activate(true);
                        // save our user to the database
                        _user.save(function(err) {
                            if (err)
                                throw err;

                            // if successful, return the new user
                            return done(null, _user);
                        });
                    });
                }

            });
        });

    }));

};
