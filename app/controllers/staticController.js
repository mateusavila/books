module.exports = function(page){

  return {
    home : function(req, res) {
      var model = {};
      model.page = new page();

      model.page.title = "Minha conta - Doe um Livro";
      model.page.description = "Minha conta - Doe um Livro";

      if (req.user) {
        model.page.fillUser(req.user);
      }

      res.render('index.ejs', model);
    }
  }
};