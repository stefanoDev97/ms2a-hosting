const express = require('express');
const authentication = require('../controllers/authentication');
const commentController = require('../controllers/comment');
const rateLimit = require("express-rate-limit");

const commentRouter = express.Router({ mergeParams: true });

commentRouter.use(authentication.isLogedIn);

commentRouter.route('/').get(commentController.allComments).post(commentController.createComment);

const limiter = rateLimit({
    windowMs: 60 * 1000, //
    max: 5 // 
});
commentRouter.use(limiter);
commentRouter.route('/likedislikes/update').patch(commentController.updateLikeDislike);

commentRouter.route('/:commentId').delete(commentController.deleteComment);

module.exports = commentRouter;