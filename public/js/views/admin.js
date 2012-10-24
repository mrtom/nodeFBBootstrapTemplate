define([
  // Libraries
  "jquery",
  "underscore",
  "backbone",

  // Views
  "views/base",

  "text!template/adminTemplate.html"
],

function($, _, Backbone, BaseView, adminTemplate) {

  // Admin View
  // -----------

  var AdminView = BaseView.extend({

    adminTemplate: _.template(adminTemplate),

    initialize: function() {
      this.render();
    },

    render: function() {
      $(this.el).html(this.adminTemplate(this.model.toJSON()));
    }
  });

  return AdminView;

})
