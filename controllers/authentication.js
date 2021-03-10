const User = require('./../models/user');
const catchAsync = require('../utils/catchAsyn');
const AppErr = require('../utils/appError');
const jwt = require('jsonwebtoken');
const Email = require('./../utils/email');
const crypto = require('crypto');

const resToken = (user, res, statusCode) => {
    const token = jwt.sign({ id: user.id }, process.env.PRIVATE_KEY, {
        expiresIn: process.env.EXPIRE_IN
    });
    const cookieOption = {
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        sercure: process.env.NODE_ENV == 'development' ? false : true,
        htppOnly: true
    };
    res.cookie('ms2a', token, cookieOption);
    user.password = undefined;
    res.status(statusCode).json({
        status: 200,
        token
    });
}

exports.signup = catchAsync(async (req, res, next) => {
    const newUser = await User.create(req.body);
    const url = `${req.protocol}://${req.get('host')}/me`;
    await new Email(newUser, url).sendWelcome();
    resToken(newUser, res, 201);
});

exports.login = catchAsync(async (req, res, next) => {
    //get email and password
    const { email, password } = req.body;
    //check if emial and password exist
    if (!email || !password) return next(new AppErr('please provide email and password', 400));

    //check if the user exist
    const user = await User.findOne({ email }).select('+password');
    //check if the user exist
    if (!user) return next(new AppErr('user doesnt exist !', 403));
    //comapre password
    const passwordCompare = await user.comparePassword(String(password), user.password);
    if (!passwordCompare) {
        return next(new AppErr('login faild', 403));
    }
    resToken(user, res, 200);
});
exports.logout = catchAsync(async (req, res, next) => {
    res.cookie('ms2a', 'userlogout', {
        expires: new Date(Date.now() + 1000),
        sercure:false,
        htppOnly: true
    });
    res.status(200).json({
        status: 200
    })
});

exports.isLogedIn = catchAsync(async (req, res, next) => {
    let token = req.cookies.ms2a;
    if (token) {
        let decoded = await jwt.verify(token, process.env.PRIVATE_KEY);
        const user = await User.findById(decoded.id);

        if (!user) return next();

        //if the user change the password after the token is created
        const passwordChangedAfterToken = user.changedPasswordAfter(decoded.iat);
        const subscriber = await user.subExpires();
        if(!subscriber){
            user.subscribe = false;
        }
        if (passwordChangedAfterToken) {
            return next();
        }
        res.locals.user = user;
        req.user = user;
    }
    return next();
});

exports.forgotPassword = catchAsync(async (req, res, next) => {
    //get user based on posted email
    const user = await User.findOne({ email: req.body.email });
    if (!user) return next(new AppErr('no such user'), 403);

    //generateRandom reset token
    const resetToken = user.createPasswordResetToken();
    await user.save();

    //send token to user email
    const url = `${req.protocol}://${req.get('host')}/forgotPassword/${resetToken}`;

    await new Email(user, url).sendResetPassword();

    res.status(200).json({
        status: 200
    });
});

exports.resetPassword = catchAsync(async (req, res, next) => {
    //1 get the user based on the token

    const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
    const user = await User.findOne({
        passwordREsetToken: hashedToken,
        passwordResetExpires: { $gt: Date.now() }
    });
    
    if (!user) {
        return next(new AppErr('token is invalide or expired', 400));
    }

    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    user.passwordREsetToken = undefined;
    user.passwordResetExpires = undefined;
    user.passwordChangedAt = Date.now() - 2000;
    
    await user.save();
    resToken(user, res, 200);
});

exports.updatePassword = catchAsync(async (req, res, next) => {
    //1 get the user
    const user = await User.findById(req.user.id).select('+password');

    //2 compare the password
    const passwordCompare = await user.comparePassword(req.body.currentPassword, user.password);
    if (!passwordCompare) return next(new AppErr('current password is invalide !', 401));

    //3update password
    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    await user.save();
    resToken(user, res, 200);
});