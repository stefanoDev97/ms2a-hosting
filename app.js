const express = require('express');
const videoRouter = require('./routs/video');
const userRouter = require('./routs/user');
const commentRouter = require('./routs/comment');
const subscribeRouter = require('./routs/subsciption');
const viewRouter = require('./routs/view');
const AppError = require('./utils/appError');
const errorController = require('./controllers/error');
const cookieParser = require('cookie-parser');
const rateLimit = require("express-rate-limit");
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require("helmet");
const xss = require('xss-clean');
const path = require('path');
const app = express();

//secure http headers
app.use(helmet({
    contentSecurityPolicy: false,
  }));
//body parser
app.use(express.json());
//static files
app.use(express.static(path.join(`${__dirname}/public`)));
//cookie-parser
app.use(cookieParser());
// To remove data sanitazetion
app.use(mongoSanitize());
//clean xss
app.use(xss());
//limit rating
const limiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 60 minutes
    max: 500 // limit each IP to 500 requests per windowMs
});
app.use(limiter);

//template engine
app.set('view engine', 'pug');
app.set('views', `${__dirname}/view`);

//video Router
app.use('/api/videos', videoRouter);

//user Router
app.use('/api/user', userRouter);

//comment Router
app.use('/api/comment', commentRouter);

//comment Router
app.use('/api/subscribe', subscribeRouter);

//view Router
app.use('/', viewRouter);

// app.use('/api/users', videoRouter);
app.use('*', (req, res, next) => {
    next(new AppError(`${req.originalUrl} not found`, 404));
});

//global error hunlder
app.use(errorController);

module.exports = app;