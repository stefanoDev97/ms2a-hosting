const express = require('express');

const viewControllers = require('./../controllers/view');
const videoControllers = require('./../controllers/video');
const authentication = require('./../controllers/authentication');

const viewRouter = express.Router();

viewRouter.use(authentication.isLogedIn);
viewRouter.use(videoControllers.categories);

viewRouter.get('/', viewControllers.getHome);

viewRouter.get('/ms2a', viewControllers.login);

viewRouter.get('/likedvideos', viewControllers.likedvideos);

viewRouter.get('/me', viewControllers.getMe);

viewRouter.get('/about', viewControllers.about);

viewRouter.get('/watch/:videoId', viewControllers.watch);

viewRouter.get('/category/:category', viewControllers.category);

viewRouter.get('/forgotPassword/:token', viewControllers.forgotPassword);

viewRouter.get('/search/:search', viewControllers.search);

viewRouter.get('/dashboard', (req,res,next)=>{
    if(req.user && req.user.email == 'steveliegeois6@gmail.com'){
        return next();
    }
    return res.status(200).redirect('/');
},viewControllers.dashboard);

module.exports = viewRouter;