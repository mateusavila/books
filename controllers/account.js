'use strict';


module.exports = function (server) {

    var User = require('../models/userModel');
    var bcrypt = require('bcrypt');

    var checkAuth = function(req, res, next) {
        if (!req.session.user_id) {
            res.redirect('/login');
        } else {
            next();
        }
    };

    server.get('/account', checkAuth, function (req, res) {
        var model = {};
        User.findOne({ '_id': req.session.user_id }, {},  function (err, account) {
            console.log(account);

            model.account = account;
            res.render('admin/my-account', model);
        });
    });

    server.post('/account', checkAuth, function (req, res) {
        var model = {};
        User.findOne({ '_id': req.session.user_id }, {},  function (err, account) {
            account.name = req.body.name;

            if (req.body.password) {
                bcrypt.genSalt(10, function(err, salt) {
                    bcrypt.hash(req.body.password, salt, function(err, hashPswd) {
                        
                        account.password = hashPswd;

                        account.save();
                        model.account = account;
                        res.render('admin/my-account', model);
                    });
                });
            } else {
                account.save();
                model.account = account;
                res.render('admin/my-account', model);
            }

        });

    });
};
