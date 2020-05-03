var express = require('express');
var controller = require('../controllers/auth.controller');


var router = express.Router();

router.get('/login',controller.login);

router.post('/login',controller.postLogin);

router.get('/logout',controller.logout);


module.exports=router;