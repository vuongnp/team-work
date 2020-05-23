require('dotenv').config();

const app=require('./app');
var server=require("http").Server(app);
var io = require("socket.io")(server);

//var   bodyParser = require('body-parser');
//var   cookieParser = require('cookie-parser');
var   mongoose = require('mongoose');

var controller = require('./controllers/room.controller');
var Room = require('./models/room.model');
var User = require('./models/user.model');

mongoose.connect(process.env.MONGO_URL);

mongoose.connection.once("open", () => {
    console.log("MongoDB Connected!");
  });


io.on('connection', (socket) =>{ 
    //console.log(socket.adapter.rooms);
    //console.log("co nguoi ket noi"+ socket.id);
    socket.on("client-login", function(data){
        socket.email = data;
        console.log(data, " Login thanh cong");
        //console.log(res.locals.user.name);
    });
    socket.on("create-room",function(data){
        socket.join([data.toString()]);
        socket.Room=data
        console.log("Room vua them", data);
    });
    socket.on("user-join-room", function(data){
        socket.leave(data.currRoom);
        socket.join([data.nextRoom.toString()]);
        socket.Room=data.nextRoom.toString();
        //console.log(socket.email + " vua roi room " + data.currRoom);
        //console.log(socket.email + " vua tham gia room " + socket.Room);
        console.log(socket.adapter.rooms);
        io.to(socket.Room).emit("server-send-user-join-room",socket.Room);
        /*User.find({"listRoom.name": room},function(err,users){
            if(err) console.log("error");
            //console.log("list user ",users);
            users.forEach(user =>{
                //console.log("name ",user);
                socket.emit("server-send-user-join-room", user.name);
            });        
        });*/
        
    });
    //console.log("Room",socket.Room);
    socket.on("user-send-message", function(messObj){
        //socket.join(messObj.room);
        //socket.Room=messObj.room;
        var message={
            text: messObj.text,
            nameUser: messObj.nameUser,           
            time: messObj.time
        };
        //console.log(message);
        //console.log(messObj.room);
        Room.findOneAndUpdate({name: messObj.room}, {$push:{messages: message}},{new:true},function(err,res){
            if(err) console.log(err);
            console.log(res);
        });
        //io.in(socket.Room).emit('server-send-message', message);
        //io.sockets.in(socket.Room).emit("server-send-message",message);
        /*User.find({"listRoom.name": messObj.room},function(err,users){
            if(err) console.log("error");
            //console.log("list user ",users);
            users.forEach(user =>{
                //console.log("name ",user);
                socket.emit("server-send-message", message);
            });        
        });*/
        //var room = messObj.room.toString();
        //socket.to(room).emit("server-send-message",message);
        io.sockets.emit("server-send-message",{message: message, room: messObj.room});
    });    
    
});

const port = 3000;

// Route chat



server.listen(port,function(){
    console.log('Server listening on port: '+port);
});