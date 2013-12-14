module.exports = function(passport, page){

  return {
    login : function(req, res) {
      console.log('POST LOGIN');
      passport.authenticate('local-login', function(err, user) {
        if (user) {
          var url = req.session.redirUrl ? req.session.redirUrl : '/admin/profile';
          res.send(200, { redirUrl: url });
        } else {
          res.send(401);
        }
      })(req, res);
    },

    logout : function (req, res) {
      req.logout();
      res.redirect('/');
    },

    signup : passport.authenticate('local-signup', function(req, res) {
      console.log('ERR');
      console.log(res);
    }),

    facebook : passport.authenticate('facebook', { scope : 'email' }),

    facebookCallback : passport.authenticate('facebook', {
      successRedirect : '/profile',
      failureRedirect : '/'
    }),

    renderLogin : function(req, res) {
      var model = {};
      model.page = new page();

      model.page.title = "Login - Doe um Livro";
      model.page.description = "Login - Doe um Livro";
      model.page.scripts = [
        "/components/parsleyjs/dist/parsley.min.js",
        "/scripts/login.js"
      ];

      model.message = req.flash('loginMessage');

      // render the page and pass in any flash data if it exists
      res.render('admin/login.ejs', model);
    },

    renderSignup : function(req, res) {
      var model = {};
      model.page = new page();

      model.page.title = "Cadastre-se - Doe um Livro";
      model.page.description = "Cadastre-se - Doe um Livro";
      model.page.scripts = [
        "/components/parsleyjs/dist/parsley.min.js"
      ];

      model.message = req.flash('signupMessage');

      // render the page and pass in any flash data if it exists
      res.render('admin/signup.ejs', model);
    }
  }
};