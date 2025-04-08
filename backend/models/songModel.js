const mongoose = require("mongoose");

const songSchema = mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    artist: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    videoUrl: {
        type: String, // path to the uploaded video file
        required: true,
    },
    like: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
}, { timestamps: true });

module.exports = mongoose.model("Song", songSchema);