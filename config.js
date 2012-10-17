var config = {}

var apps = {
  'prod': {
    app_id: '',
    secret: ''
  },
  'dev': {
    app_id: '115255135298817',
    secret: 'fc33ce76b7a5448b0cc52789e12d29d2'
  }
}

config.app = apps['dev'];
config.FACEBOOK_HOST = 'graph.facebook.com';
config.DEV_MODE = true;
config.ON_A_PLANE = true;

module.exports = config;
