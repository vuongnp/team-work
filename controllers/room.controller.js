var Room = require('../models/room.model');
var User = require('../models/user.model');
var ObjectId = require('mongodb').ObjectId;

module.exports.getRoom=function(req,res){
    //var users = [];   
    User.findById(req.session.user.id)
    .exec(function(err,user){
        if (err) console.log(err);
        Room.findById(req.params.id)
        .exec(function(err,room){
            if (err) console.log(err);
            res.render('rooms/index',{
                room: room,
                messages: room.messages,
                members: room.members,
                listRoom: user.listRoom,
                user: user
        });
        //res.locals.room = room;
        //next();
    });
    });
    
    //console.log('User: ',user);
};

module.exports.createRoom=async function(req,res){
    //var id = new ObjectId(); 
    // tao room moi
    var newroom =await new Room({
        name: req.body.name,
        code: req.body.code
    });
    var idUser=req.session.user.id;
    var newMem ={idMem: idUser, username: req.session.user.name};
    newroom.save(function(err, res) {
        if (err) throw err;
        console.log(res.name + " saved to rooms collection.");            
        //console.log('New Mem',newMem);
        var roomObj ={idroom: newroom.id, name: newroom.name};
        // them room vao user
        User.findByIdAndUpdate(idUser,{$push:{listRoom : roomObj}},{new:true},function(err,result){
            if (err) console.log('room',err);
            //console.log('update listRoom OK', result);
        });
        Room.findByIdAndUpdate(newroom.id,{$push:{members : newMem}},{new:true},function(err,result){
            if (err) console.log('user',err);
            //console.log("update members OK",result);
        });  
    });
    
    res.redirect('/rooms/'+newroom.id);
    //res.json(newroom);
};

module.exports.joinRoom= async function(req,res){
    var idUser=await req.session.user.id;
    var newMem =await {idMem: idUser, username: req.session.user.name};
    //console.log('New Mem',newMem);
    //var roomObj =await {idroom: room.id, name: newroom.name};
    await Room.findOneAndUpdate({code: req.body.code}, {$push:{members: newMem}},{new:true}, function(err, room){
        if (err) console.log('Room not exist');
        console.log("update members OK",room);
        // them room vao user
        var roomObj = {idroom: room.id, name: room.name};
        User.findByIdAndUpdate(idUser,{$push:{listRoom : roomObj}},{new:true},function(err,result){
            if (err) console.log('room',err);
            console.log('update listRoom OK', result);
        });
        res.redirect('/rooms/'+room.id);
    });
    
}

module.exports.sendMessage= async function(req,res){
    //var idUser=await res.locals.user.id;
    var idRoom=req.body.roomid;
    var message={
        text: req.body.message,
        nameUser: req.body.nameUser,
        time: Date.now()
    }
    // await Room.findByIdAndUpdate(idRoom, {$push:{messages: message}},{new:true}, function(err, room){
    //     if (err) console.log('Room not exist');
    //     console.log("update messages OK",room);
    //    //res.redirect('/rooms/'+room.id);
    //     res.redirect('back');
    // }) 
    try{
        await Room.findByIdAndUpdate(idRoom, {$push:{messages: message}},{new:true})
    
        console.log("update messages OK");
       //res.redirect('/rooms/'+room.id);
        res.redirect('back');
    }
    catch{
        console.log("error!!!");
    }
    
    
}