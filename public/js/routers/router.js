define([
  // Libraries.
  "jquery",
  "underscore",
  "backbone",

  // Models
  "models/account",
  "models/admin",
  "models/fourohfour",
  "models/user",

  // Views
  "views/account",
  "views/admin",
  "views/chrome",
  "views/fourohfour",
  "views/main"
], 

function($, _, Backbone, Account, Admin, FourOhFour, User, AccountView, AdminView, ChromeView, FourOhFourView, MainView) {
  // App Router
  // ---------- 
                
  var Workspace = Backbone.Router.extend({

    routes: {
      ""            : "showChrome",
      "admin"       : "showAdmin",
      "account"     : "showAccount",
      "*other"      : "showFourOhFour"
    },

    initialize: function() {
      this.user = new User;
    },

    showChrome: function(mainModel, mainViewType) {
      console.debug('Showing Chrome');
      this.destroyPrimary(this.chrome, this.chromeView);

      if (!mainViewType) {
        console.debug("No view specified. Showing mainView");
        mainViewType = MainView;
        mainModel = this.user;
      }

      this.chromeView = new ChromeView({
        router: this,
        mainModel: mainModel,
        mainViewType: mainViewType,
        user: this.user
      });
    },

    // show the account/profile page
    showAccount: function() {
      console.debug('Showing account')
      return this.showChrome(new Account({
        user: this.user
      }), AccountView);
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
      this.destroyPrimary(this.chrome, this.chromeView);

      this.showChrome(
        new FourOhFour({
          route: route
        }),
        FourOhFourView
      );
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
