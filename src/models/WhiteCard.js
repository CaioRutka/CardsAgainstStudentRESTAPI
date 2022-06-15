const mongoose = require('mongoose');

const WhiteCardSchema = new mongoose.Schema({        
    WhiteCardPhrase: {
        type: String,
    },
    
    WhiteCardID: {
        type: Number,
        unique: true,
    }, 

}, {
    timestamps: true,
});

module.exports = mongoose.model('WhiteCard', WhiteCardSchema);