const express = require('express');
const app = express();

var   bodyParser = require('body-parser');
var   cookieParser = require('cookie-parser');

var userRoute = require('./routes/users.route');
var authRoute = require('./routes/auth.route');
var registerRoute = require('./routes/register.route');
var roomRoute = require('./routes/room.route');

var authMiddleware=require('./middleware/auth.middleware');


app.set('view engine', 'pug');
app.set('views','./views');

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cookieParser(process.env.SESSION_SECRET));

app.use(express.static('public'));


//Route
app.get('/',function(req,res){
    res.render('index');//index.pug
});
app.get('/create',registerRoute);
app.post('/create',registerRoute);

app.use('/users', authMiddleware.requireAuth,userRoute);
app.use('/auth', authRoute);
app.use('/rooms', authMiddleware.requireAuth,roomRoute);



//Setup Error Handlers
/*const errorHandlers = require("./handlers/errorHandlers");
app.use(errorHandlers.notFound);
app.use(errorHandlers.mongoseErrors);
if (process.env.ENV === "DEVELOPMENT") {
  app.use(errorHandlers.developmentErrors);
} else {
  app.use(errorHandlers.productionErrors);
}*/


module.exports=app;