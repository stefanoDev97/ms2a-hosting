const mongoose = require('mongoose');

//comment user dateofcreation video likes dislikes
const commentSchema = new mongoose.Schema({
    comment: {
        type: String,
        required: true,
        minlength: [2, 'المرجو كتابة نعليق'],
        maxlength: [200, 'التعليق طويل جدا'],
        trim: true
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    dateOfCreation: {
        type: Date,
        default: Date.now()
    },
    video: {
        type: mongoose.Schema.ObjectId,
        ref: 'Videos'
    },
    likes: {
        type: Number,
        default: 0
    },
    dislikes: {
        type: Number,
        default: 0
    }
});

commentSchema.pre(/^find/, function(next){
    this.populate({
        path: 'user'
    });
    next();
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;