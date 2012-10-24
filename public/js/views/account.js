define([
  // Libraries
  "jquery",
  "underscore",
  "backbone",

  // Models
  "models/user",

  // Views
  "views/base",
  "views/nav",

  // Templates
  "text!template/accountTemplate.html"
],

function($, _, Backbone, User, BaseView, navView, accountTemplate) {

  var AccountView = BaseView.extend({

    accountTemplate: _.template(accountTemplate),

    className: "account",
   
    events: {
      "click .btn-logout" : "logout",
      "click .btn-unlink" : "unlink"
    },

    initialize: function() {
      this.model.on('change', this.render, this);
      this.model.get('user').on('change', this.render, this);
      this.render();

      // Demonstrate an API call
      $.ajax({
        url: "/api/demoAPI",
        context: this,
        type: "POST",
        data: "foo=blah"
      }).done(function(r) {
        if (r.method && r.verb) {
          this.model.set({
            'verb'  : r.verb,
            'method': r.method
          });
        } else {
          // Show error to user
          console.error('Did not understand response from API:', r);
        }
      });
    },

    render: function() {
      var disabled = this.model.get('user').get('loaded') ? "" : "disabled";
      this.model.set('disabled', disabled);

      $(this.el).html(this.accountTemplate(this.model.toJSON()));
    },

    logout: function() {
      require( ['FB!'], _.bind(function() {
        FB.logout();
        this.options.router.navigate('', { trigger:true });
      }, this));
    },

    unlink: function() {
      require( ['FB!'], _.bind(function() {
        FB.api('me/permissions', 'delete', _.bind(function(response) {
          if (!response || response.error) {
            alert('Error unlinking application');
          } else {
            this.options.router.navigate('', { trigger:true });
          }
        }, this));
      }, this));
    }

  })

  return AccountView;
});