// app/routes.js
module.exports = function(page) {

  return {
    profile : function(req, res) {
      var model = {};
      model.page = new page();

      model.page.fillUser(req.user);
      model.user = req.user;

      res.render('admin/profile.ejs', model);
    }  
  }
};