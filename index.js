require('dotenv').config();

const app=require('./app');
var server=require("http").Server(app);
var io = require("socket.io")(server);

//var   bodyParser = require('body-parser');
//var   cookieParser = require('cookie-parser');
var   mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL);

mongoose.connection.once("open", () => {
    console.log("MongoDB Connected!");
  });


io.on('connection', (socket) =>{ 
    console.log("co nguoi ket noi"+ socket.id);
    socket.on("client-login", function(){
        console.log("Login thanh cong");
        //console.log(res.locals.user.name);
    });
});

const port = 3000;

// Route chat



server.listen(port,function(){
    console.log('Server listening on port: '+port);
});