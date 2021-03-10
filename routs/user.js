const express = require('express');
const authentication = require('../controllers/authentication');
const userController = require('../controllers/user');
const videoControllers = require('../controllers/video');

const userRouter = express.Router();

userRouter.use(authentication.isLogedIn)

userRouter.post('/signup', authentication.signup);

userRouter.post('/login', authentication.login);

userRouter.get('/logout', authentication.logout);

userRouter.post('/forgotPassword', authentication.forgotPassword);

userRouter.post('/resetPassword/:token', authentication.resetPassword);

userRouter.patch('/updatePassword', authentication.updatePassword);

userRouter.patch('/updateMe', userController.updateMe);

userRouter.patch('/updatePhoto', videoControllers.upload.single('photo'), userController.updatePhoto);

userRouter.post('/contact', userController.contact);

userRouter.delete('/deleteMe', userController.deleteMe);

module.exports = userRouter;