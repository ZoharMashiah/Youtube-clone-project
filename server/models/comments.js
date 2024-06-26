const mongoose = require('mongoose');


const Schema = mongoose.Schema;
const Comment = new Schema({
    parentId: {
        type: Schema.Types.ObjectId,
    },
    videoId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    childernId: {
        type: [Schema.Types.ObjectId]
    },
    userId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    title: {
        type: String,
        required: true,
    },
    date: {
        type: Number,
        default: Date.now
    }
});
module.exports = mongoose.model('Comment', Comment);