(function(root) {
  var ChatApp = root.ChatApp = (root.ChatApp || {});

  var Chat = ChatApp.Chat = function(socket){
    this.socket = socket;
    this.socket.on('nicknameChangeResult', this.setNickname.bind(this));
  };

  Chat.prototype.setNickname = function(message) {
    if(message.success === true) {
      this.nickname = message.nickname;
    }
  }

  Chat.prototype.sendMessage = function (message) {
    this.socket.emit('broadcast',  message );
  };

})(this);