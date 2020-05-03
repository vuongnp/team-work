var User = require('../models/user.model');

module.exports.requireAuth=function(req,res,next){
    //console.log(req.cookies,req.signedCookies);
    if(!req.signedCookies.userId){
        res.redirect('/auth/login');
        return;
    }
   
    User.findById(req.signedCookies.userId , 
        function(err,user) { 
            //console.log(user);
            if(err){
                console.log(err);
            }
            if(!user){
                res.redirect('/auth/login');
            }
            res.locals.user = user;
            next();
        }
    );
    
};