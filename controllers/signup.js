'use strict';


module.exports = function (server) {

    var User = require('../models/userModel');
    var bcrypt = require('bcrypt');

    server.get('/signup', function (req, res) {
        if (!req.session.user_id) {
            res.render('admin/signup');
        } else {
            res.redirect('/');
        }
        
    });

    server.post('/signup', function (req, res) {
        
        var email = req.body.email;
        var name = req.body.name;
        var pswd = req.body.password;

        console.log('SIGNUP');
        console.log(req.body);

        User.findOne({ 'email': email }, {},  function (err, status) {
            console.log('Status', status);

            if (!status) {
                bcrypt.genSalt(10, function(err, salt) {
                    bcrypt.hash(pswd, salt, function(err, hashPswd) {
                        console.log(hashPswd);
                        
                        var newUser = new User({name: name, password: hashPswd, email: email});

                        newUser.save(function(err,user) {
                            req.session.user_id =  user.id;

                            res.send(200, { success: 'Account created' });
                        });
                    });
                });
            } else {
                res.send(409, { error: 'User already exists' });
            }
        });


    });
};
