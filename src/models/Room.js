const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({        
    

}, {
    timestamps: true,
});

module.exports = mongoose.model('Room', RoomSchema);