define([
  // Libraries
  "jquery",
  "underscore",
  "backbone",

  "text!template/adminTemplate.html"
],

function($, _, Backbone, adminTemplate) {

  // Admin View
  // -----------

  var AdminView = Backbone.View.extend({

    adminTemplate: _.template(adminTemplate),

    initialize: function() {
      this.render();
    },

    render: function() {
      $(this.el).html(this.adminTemplate(this.model.toJSON()));
    },

    destroy: function() {
      this.remove();
    }

  });

  return AdminView;

})
