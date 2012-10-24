define([
  // Libraries
  "jquery",
  "underscore",
  "backbone",
  "bootstrap",

  // Models
  "models/nav",

  // Views
  "views/base",
  "views/main",
  "views/nav",

  // Templates
  "text!template/chromeTemplate.html"
],

function($, _, Backbone, Bootstrap, Nav, BaseView, mainView, navView, chromeTemplate) {
  var ChromeView = BaseView.extend({

    chromeTemplate: _.template(chromeTemplate),

    initialize: function() {
      // Load appwide defaults
      // Turn on bootstrap data-api
      $('body').on('.data-api');
      
      this.render();
      $('#bootstrap').append(this.$el);
    },

    render: function() {
      $(this.el).html(this.chromeTemplate());

      this.navView = new navView({ 
        el: this.$("#nav"),
        model: new Nav({ user: this.options.user }),
        router: this.options.router
      });
      this.mainView = new this.options.mainViewType({ 
        el: this.$("#main"),
        model: this.options.mainModel,
        router: this.options.router
      });
    },

    destroy: function() {
      this.navView.destroy();
      this.mainView.destroy();
    }
  });

  return ChromeView;
});
