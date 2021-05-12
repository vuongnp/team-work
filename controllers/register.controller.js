var User = require('../models/user.model');
var ObjectId = require('mongodb').ObjectId; 
var md5 = require('md5');


module.exports.create=function(req,res){
    res.render('./create');//users/create.pug
};

module.exports.postCreate=function(req,res){
    //req.body.id=shortid.generate();
    var newuser = new User(req.body);
    User.findOne({email: req.body.email},function(err,user){
        if(user){
            res.render('create',{
                errors: [
                    'Email already used!'
                ],
                values: req.body
            });
            return;
        }
        else{
            newuser.password=md5(req.body.password);
    
            newuser.save(function(err, res) {
                if (err) throw err;
                console.log(res.name + " saved to users collection.");
            //res.redirect('/users');
            });
            //db.get('users').push(req.body).write();
            res.redirect('/users');
        }
    });
    
};