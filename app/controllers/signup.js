// app/routes.js
module.exports = function(app, passport) {

  var Page = require('../models/page');

  // =====================================
  // SIGNUP ==============================
  // =====================================
  // show the signup form
  app.get('/signup', function(req, res) {

    var model = {};
    model.page = new Page();

    model.page.title = "Cadastre-se - Doe um Livro";
    model.page.description = "Cadastre-se - Doe um Livro";
    model.page.scripts = [
      "/components/parsleyjs/dist/parsley.min.js"
    ];

    model.message = req.flash('signupMessage');

    // render the page and pass in any flash data if it exists
    res.render('admin/signup.ejs', model);
  });

  // process the signup form
  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect : '/profile', // redirect to the secure profile section
    failureRedirect : '/signup', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
  }));
};
