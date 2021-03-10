const express = require('express');
const videoControllers = require('../controllers/video');
const commentRouter = require('./../routs/comment');
const videoRouter = express.Router();

const authentication = require('./../controllers/authentication');

videoRouter.use(authentication.isLogedIn);

///api/videos/sdgjsdlgj4j;lgsjd;glj/comment
videoRouter.use('/:videoId/comment', commentRouter);
videoRouter.route('/').get(videoControllers.testAuth, videoControllers.getVideos).post(videoControllers.createVideo);
videoRouter.route('/:id').patch(videoControllers.upload.single('thumbnail'),videoControllers.updateVideo).delete(videoControllers.deleteVideo);
videoRouter.route('/likedislikes/update').patch(videoControllers.likeDislikes)
//uploadvideo
videoRouter.route('/upload/:id').post(videoControllers.upload.single('video'), videoControllers.uploadVideo);

videoRouter.route('/more').get(videoControllers.moreVideos);

videoRouter.route('/stream/video/:id').get(videoControllers.streamVideo);

videoRouter.route('/stream/image/:image').get(videoControllers.streamImage);


module.exports = videoRouter;