var   mongoose = require('mongoose');
const Schema = mongoose.Schema;

var roomSchema = new mongoose.Schema({
    _id: { type: Schema.Types.ObjectId, ref: 'User' },
    name: String,
    code: String,
    messIds: [{ type: Schema.Types.ObjectId, ref: 'Mess' }],
    userIds: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

var Room= mongoose.model('Room',roomSchema,'rooms');

module.exports=Room;