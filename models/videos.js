const mongoose = require('mongoose');
var validator = require('validator');

const videoSchema = new mongoose.Schema({
    title: {
        type: String,
        unique: true,
        required: true,
        maxlength: [35, 'العنوان طويل جدا'],
        minlength: [5, 'العنوان قصير جدا'],
        trim: true
    },
    duration: {
        type: String
    },
    likes: {
        type: Number,
        default: 0
    },
    Dislikes: {
        type: Number,
        default: 0
    },
    views: {
        type: Number,
        default: 0
    },
    image: String,
    category: {
        type: String,
        required: true
    },
    auth: {
        type: String
    },
    translate: Boolean,
    tags: {
        type: String,
        trim: true
    },
    active: {
        type: Boolean,
        default: true
    },
    dateOfCreation: {
        type: Date,
        default: Date.now()
    },
    src: String
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

videoSchema.index({ translate: 1 });

//documment Middleware
// videoSchema.pre('save', function(next) {
//     console.log('pre save hook');
//     next();
// });

// videoSchema.pre('aggregate', function (next) {
//     this.pipeline().push({
//         $match: { likes: { $gte: 30 } }
//     });
//     next();
// });

// videoSchema.pre('aggregate', function (next) {
//     next();
// });
const Video = mongoose.model('Videos', videoSchema);

module.exports = Video;