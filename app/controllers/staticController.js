module.exports = function(page){

  return {
    home : function(req, res) {
      var model = {};
      model.page = new page();

      if (req.user) {
        model.page.fillUser(req.user);
      }

      res.render('index.ejs', model);
    }
  }
};