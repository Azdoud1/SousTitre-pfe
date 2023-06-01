const mongoose = require('mongoose');

const TextSchema = new mongoose.Schema({
    title:{
        type: String,
        trim: true,
        required: true
    },
    description: {
        type: String,
        trim: true,
    },
    textUrl: {
        type: String,
        trim: true,
        required: true,
    },
    filename: {
        type: String,
        trim: true,
    },
    iduser: {
        type: String,
        trim: true,
    }
}, {timestamps: true})

module.exports = mongoose.model('MyTexts', TextSchema)
