// server.js

// set up ======================================================================
// get all the tools we need
var express  = require('express');
var app      = express();
var port     = process.env.PORT || 8080;
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');
var nodemailer = require("nodemailer");

var configDB = require('./config/database.js');
var configSMTP = require('./config/smtp.js');

var smtpTransport = nodemailer.createTransport("SMTP", configSMTP);

// configuration ===============================================================
mongoose.connect(configDB.url); // connect to our database

require('./config/passport')(passport); // pass passport for configuration

app.configure(function() {

	// set up our express application
	app.use(express.logger('dev')); // log every request to the console
	app.use(express.cookieParser()); // read cookies (needed for auth)
	app.use(express.bodyParser()); // get information from html forms

	app.set('view engine', 'ejs'); // set up ejs for templating
	app.use(express.static(__dirname + '/public'));
	app.use(express.static(__dirname + '/compiled'));

	// required for passport
	app.use(express.session({ secret: 'sciencebitch' })); // session secret
	app.use(passport.initialize());
	app.use(passport.session()); // persistent login sessions
	app.use(flash()); // use connect-flash for flash messages stored in session

	app.use(express.csrf());
	app.use(function(req, res, next){
	    res.locals.token = req.csrfToken();
	    next();
	});

});

// routes ======================================================================
require('./config/routes.js')(app, passport, smtpTransport);

// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);
