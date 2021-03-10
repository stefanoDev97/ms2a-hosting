const User = require('../models/user');
const Contact = require('../models/contact_messages');
const catchAsync = require('../utils/catchAsyn');
const Email = require('../utils/email');
const AWS = require('aws-sdk');
const sharp = require('sharp');

exports.updateMe = catchAsync(async (req, res, next) => {
    //update user name
    const Object = {};
    if (req.body.name) Object.name = req.body.name;
    const updatedUser = await User.findByIdAndUpdate(req.user.id, Object, {
        new: true,
        runValidators: true
    });
    res.status(201).json({
        status: 200
    });
});
exports.contact = catchAsync(async (req, res, next) => {
    //update user name
    let user = req.user;
    let data = {
        name: req.user.name,
        email:req.user.email,
        message:req.body.message
    }
    await Contact.create(data);
    await new Email(user, `${req.protocol}://${req.get('host')}/`).sendContact();
    res.status(201).json({
        status: 200
    });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
    await User.findByIdAndUpdate(req.user.id, {
        active: false
    });
    res.status(204).json({
        status: 200
    });
});
exports.updatePhoto = catchAsync(async (req, res, next) => {
    if(!req.file) return next(new AppError('file is required !', 404));
    if(!req.user) return next(new AppError('please login !', 404));
    const s3 = new AWS.S3({ apiVersion: '2006-03-01' });
    let photo = false;
    let keyName = '';
    if(req.user.photo != 'user-photo') {
        photo = true;
    }
    if(photo){
        keyName = `${req.user.photo}.jpeg`;
    }else{
        keyName = `${req.user._id}photo.jpeg`;
    }
    sharp(req.file.buffer)
    .resize(500,500)
    .toFormat('jpeg')
    .jpeg({ quality: 90})
    .toBuffer()
    .then( buffer => { 
        s3.putObject({
            Bucket: 'storage-ms2a',
            Body: buffer,
            Key: keyName
        }, async function (er) {
            if (er) {
                return new AppError(er.message, 404);
            }
            let user = await User.findByIdAndUpdate(req.user.id, {photo: `${req.user._id}photo`}, {
                runValidators: true,
                new: true
            });
            res.status(200).json({
                status: "succes"
            });
        });
    })

});