(function(root) {
  var ChatApp = root.ChatApp = (root.ChatApp || {});

  var ChatUI = ChatApp.ChatUI = function(){
    this.chat = new ChatApp.Chat(io.connect());
    this.chat.socket.on('broadcast', this.getMessage.bind(this));
  };

  ChatUI.prototype.sendMessage = function(event){
    event.preventDefault();
    var message = $("#message").val();
    $("#message").val("");
    this.chat.sendMessage(message);
  };

  ChatUI.prototype.getMessage = function(message){
    $('<div/>').text(message.text.text).appendTo($('#display'));
  };

})(this);

$(document).ready(function(){
  var chatUI = new ChatApp.ChatUI;
  $('form#message-form').on('submit', chatUI.sendMessage.bind(chatUI));
});