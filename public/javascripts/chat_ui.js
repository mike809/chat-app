(function(root) {
  var ChatApp = root.ChatApp = (root.ChatApp || {});

  var ChatUI = ChatApp.ChatUI = function(){
    this.chat = new ChatApp.Chat(io.connect());
    this.chat.socket.on('broadcast', this.getMessage.bind(this));
    $('form#message-form').on('submit', this.checkMessage.bind(this));
  };

  ChatUI.prototype.sendMessage = function(message){
    this.chat.sendMessage(message);
  };

  ChatUI.prototype.checkMessage = function(event){
    event.preventDefault();
    var message = $("#message").val();
    var messageArr = message.split(" ");
    $("#message").val("");

    if(messageArr[0] === "/nick"){
      this.changeNickname(messageArr[1]);
    } else {
      this.sendMessage(message);
    }
  };

  ChatUI.prototype.changeNickname = function(name){
    this.chat.socket.emit('nicknameChangeRequest', name);
  };

  ChatUI.prototype.getMessage = function(message){
    var message = this.chat.nickname + ": " + message.text;
    $('<div/>').text(message).appendTo($('#display'));
  };

})(this);

$(document).ready(function(){
  var chatUI = new ChatApp.ChatUI;
});