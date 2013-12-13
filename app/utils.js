var utils = {

  // route middleware to make sure
  isLoggedIn : function (req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
      return next();

    var url = req.url ? '/login?u=' + encodeURIComponent(req.url) : '/login';

    // if they aren't redirect them to the home page
    res.redirect(url);
  }

  
}

// create the model for users and expose it to our app
module.exports = utils;
