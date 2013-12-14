// app/routes.js
module.exports = function(page) {

  return {
    profile : function(req, res) {
      var model = {};
      model.page = new Page();

      model.page.title = "Doe um Livro";
      model.page.description = "Doe um Livro";

      if (req.user) {
        model.page.fillUser(req.user);
      }

      model.user = req.user;

      res.render('admin/profile.ejs', model);
    }  
  }
};