var pageModel = function() {

  var page = {
    title: null,
    description: null,
    user: {
      active: false,
      email: null,
      name: null,
      facebook: null
    },
    scripts: []
  };
    
  page.fillUser = function(data) {
    this.user.active = true;
    this.user.email = data.local.email;
    this.user.name = data.local.name;
    this.user.facebook = data.facebook.id ? true : false;
  };

  return page;
};

// create the model for users and expose it to our app
module.exports = pageModel;
