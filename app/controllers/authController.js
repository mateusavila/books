module.exports = function(passport, smtp, page){

  var _p = {},
      User = require('../models/user'),
      GLOBALS = require('../../config/app');
      // emailTemplates = require('../views/email/minified/emails.js');

  _p.forceLogin = function(req, res, user) {
    if (user) {
      if (user.active) {
        req.login(user, function(err) {
          var url = req.session.redirUrl ? req.session.redirUrl : '/admin/profile';
          res.send(200, { redirUrl: url });
        });
      } else {
        var urlToValidateEmail = '/confirm-email?emailToValidate=' + encodeURIComponent(user.local.email);
        _p.sendConfirmationAccEmail(user.local.email, user.activateHash, urlToValidateEmail);
        
        res.send(403, { redirUrl: urlToValidateEmail });
      }
    } else {
      res.send(401);
    }
  };

  _p.sendConfirmationAccEmail = function(email, token, url) {
    var mailOptions = {
        from: "Doe um livro", // sender address
        to: email, // list of receivers
        // to: "leandroriente@gmail.com", // list of receivers
        subject: "Quase lá...", // Subject line
        text: "Falta pouco para você espalhar conhecimento", // plaintext body
        html: "<b>Seu token de acesso é " + token + ". <a href='" + GLOBALS.baseUrl + url + "'>Cadastre aqui</a></b>" // html body
    }

    console.log(smtp);

    // send mail with defined transport object
    smtp.sendMail(mailOptions, function(error, response){
        if(error){
            console.log(error);
        } else {
            console.log("Message sent: " + response.message);
        }
    });
  };

  return {
    login : function(req, res) {
      console.log('POST LOGIN');
      passport.authenticate('local-login', function(err, user) {
        console.log(user);
        _p.forceLogin(req, res, user);
      })(req, res);
    },

    logout : function (req, res) {
      req.logout();
      res.redirect('/');
    },

    signup : function(req, res) {
      console.log('SIGNUP POST');
      var data = req.body;
        
      User.findOne({ 'local.email' :  data.email }, function(err, user) {
        console.log('USER');
        console.log(user);
        if (!user) {
          var newUser = new User(),
              hashToActive = newUser.generateToken();

          newUser.local.email = data.email;
          newUser.local.name = data.name;

          newUser.hashPassword(data.password);
          newUser.manageTickets(3);
          newUser.activate(false);

          newUser.save(function(err) {
            if (err)
              throw err;

            console.log()
            _p.forceLogin(req, res, newUser);
          });
        } else {

          // Já existe uma conta com esse email
          res.send(401);
        }

      }); 
    },

    emailConfirmation : function(req, res) {
      console.log('EMAIL CONFIRM');
      var data = req.body;

      console.log(data);
        
      User.findOne({ 'local.email' :  data.emailToValidate }, function(err, user) {
        if (user) {
          console.log(user);
          if (user.activateHash === data.token) {
            user.activate(true);
            _p.forceLogin(req, res, user);
          } else {
            res.send(401);  
          }
        } else {
          res.send(401);
        }

      }); 
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
    },

    renderEmailConfirmation : function(req, res) {
      var model = {};
      model.page = new page();
      model.page.emailToValidate = decodeURIComponent(req.query.emailToValidate);
      res.render('admin/confirm-email.ejs', model);
    }
  }
};