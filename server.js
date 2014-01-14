var http = require('http');
var fs = require('fs');
var path = require('path');
var mime = require('mime');
var nodeStatic = require('node-static')
var route = require('./router').route
var chatServer = require('./lib/chat_server');

var staticServer = new nodeStatic.Server("./public")

function onReq(req, res){
  console.log(req.url);
  staticServer.serve(req, res, function(e){
    if (e) {
      staticServer.serveFile('/error.html', 404, {}, req, res);
    }else{
      staticServer.serveFile(req.url, 200, {}, req, res);
    }
  });
}

var port = 9050;
var server = http.createServer(onReq);
chatServer.createChat(server);
server.listen(port);
console.log('Server running ' + port);