var socket = io('localhost:3000/');


function addMessages(message) {
    $("#listMessages").append(`
      <h4> ${message.name} </h4>
      <p>  ${message.message} </p>`);
  }


  function sendMessage(message) {
    $.post('/messages', message);
  }

$(document).ready(function(){
    $('#btnSendMessage').click(function(){
        socket.emit("user-send-message", $("#txtMessage").val());
    });
});