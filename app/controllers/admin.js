// app/routes.js
module.exports = function(app, passport) {

  var Page = require('../models/page');
  var utils = require('../utils');

  // =====================================
  // PROFILE SECTION =========================
  // =====================================
  // we will want this protected so you have to be logged in to visit
  // we will use route middleware to verify this (the isLoggedIn function)
  app.get('/profile', utils.isLoggedIn, function(req, res) {
    res.render('admin/profile.ejs', {
      user : req.user // get the user out of session and pass to template
    });
  });
};