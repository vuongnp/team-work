var ObjectId = require('mongodb').ObjectId; 
var User = require('../models/user.model');
var Mess = require('../models/message.model');
var Room = require('../models/room.model');
var md5 = require('md5');


module.exports.index=async function(req,res){
    //res.render('users/index',{
    //    users: db.get('users').value()
    //});//users/index.pug
    //var users= await User.find();
    //res.render('users/index',{
    //    users: users
    //});
    User.findById(res.locals.user.id).
    populate('roomIds').
    exec(function(err,user){
        if (err) console.log(err);
        console.log(user);
        res.render('users/index',{
            rooms: user.roomIds
        });
    });
    /*var messs= await Mess.find();  
    res.render('users/index',{
        messages: messs
    });*/
    /*Mess.
    find({}).
    populate('userIds').
    populate('roomIds').
    exec(function (err, messs) {
        var room="";
        if (err) console.log(err);
        if(messs){
            room=messs[0].roomIds[0].name;
        }
        console.log(messs);
        res.render('users/index',{
            messages: messs,
            room: room
        });
    });*/
};

module.exports.search=function(req,res){
    var q=req.query.q;
    //var matchedUsers=db.get('users').value().filter(function(user){
    //    return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    ///});
    //var  matchedUsers= User.find( { name: { $regex: /q/i } } );
    User.find(
        { "name": { "$regex": q, "$options": "i" } }, 
        function(err,matchedUsers) { 
            if(err){
                console.log(err);
            }
            res.render('users/index',{
                users: matchedUsers
            });
        }
    );
    
};

//module.exports.create=function(req,res){
//    res.render('users/create');//users/create.pug
//};

module.exports.getid=function(req,res){
    User.findById(req.params.id , 
        function(err,matchedUser) { 
            if(err){
                console.log(err);
            }
            res.render('users/profile',{
                user: matchedUser
            });
        }
    );
};

//module.exports.postCreate=function(req,res){
//    //req.body.id=shortid.generate();
//    var newuser = new User(req.body);
//    newuser.password=md5(req.body.password);
//    newuser.save(function(err, res) {
//        if (err) throw err;
//        console.log(res.name + " saved to users collection.");
//    //res.redirect('/users');
//    });
//    //db.get('users').push(req.body).write();
//    res.redirect('/users');
//};
module.exports.edit=function(req,res){
    /*User.findById(req.params.id , 
        function(err,matchedUser) { 
            if (err) throw err;

            matchedUser.email= req.body.email;
            matchedUser.phone= req.body.phone;
            matchedUser.name = req.body.name;
            matchedUser.save(function(err, res) {
                if (err) throw err;
                console.log(res.name + " edited to users collection.");
            //res.redirect('/users');
            });
            res.redirect('/users/profile',{
                user: matchedUser
            });
        }
    );*/
    User.findByIdAndUpdate(req.params.id ,req.body,{new:true},function(err,result){
        if (err) console.log(err);
        res.redirect('back')//,{
                //user: result
            //});
        //res.json(result);
    })
};