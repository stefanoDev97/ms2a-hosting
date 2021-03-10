const mongoose = require('mongoose');
var validator = require('validator');
var bcrypt = require('bcryptjs');
const crypto = require('crypto');

//name- email-photo-password-passwordConfirm
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name is required'],
        minlength: [3, 'name is too short'],
        maxlength: [35, 'name is tooo long'],
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'please provide an email'],
        lowercase: true,
        trim: true,
        validator: [validator.isEmail, 'please provide an email']
    },
    photo: {
        type: String,
        default: 'user-photo'
    },
    password: {
        type: String,
        minlength: [6, 'password too short'],
        maxlength: [40, 'password too long'],
        required: true,
        trim: true,
        select: false
    },
    passwordConfirm: {
        type: String,
        required: true,
        select: false,
        validate: {
            validator: function (val) {
                return val === this.password;
            }
        }
    },
    passwordChangedAt: Date,
    passwordREsetToken: String,
    passwordResetExpires: Date,
    active: {
        type: Boolean,
        default: true,
        select: false
    },
    liked_videos: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "Videos"
        }
    ],
    disliked_videos: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "Videos"
        }
    ],
    liked_comments: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "Comment"
        }
    ],
    disliked_comments: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "Comment"
        }
    ],
    subscribe: {
        type: Boolean,
        default: false
    },
    sub_expires: Date
});

userSchema.pre(/^find/, function (next) {
    // this.find().populate({
    //     path: "liked_videos",
    //     select: "-__v"
    // }).populate({
    //     path: "disliked_videos",
    //     select: "-__v -active"
    // });
    next();
});

userSchema.pre(/^find/, function (next) {
    this.find({ active: true });
    next();
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = undefined;
    next();
});

//as our method to compare password
userSchema.methods.comparePassword = async function (bodyPassword, dbPassword) {
    return await bcrypt.compare(bodyPassword, dbPassword);
}
//sub Expires
userSchema.methods.subExpires = async function () {
    const userSubExpiresIn = this.sub_expires.getTime();
    return userSubExpiresIn > Date.now();
}

//check the time between -date of creation the token and -date of change pass
userSchema.methods.changedPasswordAfter = function (tokeWAsCretedAt) {
    if (this.passwordChangedAt) {
        const passwordChangedAtM = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
        return passwordChangedAtM > tokeWAsCretedAt;
    }
    return false;
}

userSchema.methods.createPasswordResetToken = function () {
    const resetToken = crypto.randomBytes(32).toString('hex');

    this.passwordREsetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
    return resetToken;
}

const User = mongoose.model('User', userSchema);

module.exports = User;