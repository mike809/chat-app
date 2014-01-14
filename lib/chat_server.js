function createChat (server) {
  var io = require('socket.io').listen(server);
  var guestNumber = 0;
  var usedNames = {}, nickNames = {};

  io.sockets.on('connection', function (socket) {
    guestNumber++;
    usedNames[guestNumber] = "guest" + guestNumber;

    socket.emit('nicknameChangeResult', {
      success: true,
      nickname: usedNames[guestNumber]
    });

    socket.on('broadcast', function (message) {
      io.sockets.emit('broadcast', { text: message });
    });
  });

  io.sockets.on('nicknameChangeRequest', function (socket, message) {
    if(nickNames[message] === undefined && !guestName(message)){
        usedNames[guestNumber] = message;
        nickNames[message] = "";
        socket.emit('nicknameChangeResult', {
          success: true,
          nickname: usedNames[guestNumber]
        });
    }else{
      socket.emit('nicknameChangeResult', {
        success: false,
        message: 'Names cannot begin with "Guest".'
      });
    }
  });

  var guestName = function(message){
    var regexp = /guest.*/;
    return regexp.test(message);
  }
}

exports.createChat = createChat