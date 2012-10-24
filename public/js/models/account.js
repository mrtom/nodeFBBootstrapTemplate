define([
  // Libraries.
  "jquery",
  "underscore",
  "backbone",

  // Models
  "models/user"
],

function($, _, Backbone, User) {

  // Account Model
  // ----------

  var Account = Backbone.Model.extend({

    initialize: function() {
      if (!this.get('verb'))   this.set('verb',"");
      if (!this.get('method')) this.set('method',"");
    }
  });

  return Account;

});