/*
 * Copyright Tom Elliott
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var express = require('express'),
    uuid = require('node-uuid'),
    config = require('./config');

var app = express.createServer();

app.configure(function() {
  app.use(express.bodyParser());
  app.use(express.cookieParser());

  // Load the app in JS, letting Backbone handle the routing
  app.use(express.static(__dirname + '/public'));

  // Handle api requests in the server
  app.all('/api/:method', function(req, res) {
    return handleAPICall(req, res, req.method, req.params.method);
  });

  app.use(function(req, res, next){
    // Let backbone handle 404s
    res.header('Content-Type', 'text/html');
    res.sendfile('public/index.html');
  });
});

function handleAPICall(req, res, verb, method) {
  res.header('Content-Type', 'text/json');
  res.send(JSON.stringify({
    'verb'   : verb,
    'method' : method
  }));
}

// Do some shuffling for heroku vs loading from config.js
var port, host;
// Use Heroku style environment variables if available
if(process.env.PORT) {
  port = process.env.PORT;
  host = process.env.HOST || "0.0.0.0";
} else {
  port = config.app.port;
  host = config.app.host;
}

// sigh no ipv6
var server = app.listen(port, host, null, function() {
  console.log("Started server on port http://%s:%d", server.address().address, server.address().port);
});
