const Video = require('../models/videos');
const User = require('../models/user');
const catchAsync = require('../utils/catchAsyn');
const AppError = require('../utils/appError');
const multer = require('multer');
const AWS = require('aws-sdk');
const { getVideoDurationInSeconds } = require('get-video-duration');

exports.upload = multer({
    storage: multer.memoryStorage()
});

exports.getVideos = catchAsync(async (req, res, next) => {
    const videos = await Video.find({ translate: true }).explain();
    res.status(200).json({
        status: 'succus',
        length: videos.length,
        data: videos
    });
});

exports.createVideo = catchAsync(async (req, res, next) => {
    let newVideo = await Video.create(req.body);
    return res.status(201).json({
        status: "succes",
        data: newVideo
    });
});


exports.updateVideo = catchAsync(async (req, res, next) => {
    const id = req.params.id;
    const video = await Video.findByIdAndUpdate(id, { image: `${req.params.id}image` }, {
        new: true,
        runValidators: false
        //select: ['-title']
    });
    if (!video) return next(new AppError('video not found !', 404));

    const s3 = new AWS.S3({ apiVersion: '2006-03-01' });
    s3.putObject({
        Bucket: 'storage-ms2a',
        Body: req.file.buffer,
        Key: `${req.params.id}image.jpeg`
    }, function (er) {
        if (er) {
            return new AppError(er.message, 404);
        }
        res.status(200).json({
            status: "succes",
            data: id
        });
    });
});

exports.uploadVideo = (req, res, next) => {
    const s3 = new AWS.S3({ apiVersion: '2006-03-01' });
    s3.putObject({
        Bucket: 'storage-ms2a',
        Body: req.file.buffer,
        Key: `${req.params.id}.mp4`
    }, async function (er) {
        if (er) {
            return new AppError(er.message, 404);
        }
        const stream = s3.getObject({
            Bucket: 'storage-ms2a',
            Key: `${req.params.id}.mp4`
        }).createReadStream();
        const videoDuration = await getVideoDurationInSeconds(stream);
        //8s => 00:08
        let ds = parseInt(videoDuration % 60);
        let dm = parseInt((videoDuration / 60) % 60);
        if (String(ds).length == 1) ds = `0${ds}`;
        if (String(dm).length == 1) dm = `0${dm}`;
        const video = await Video.findByIdAndUpdate(req.params.id, { duration: `${dm}:${ds}` }, {
            new: true,
            runValidators: false
        });
        res.status(200).json({
            status: "succes"
        });
    });
}
exports.deleteVideo = catchAsync(async (req, res) => {
    const id = req.params.id;
    await Video.findByIdAndDelete(id);
    res.status(200).json({
        status: "succes",
        message: 'video is deleted'
    });
})

exports.testAuth = (req, res, next) => {
    if (req.headers.email == 'arita30x@gmail.com') {
        return next();
    }
    res.status(403).json({
        message: 'this email is invalid'
    });
}


exports.moreVideos = catchAsync(async function (req, res, next) {
    const limit = 16;
    let page = req.query.page;
    const skip = (page - 1) * limit;

    const moreVideos = await Video.find().sort({ dateOfCreation: -1 }).skip(skip).limit(16);
    if (moreVideos.length == 0) {
        return res.json({
            status: 'done'
        });
    }
    res.status(200).render('pages/moreVideos', {
        moreVideos
    });
})

exports.categories = catchAsync(async function (req, res, next) {
    const categories = await Video.aggregate([
        {
            $group: { _id: '$category' }
        }
    ]);
    res.locals.categories = categories;
    next();
});
exports.streamVideo = catchAsync(async function (req, res, next) {
    const s3 = new AWS.S3({ apiVersion: '2006-03-01' });
    s3.listObjectsV2({ MaxKeys: 1, Prefix: `${req.params.id}.mp4`, Bucket: 'storage-ms2a' }, function (err, data) {
        if (err) {
            return res.status(404).send('not found !');
        }
        if (!data.Contents[0]) {
            return res.status(404).send('not found !');
        }
        if (req != null && req.headers.range != null) {
            var range = req.headers.range;
            var bytes = range.replace(/bytes=/, '').split('-');
            var start = parseInt(bytes[0], 10);

            var total = data.Contents[0].Size;
            var end = bytes[1] ? parseInt(bytes[1], 10) : total - 1;
            var chunksize = (end - start) + 1;
            res.writeHead(206, {
                'Content-Range': 'bytes ' + start + '-' + end + '/' + total,
                'Accept-Ranges': 'bytes',
                'Content-Length': chunksize,
                'Last-Modified': data.Contents[0].LastModified,
                'Content-Type': 'video/mp4',
                'Powered-By': 'MS2A'
            });
            s3.getObject({ Key: `${req.params.id}.mp4`, Range: range, Bucket: 'storage-ms2a' }).createReadStream().pipe(res);
        } else {
            res.writeHead(200,
                {
                    'Content-Length': data.Contents[0].Size,
                    'Last-Modified': data.Contents[0].LastModified,
                    'Content-Type': 'video'
                });
            s3.getObject({ Key: `${req.params.id}.mp4`, Range: range, Bucket: 'storage-ms2a' }).createReadStream().pipe(res);
        }
    });
});
exports.streamImage = catchAsync(async function (req, res, next) {
    const s3 = new AWS.S3({ apiVersion: '2006-03-01' });
    s3.getObject({ Key: `${req.params.image}.jpeg`, Bucket: 'storage-ms2a' }).createReadStream().on('error', (er)=>{
        return res.status(404).send('no such file');
    }).pipe(res);
});

exports.likeDislikes = catchAsync(async function (req, res, next) {
    if(!req.user) return res.status('403').json({status: 'bad request'});
    const videoId = req.body.videoId;
    if(req.body.updateLike){
        if (req.body.like == 1){
            let vOption = {$inc: { likes: 1}};
            let uOption = {$push: { liked_videos: videoId}};
            await Video.findByIdAndUpdate(videoId, vOption);
            await User.findByIdAndUpdate(req.user.id, uOption);
            if(req.body.dislike == -1){
                await Video.findByIdAndUpdate(videoId, {$inc: { Dislikes: -1}});
                await User.findByIdAndUpdate(req.user.id, {$pull: {disliked_videos: videoId}});
            }
        }else if(req.body.like == -1){
            await Video.findByIdAndUpdate(videoId, { $inc: { likes: -1}});
            await User.findByIdAndUpdate(req.user.id, {
                $pull : {
                    liked_videos : videoId
                }
            });
        }
    }
    if(req.body.updateDislike){
        if (req.body.dislike == 1){
            let vOption = {$inc: { Dislikes: 1}};
            let uOption = {$push: { disliked_videos: videoId}};
            await Video.findByIdAndUpdate(videoId, vOption);
            await User.findByIdAndUpdate(req.user.id, uOption);
            if(req.body.like == -1){
                await Video.findByIdAndUpdate(videoId, {$inc: { likes: -1}});
                await User.findByIdAndUpdate(req.user.id, {$pull: {liked_videos: videoId}});
            }
        }else if(req.body.dislike == -1){
            await Video.findByIdAndUpdate(videoId, { $inc: { Dislikes: -1}});
            await User.findByIdAndUpdate(req.user.id, {
                $pull : {
                    disliked_videos : videoId
                }
            });
        }
    }
    res.status(200).json();
});