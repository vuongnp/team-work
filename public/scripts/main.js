/*var socket = io("http://localhost:3000");

socket.on("server-send-dki-thatbai", function(){
    alert("Username da ton tai!!!");
});

socket.on("server-send-dki-thanhcong", function(data){
    $("#currentUser").html(data);
    $("#loginForm").hide(2000);
    $("#chatForm").show(1000);
});

socket.on("server-send-danhsach-Users", function(data){
    $("#boxContent").html("");
    data.forEach(function(i){
        $("#boxContent").append("<div class='user'>"+i+"</div>");
    })
});

socket.on("server-send-message", function(data){
    $("#listMessages").append("<div class='ms'>"+data.un+": "+data.nd+"</div>");
});

socket.on("ai-do-dang-go-chu", function(data){
    $("#thongbao").html(data+ "<img width='20px' src='https://cdn.dribbble.com/users/8424/screenshots/1036999/dots_2.gif'>");
});
socket.on("ai-do-stop-go-chu", function(){
    $("#thongbao").html("");
});

socket.on("server-send-rooms",function(data){
    $("#dsRoom").html("");
    data.map(function(r){
        $("#dsRoom").append("<h4 class='room'>"+r+"</h4");
    });
});

socket.on("server-send-room-socket",function(data){
    $("#roomHienTai").html(data);
})
$(document).ready(function(){
    $("#btnRegister").click(function(){
        socket.emit("client-send-Username",$("#txtUsername").val());
    });

    $("#btnLogout").click(function(){
        socket.emit("logout");
        $("#loginForm").show(2000);
        $("#chatForm").hide(1000);
    });
    $("#btnSendMessage").click(function(){
        socket.emit("user-send-message", $("#txtMessage").val());
        
    });

    $("#txtMessage").focusin(function(){
        socket.emit("toi-dang-go-chu");
    });
    $("#txtMessage").focusout(function(){
        socket.emit("toi-stop-go-chu");
    });

    $('#btnTaoRoom').click(function(){
        socket.emit("tao-room",$('#txtRoom').val());
    });
});*/
var socket = io("http://localhost:3000");


function addMessages(message) {
    $("#listMessages").append(`
      <h4> ${message.name} </h4>
      <p>  ${message.message} </p>`);
  }


  function sendMessage(message) {
    $.post('/messages', message);
  }

$(document).ready(function(){
    $('#btnLogin').click(function(){
        alert('Login');
        socket.emit("client-login");//,$("#txtUsername").val());
    });
});
