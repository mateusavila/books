// app/routes.js
module.exports = function(app, passport, smtp) {

  var page = require('../app/models/page'),
      utils = require('../app/utils'),
      _auth = require('../app/controllers/authController.js')(passport, smtp, page);
      _admin =  require('../app/controllers/adminController.js')(page);
      _static = require('../app/controllers/staticController.js')(page);

  
  // Rotas de autenticação API
  app.post('/api/login', utils.canAccessLoginOrSignup, _auth.login);
  app.post('/api/signup', utils.canAccessLoginOrSignup, _auth.signup);
  app.post('/api/validate-email', utils.canAccessLoginOrSignup, _auth.emailConfirmation);
  app.get('/logout', utils.checkAuth, _auth.logout);
  
  app.get('/api/auth/facebook', utils.canAccessLoginOrSignup, _auth.facebook);
  app.get('/api/auth/facebook/callback', utils.canAccessLoginOrSignup, _auth.facebookCallback);

  // Rotas de autenticação RENDER
  app.get('/login', utils.canAccessLoginOrSignup, _auth.renderLogin);
  app.get('/signup', utils.canAccessLoginOrSignup, _auth.renderSignup);
  app.get('/confirm-email', utils.canAccessLoginOrSignup, _auth.renderEmailConfirmation);

  // Rotas de ADMIN
  app.get('/admin/profile', utils.checkAuth, _admin.profile);

  // Rotas estáticas
  app.get('/', _static.home);
};
