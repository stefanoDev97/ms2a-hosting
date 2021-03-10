const express = require('express');
const subsciptionController = require('../controllers/subsciption');
const auth = require('../controllers/authentication');

const subsciptionRouter = express.Router();

subsciptionRouter.use(auth.isLogedIn);
subsciptionRouter.get('/checkout-session', subsciptionController.subscribe);

subsciptionRouter.get('/new-subscriber', subsciptionController.newSubscriber);

module.exports = subsciptionRouter;