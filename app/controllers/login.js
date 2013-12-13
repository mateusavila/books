// app/routes.js
module.exports = function(app, passport) {

  var Page = require('../models/page');

  // =====================================
  // LOGIN ===============================
  // =====================================
  // show the login form
  app.get('/login', function(req, res) {

    console.log(Page);

    // render the page and pass in any flash data if it exists
    res.render('admin/login.ejs', { message: req.flash('loginMessage') });
  });

  // process the login form
  app.post('/login', passport.authenticate('local-login'), function(req, res){
    console.log('LOGIN COM SUCESSO');
    console.log(req.query);

    var redirUrl = decodeURIComponent(req.query.u);

    res.render(redirUrl);
  });
};
