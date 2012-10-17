define([
  // Libraries
  "jquery",
  "underscore",
  "backbone",
  "bootstrap",
  
  // Templates
  "text!template/mainTemplate.html"
],

function($, _, Backbone, Bootstrap, mainTemplate) {

  var MainView = Backbone.View.extend({
    mainTemplate: _.template(mainTemplate),

    initialize: function() {
      require( ['FB!'], _.bind(function() {
          var view = this;

          FB.getLoginStatus(function(response) {
            if (response.status === 'connected') {
              // We handle this in the event subscription
            } else {
              console.debug('Must login!');
              window.FB.XFBML.parse($('#loginModal')[0]);
              $("#loginModal").modal();
            }
          });

          FB.Event.subscribe('auth.authResponseChange', _.bind(function(response) {
            $('#loginModal').modal('hide');

            var uid = response.authResponse.userID;
            console.debug('woop! Welcome user #'+uid);

            FB.api('me?fields=id,name,picture.type(square)', _.bind(function(r) {
              this.model.set({
                'name': r.name,
                'pic': r.picture.data.url,
                'loaded': true
              });
            }, this));
          }, this));

        }, this));
        this.render();
    },

    render: function() {
      $(this.el).html(this.mainTemplate());
    },

    destroy: function() {
      this.remove();
    }
  });

  return MainView;
});
