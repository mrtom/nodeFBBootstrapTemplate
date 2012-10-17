define([
  // Libraries
  "jquery",
  "underscore",
  "backbone",
  "text!template/fourohfourTemplate.html"
],

function($, _, Backbone, fourohfourTemplate) {

  var FourOhFourView = Backbone.View.extend({

    fourohfourTemplate: _.template(fourohfourTemplate),

    className: "fourOhFour row",

    initialize: function() {
      console.log(this.$el);
      this.$el.append(this.fourohfourTemplate(this.model.toJSON()));
      $('#booth').append(this.$el);
    },

    destroy: function() {
      this.remove();
    }

  })

  return FourOhFourView;
});
