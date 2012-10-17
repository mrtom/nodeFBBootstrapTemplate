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
  "views/chrome",
  "views/fourohfour"
], 

function($, _, Backbone, Admin, FourOhFour, AdminView, ChromeView, FourOhFourView) {
  // App Router
  // ---------- 
                
  var Workspace = Backbone.Router.extend({

    routes: {
      ""            : "showChrome",
      "admin"       : "showAdmin",
      "*other"      : "showFourOhFour"
    },

    showChrome: function() {
      console.log('Showing Chrome');
      this.destroyPrimary(this.admin, this.adminView);
      this.destroyPrimary(this.fourohfour, this.fourohfourView);

      this.chromeView = new ChromeView({
        el: $('#bootstrap'),
        router: this
      });
    },

    showAdmin: function() {
      console.debug('Showing Admin');
      this.destroyPrimary(this.main, this.mainView);
      this.destroyPrimary(this.fourohfour, this.fourohfourView);

      this.admin = new Admin();
      this.adminView = new AdminView({
        el: $('#bootstrap'),
        router: this,
        model: this.admin
      });
    },

    showFourOhFour: function(route) {
      console.debug('Showing 404');
      this.destroyPrimary(this.main, this.mainView);
      this.destroyPrimary(this.admin, this.adminView);

      this.fourohfour = new FourOhFour({
        route: route
      });
      this.fourohfourView = new FourOhFourView({
        el: $('#bootstrap'),
        router: this,
        model: this.fourohfour
      });
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
