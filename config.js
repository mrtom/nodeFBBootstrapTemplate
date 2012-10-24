var config = {}

var apps = {
  'prod': {
    app_id: '',
    secret: '',
    port: '',
    host: ''
  },
  'dev': {
    app_id: '115255135298817',
    secret: 'fc33ce76b7a5448b0cc52789e12d29d2',
    port: '8081',
    host: 'localhost'
  }
}

config.app = apps['dev'];

module.exports = config;
