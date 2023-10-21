const express = require('express');
const tourController = require('../controllers/tourcontroller');
const authController = require('./../controllers/authController');
const reviewRouter = require('./../routes/reviewRouter')

const Router = express.Router();
//Router.param('id', tourController.checkID);

// Router.route('/:tourID/reviews').post(
//   authController.protect,
//   authController.restrictTo('user'),
//   reviewController.createReview,
// );
Router.use('/:tourId/reviews', reviewRouter)

Router.route('/top-5-cheap').get(
  tourController.aliasTopFive,
  tourController.getAllTours,
);
Router.route('/tour-stats').get(tourController.getTourStats);
Router.route('/monthly-plan/:year').get(tourController.getMonthlyPlan);

Router.route('/')
  .get(authController.protect, tourController.getAllTours)
  .post(tourController.createTour);
Router.route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide', 'guide'),
    tourController.deleteTour,
  );

module.exports = Router;
