var   mongoose = require('mongoose');
const Schema = mongoose.Schema;

var messSchema = new mongoose.Schema({
    _id: { type: Schema.Types.ObjectId, ref: 'Room' },
    nameUser: String,
    message: String,
    time: Date
});

var Mess = mongoose.model('Mess',messSchema,'messages');

module.exports=Mess;