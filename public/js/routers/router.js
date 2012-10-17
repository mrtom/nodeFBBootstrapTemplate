define([
  // Libraries.
  "jquery",
  "underscore",
  "backbone",

  // Models
  "models/admin",
  "models/fourohfour",

  // Views
  "views/admin",
  "views/fourohfour",
  "views/chrome"
], 

function($, _, Backbone, Admin, FourOhFour, AdminView, FourOhFourView, ChromeView) {
  // App Router
  // ---------- 
                
  var Workspace = Backbone.Router.extend({

    routes: {
      ""            : "showMain",
      "admin"       : "showAdmin",
      "*other"      : "showFourOhfour"
    },

    initialize: function() {
    },

    showMain: function() {
      this.destroyPrimary(this.admin, this.adminView);
      this.destroyPrimary(this.fourohfour, this.fourohfourView);

      this.chromeView = new ChromeView({
        el: $('#bootstrap'),
        router: this
      });
    },

    showAdmin: function() {
      this.destroyPrimary(this.main, this.mainView);
      this.destroyPrimary(this.fourohfour, this.fourohfourView);

      this.admin = new Admin();
      this.adminView = new AdminView({model: this.admin});
    },

    showFourOhfour: function(route) {
      this.destroyPrimary(this.main, this.mainView);
      this.destroyPrimary(this.admin, this.adminView);

      this.fourohfour = new FourOhFour({
        route: route
      });
      this.fourohfourView = new FourOhFourView({model: this.fourohfour});
    },

    destroyPrimary: function(/* Backbone.Model */ model, /* Backbone.View */ view) {
      if (view) {
        view.destroy();
        view = null;
      }
      if (model) {
        model.clear({slient: true});
        model = null;
      }
    }

  });
                      
  return Workspace;
});
