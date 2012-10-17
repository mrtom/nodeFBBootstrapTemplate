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

    events: {
      "click #reset" : "reset"
    },

    initialize: function() {
      this.$el.addClass('admin').append(this.adminTemplate());
      $('#booth').append(this.$el);

    },

    reset: function() {
      localStorage.clear();
    },

    destroy: function() {
      this.remove();
    }

  });

  return AdminView;

})
