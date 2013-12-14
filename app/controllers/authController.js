module.exports = function(passport, page){

  var _priv = {};

  _priv.forceLogin = function(req, res, user) {
    if (user) {
      req.login(user, function(err) {
        var url = req.session.redirUrl ? req.session.redirUrl : '/admin/profile';
        res.send(200, { redirUrl: url });
      });
    } else {
      res.send(401);
    }
  };

  return {
    login : function(req, res) {
      console.log('POST LOGIN');
      passport.authenticate('local-login', function(err, user) {
        _priv.forceLogin(req, res, user);
      })(req, res);
    },

    logout : function (req, res) {
      req.logout();
      res.redirect('/');
    },

    signup : function(req, res) {
      passport.authenticate('local-signup', function(err, user) {
        _priv.forceLogin(req, res, user);
      })(req, res);
    },

    facebook : passport.authenticate('facebook', { scope : 'email' }),

    facebookCallback : passport.authenticate('facebook', {
      successRedirect : '/admin/profile',
      failureRedirect : '/'
    }),

    renderLogin : function(req, res) {
      var model = {};
      model.page = new page();
      res.render('admin/login.ejs', model);
    },

    renderSignup : function(req, res) {
      var model = {};
      model.page = new page();
      res.render('admin/signup.ejs', model);
    }
  }
};