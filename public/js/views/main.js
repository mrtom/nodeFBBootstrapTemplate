define([
  // Libraries
  "jquery",
  "underscore",
  "backbone",
  "bootstrap",

  // Views,
  "views/base",
  
  // Templates
  "text!template/mainTemplate.html"
],

function($, _, Backbone, Bootstrap, BaseView, mainTemplate) {

  var MainView = BaseView.extend({
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
            switch(response.status) {
              case 'unknown':
                // Fall through
              case 'not_authorized':
                break;
              case 'connected': 
                $('#loginModal').modal('hide');

                this.model.set('signedRequest', response.authResponse.signedRequest);
                
                break;
                default:
                  console.log("Unexpected response from Facebook auth: `" + response.status + "` not recognised!")
            }
          }, this));
        }, this));

        this.render();
    },

    render: function() {
      $(this.el).html(this.mainTemplate());
    }
  });

  return MainView;
});
