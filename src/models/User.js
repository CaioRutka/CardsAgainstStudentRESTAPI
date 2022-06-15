const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({        
    username: {
        type: String, unique: true,
    },

    password: {
        type: String,
    },
    
    userKind: {
        type: String,
    },  

    matchesNumber: {
        type: Number,
        default: 0,
    },

    roundsNumber: {
        type: Number,
        default: 0,
    },

    winningMatches: {
        type: Number,
        default: 0,
    },

    winningRounds: {
        type: Number,
        default: 0,
    },

}, {
    timestamps: true,
});

module.exports = mongoose.model('User', UserSchema);