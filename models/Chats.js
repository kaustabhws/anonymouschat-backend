const mongoose = require('mongoose')

const { Schema } = mongoose;

const ChatSchema = new Schema({
    name: {
        type: String,
        required: true,
        default: 'Anonymous User'
    },
    body: {
        type: String,
        required: true
    },
    vote: {
        type: Number,
        default: 0
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('chat', ChatSchema)