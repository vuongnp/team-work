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

//io_client = require("socket.io-client");
//var socket = io_client("http://localhost:3000");
//var Roomcontroller = require('../controllers/room.controller');
var socket = io();


socket.on('server-send-user-join-room', function(data){
    console.log(data, ' join room');
    
});

socket.on('server-send-message', function(data){
    console.log(data);
    if(data.room==$('#currentRoom').html()){
        $("#listMessages").append("<div class='ms'>"+data.message.nameUser+": "+data.message.text+"  "+ "</div>");
        $("#listMessages").append("<div class='time' style='font-size: 12px'>"+data.message.time.substring(12,17)+"</div>");
    }
   
});
function makeid(length) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
   
    for (var i = 0; i < length; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
   
    return text;
  }
$(document).ready(function(){
    //alert("AAA");
    $('#newRoom').hide();
    $('#btnLogin').click(function(){
        //alert('Login');
        socket.emit("client-login", $('#email').val());//,$("#txtUsername").val());
    });
    //$('#newRoom').hide();
    $('#btnNew').click(function(){
        //$('#newRoom').attr("hidden", false);
        $('#newRoom').show(500);
    });
    $("input[name='useRandom']").change(function(){
        var code = makeid(8);
        $('#code').val(code);
    });
    $('#btnNewRoom').click(function(){
        $('#newRoom').hide();
        //$('#newRoom').attr("hidden", true);
        socket.emit("create-room",$('#roomName').val());
    });
    $('#btnCloseNewRoom').click(function(){
        //$('#newRoom').attr("hidden", true);
        $('#newRoom').hide();
    });
    $('a').on('click',function(){
        //$('#newRoom').hide();
        //alert($(this).html());
        var object={
            currRoom: $('#currentRoom').html(),
            nextRoom: $(this).html()
        };
        socket.emit("user-join-room",object);
    });
    $('#btnSendMessage').click(function(){
        var messObj={
            text: $('#txtMessage').val(),
            nameUser: $('#nameUser').val(),
            time: new Date(Date.now()).toLocaleString(),
            room: $('#currentRoom').html()
        };
        socket.emit("user-send-message",messObj);
    })
});
