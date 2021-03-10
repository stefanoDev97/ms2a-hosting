const User = require("../models/user");
const Video = require("../models/videos");
const Comment = require("../models/comment");
const catchAsync = require('../utils/catchAsyn');

exports.getHome = catchAsync(async (req, res, next) => {
    const results = await Video.find().sort({ dateOfCreation: -1 }).limit(16);
    res.status(200).render('home', {
        results
    });
});

exports.login = (req, res, next) => {
    let signup = req.query.new;
    if (req.user) {
        return res.status(200).redirect('/');
    }
    res.status(200).render('pages/login', {
        signup
    });
}
exports.likedvideos = catchAsync(async (req, res, next) => {
    if (!req.user) {
        return res.status(200).redirect('/');
    }
    const results = await User.findById(req.user.id).populate('liked_videos');
    res.status(200).render('pages/likedVideos', {
        results: results.liked_videos
    });
});

exports.getMe = catchAsync(async (req, res, next) => {
    if (!req.user) return res.status(200).redirect('/')
    res.status(200).render('pages/userProfile');
});

exports.about = catchAsync(async (req, res, next) => {
    res.status(200).render('pages/about');
});

exports.watch = catchAsync(async (req, res, next) => {
    const video = await Video.findOneAndUpdate({ _id: req.params.videoId }, {
        $inc: { views: 1 }
    }, {
        new: true
    });
    const results = await Video.find().limit(8);
    const comments = await Comment.find({ video: req.params.videoId });
    res.status(200).render('pages/watch', {
        comments, sharedlink: req.url, video, results
    });
});
exports.category = catchAsync(async (req, res, next) => {
    let category = req.params.category;
    const results = await Video.find({ category });
    res.status(200).render('pages/category', {
        moreV: true, results, category
    });
});
exports.search = catchAsync(async (req, res, next) => {
    if (!req.params.search) {
        return res.redirect('/');
    }
    function regEx(string) {
        return string.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
    };
    const search = new RegExp(regEx(req.params.search), 'gi');

    const limit = 16;
    let page = +req.query.page || 1;
    const skip = (page - 1) * limit;
    let moreV = true;
    console.log(search);
    const results = await Video.find({ title: search }).skip(skip).limit(16);
    if (results.length < 16) {
        moreV = false;
    }
    res.status(200).render('pages/search', {
        results, search: req.params.search, page
    })
});

exports.dashboard = catchAsync(async (req, res, next) => {
    const categories = await Video.aggregate([
        {
            $group: { _id: '$category' }
        }
    ]);
    res.status(200).render('pages/dashboard', {
        categories
    });
});
exports.forgotPassword = catchAsync(async (req, res, next) => {
    let token = req.params.token == 'false' ? undefined : req.params.token;
    res.status(200).render('pages/forgotPassword', {
        token
    });
});