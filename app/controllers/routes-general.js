// app/routes.js
module.exports = function(app, passport) {

	var Page = require('../models/page');
  var utils = require('../utils');

	// =====================================
	// HOME PAGE (with login links) ========
	// =====================================
	app.get('/', function(req, res) {

		var model = {};
    model.page = new Page();

    model.page.title = "Minha conta - Doe um Livro";
    model.page.description = "Minha conta - Doe um Livro";

    if (req.user) {
    	model.page.fillUser(req.user);
    }

		res.render('index.ejs', model); // load the index.ejs file
	});

	// =====================================
	// FACEBOOK ROUTES =====================
	// =====================================
	// route for facebook authentication and login
	app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

	// handle the callback after facebook has authenticated the user
	app.get('/auth/facebook/callback',
		passport.authenticate('facebook', {
			successRedirect : '/profile',
			failureRedirect : '/'
		}));

	// =====================================
	// LOGOUT ==============================
	// =====================================
	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});
};