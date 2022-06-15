const mongoose = require('mongoose');

const BlackCardSchema = new mongoose.Schema({      
    BlackCardPhrase: {
        type: String,
    },
    
    BlackCardID: {
        type: Number,
        unique: true,
    }, 

}, {
    timestamps: true,
});

module.exports = mongoose.model('BlackCard', BlackCardSchema);