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
  app.use(express.static(__dirname + '/public'));
  app.use('/admin',   express.static(__dirname + '/public'));
});

// sigh no ipv6
var server = app.listen(8000, '127.0.0.1', null, function() {
  console.log("Started server on port http://%s:%d", server.address().address, server.address().port);
});
