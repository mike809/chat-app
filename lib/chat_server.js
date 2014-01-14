function createChat (server) {
  var io = require('socket.io').listen(server);

  io.sockets.on('connection', function (socket) {
    socket.emit('welcome', { text: 'welcome to chat' });
    socket.on('broadcast', function (message) {
      io.sockets.emit('broadcast', { text: message });
    });
  });
}

exports.createChat = createChat