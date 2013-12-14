// app/routes.js
module.exports = function(app, passport) {

  var Page = require('../models/page');
  var utils = require('../utils');


  // =====================================
  // PROFILE SECTION =========================
  // =====================================
  // we will want this protected so you have to be logged in to visit
  // we will use route middleware to verify this (the isLoggedIn function)
  app.get('/profile', utils.checkAuth, function(req, res) {
    
    var model = {};
    model.page = new Page();

    model.page.title = "Doe um Livro";
    model.page.description = "Doe um Livro";

    if (req.user) {
      model.page.fillUser(req.user);
    }

    model.user = req.user;

    res.render('admin/profile.ejs', model);
  });
};