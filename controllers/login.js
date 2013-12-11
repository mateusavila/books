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

    server.get('/login', function (req, res) {
        if (!req.session.user_id) {
            res.render('admin/login');
        } else {
            res.redirect('/');
        }
        
    });

    server.post('/login', function (req, res) {
        
        var email = req.body.email;
        var pswd = req.body.password;


        User.findOne({ 'email': email }, {},  function (err, user) {
            if (err) return handleError(err);
            
            if (!user) {
                res.send(403, { success: 'User dont exists' });
            } else {
                bcrypt.compare(pswd, user.password, function(err, status) {
                    console.log('RESPOSTA DA COMPARAÇÃO', status);
                    if (status) {
                        req.session.user_id =  user.id;
                        res.send(200, { success: 'Success login' });
                    } else {
                        res.send(401, { success: 'Wrong pswd' });
                    }
                });
            }
            
        });

    });
};
