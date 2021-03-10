const stripe = require('stripe');
const catchAsync = require('../utils/catchAsyn');
const User = require('../models/user');

exports.subscribe = catchAsync(async (req, res, next) => {
  if (!req.user) return res.status(200).redirect('/ms2a');
  const session = await stripe(process.env.SECRET_STRIPE).checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'MS2A FUNNY',
            images: ['https://picsum.photos/200'],
          },
          unit_amount: 500,
        },
        quantity: 1,
      },
    ],
    customer_email: req.user.email,
    mode: 'payment',
    success_url: `http://localhost:5000/api/subscribe/new-subscriber?email=${req.user.email}&userId=${req.user.id}`,
    cancel_url: `http://localhost:5000/`,
  });
  res.status(200).json({
    status: 200,
    session
  });
});
exports.newSubscriber = catchAsync(async (req, res, next) => {
  const option = {
    email: req.query.email,
    _id: req.query.userId
  }
  await User.findOneAndUpdate(option, {
    subscribe: true,
    sub_expires: Date.now() + 60 * 60 * 24 * 60 * 1000
  }, {
    new: true
  });
  res.status(200).redirect('/');
});