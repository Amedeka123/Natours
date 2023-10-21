const express = require('express');
const reviewsController = require('../controllers/reviewController');
const authController = require('../controllers/authController');

const Router = express.Router({mergeParams:true});

Router.route('/')
  .get(authController.protect, reviewsController.getAllReviews)
  .post(authController.protect,reviewsController.createReview);  

Router.route('/:id')
  .get(reviewsController.getReview)
  .patch(reviewsController.updateReview)
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),reviewsController.setTourIdUserId,
    reviewsController.deleteReviews,
  );

Router.route('/')

module.exports = Router; 
