var   mongoose = require('mongoose');
const Schema = mongoose.Schema;

var userSchema = new mongoose.Schema({
    _id: { type: Schema.Types.ObjectId, ref: 'Room' },
    email: String,
    name: String,
    password: String,
    phone: String,
    roomIds:[{ type: Schema.Types.ObjectId, ref: 'Room' }]
});

var User = mongoose.model('User',userSchema,'users');

module.exports=User;