const catchAsync = require('../utils/catchAsyn');
const Comment = require('../models/comment');
const User = require('../models/user');
const AppErr = require('../utils/appError');

exports.createComment = catchAsync(async (req, res, next) => {
    if (!req.user) return next(new AppErr('المرجو تسحيل الدخول', 403));
    const data = Object.assign(req.body, {
        user: req.user.id,
        video: req.params.videoId
    });
    const comment = await Comment.create(data);
    res.status(200).json({
        status: 200,
        comment,
        username :req.user.name,
        userphoto :req.user.photo
    });
});
exports.allComments = catchAsync(async (req, res, next) => {
    const videoId = req.params.videoId;
    const comments = await Comment.find({ video: videoId })

    res.status(200).json({
        status: 200,
        commentsLength: comments.length,
        comments
    });
});

exports.deleteComment = catchAsync(async (req, res, next) => {
    const options = {
        _id: req.params.commentId,
        user: req.user.id
    }
    await Comment.findOneAndDelete(options);
    res.status(204).json({
        status: 200
    });
});
exports.updateLikeDislike = catchAsync(async (req, res, next) => {
    if(!req.user) return res.status(403).json({status: 'bad request'});
    const commentId = req.body.commentId;
    if(req.body.updateLike){
        if (req.body.like == 1){
            let vOption = {$inc: { likes: 1}};
            let uOption = {$push: { liked_comments: commentId}};
            await Comment.findByIdAndUpdate(commentId, vOption);
            await User.findByIdAndUpdate(req.user.id, uOption);
            if(req.body.dislike == -1){
                await Comment.findByIdAndUpdate(commentId, {$inc: { dislikes: -1}});
                await User.findByIdAndUpdate(req.user.id, {$pull: {disliked_comments: commentId}});
            }
        }else if(req.body.like == -1){
            await Comment.findByIdAndUpdate(commentId, { $inc: { likes: -1}});
            await User.findByIdAndUpdate(req.user.id, {
                $pull : {
                    liked_comments : commentId
                }
            });
        }
    }
    if(req.body.updateDislike){
        if (req.body.dislike == 1){
            let vOption = {$inc: { dislikes: 1}};
            let uOption = {$push: { disliked_comments: commentId}};
            await Comment.findByIdAndUpdate(commentId, vOption);
            await User.findByIdAndUpdate(req.user.id, uOption);
            if(req.body.like == -1){
                await Comment.findByIdAndUpdate(commentId, {$inc: { likes: -1}});
                await User.findByIdAndUpdate(req.user.id, {$pull: {liked_comments: commentId}});
            }
        }else if(req.body.dislike == -1){
            await Comment.findByIdAndUpdate(commentId, { $inc: { dislikes: -1}});
            await User.findByIdAndUpdate(req.user.id, {
                $pull : {
                    disliked_comments : commentId
                }
            });
        }
    }
    res.status(200).json();
});