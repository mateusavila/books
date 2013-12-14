var utils = {

  // route middleware to make sure
  checkAuth : function (req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated()) {
      if (req.url.indexOf('/login') !== -1 || req.url.indexOf('/signup') !== -1 ) {
        res.redirect('/');
      } else {
        return next();
      }
    }

    var url = req.url ? '/login?u=' + encodeURIComponent(req.url) : '/login';
    // if they aren't redirect them to the home page
    res.redirect(url);
  },

  canAccessLoginOrSignup : function(req, res, next) {
    if (req.isAuthenticated()) {
      res.redirect('/');
    } else {
      return next();
    }
  }
}

// create the model for users and expose it to our app
module.exports = utils;
