var User = require('../models/user');

// app/routes.js
module.exports = function(page) {

  return {
    changePswd : function(req, res) {
      var data = req.body;

      if (!req.user) {
        confirmChangePswdToken(data.token, data.newPswd);
      } else {
        User.findById(req.user._id, function(err, user) {
          user.hashPassword(data.newPswd);
          user.save(function(err){
            var url = req.session.redirUrl ? req.session.redirUrl : '/admin/profile';
            res.send(200, { redirUrl: url });
          });
        });
      }
    },

    renderProfile : function(req, res) {
      var model = {};
      model.page = new page();

      model.page.fillUser(req.user);
      model.user = req.user;

      res.render('admin/profile.ejs', model);
    },

    renderChangePswd : function(req, res) {
      var model = {};
      model.page = new page();

      model.page.fillUser(req.user);
      model.page.requestToken = req.user ? false : true;

      res.render('admin/change-pswd.ejs', model);
    } 
  }
};