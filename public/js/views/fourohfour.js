define([
  // Libraries
  "jquery",
  "underscore",
  "backbone",

  // Views
  "views/base",

  // Templates
  "text!template/fourohfourTemplate.html"
],

function($, _, Backbone, BaseView, fourohfourTemplate) {

  var FourOhFourView = BaseView.extend({

    fourohfourTemplate: _.template(fourohfourTemplate),

    className: "fourOhFour",

    initialize: function() {
      this.render();
    },

    render: function() {
      $(this.el).html(this.fourohfourTemplate(this.model.toJSON()));
    },

    destroy: function() {
      this.remove();
    }

  })

  return FourOhFourView;
});
