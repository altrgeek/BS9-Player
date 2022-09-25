const mongoose = require('mongoose');
const AudioSchema = mongoose.Schema({
        id: {
        type: Number
        },
        
        title: { 
                type: String,
                required: true
        },
        artistName: { 
                type: String,
                required: true
        },
        owner: { 
                type: String,
                required: true
        },
        thumbnail: { 
                type: String 
        },
        audioFile: { 
                 type: String,
        }
});


module.exports = mongoose.model('Audio', AudioSchema);
