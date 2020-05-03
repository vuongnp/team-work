var Room = require('../models/room.model');
var User = require('../models/user.model');
var ObjectId = require('mongodb').ObjectId;

module.exports.getRoom=function(req,res){
    Room.findByIdAndUpdate(req.params.id,{$push:{userIds : res.locals.user.id}},{new:true},function(err,result){
        console.log(result);
    });

    var arrRoom=[];
    User.findById(res.locals.user.id).
    populate('roomIds').
    exec(function(err,user){
        if (err) console.log(err);
        console.log(user);
        arrRoom= user.roomIds;
    });

    Room.findById(req.params.id).
    populate('messIds').
    exec(function(err,room){
        if (err) console.log(err);
        res.render('rooms/index',{
            room: room,
            //users: room.userIds,
            messages: room.messIds,
            arrRoom: arrRoom
        });
    });
};

module.exports.createRoom=function(req,res){
    var id = new ObjectId();
    var idUser=res.locals.user.id;

    User.findByIdAndUpdate(idUser,{$push:{roomIds : id}},{new:true},function(err,result){
        if (err) console.log(err);
        console.log('OK');
    });
    var newroom = new Room({
        _id: id,
        name: req.body.name,
        code: req.body.code
    });
    newroom.save(function(err, res) {
        if (err) throw err;
        console.log(res.name + " saved to rooms collection.");       
    });

    
    res.redirect('/rooms/'+id);
    //res.json(newroom);
};