define([
  // Libraries.
  "jquery",
  "underscore",
  "backbone"
],

function($, _, Backbone) {

  // User Model
  // ----------

  var User = Backbone.Model.extend({

    // Default attributes for the User
    defaults: {
      notLoggedIn: 'Login to continue...',
      loaded: false,
      pic: ""
    },

    initialize: function() {
      if (!this.get("name")) this.set("name", this.defaults.notLoggedIn);
      if (!this.get("loaded")) this.set("loaded", this.defaults.loaded);
    }
  });

  return User;

});
