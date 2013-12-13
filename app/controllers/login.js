// app/routes.js
module.exports = function(app, passport) {

  var Page = require('../models/page');

  // =====================================
  // LOGIN ===============================
  // =====================================
  // show the login form
  app.get('/login', function(req, res) {

    var model = {};
    model.page = new Page();

    model.page.title = "Login - Doe um Livro";
    model.page.description = "Login - Doe um Livro";
    model.page.scripts = [
      "/components/parsleyjs/dist/parsley.min.js"
    ];

    model.message = req.flash('loginMessage');

    // render the page and pass in any flash data if it exists
    res.render('admin/login.ejs', model);
  });

  // process the login form
  app.post('/login', passport.authenticate('local-login'), function(req, res){
    console.log('LOGIN COM SUCESSO');
    console.log(req.query);

    var redirUrl = decodeURIComponent(req.query.u);

    res.render(redirUrl);
  });
};
