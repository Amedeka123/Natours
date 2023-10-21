const Review = require('./../models/reviewsModel');
// const AppError = require('./../utils/appError');
// const APIfeatures = require('./../utils/apiFeatures');
// const catchAsync = require('./../utils/catchAsync');
const factory = require('./handlerFactory');

const sendRes = (res, statusCode, reviews) => {
  res.status(statusCode).json({
    status: 'success',
    data: {
      reviews,
    },
  });
};
exports.getAllReviews = factory.getAll(Review)

exports.setTourIdUserId = (req, res, next) => {
  // allowed nested route
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

exports.createReview = factory.createOne(Review);

exports.getReview = factory.getOne(Review)


exports.updateReview = factory.updateOne(Review);

exports.deleteReviews = factory.deleteOne(Review);
