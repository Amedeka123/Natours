const express = require('express');
const tourController = require('../controllers/tourcontroller');

const Router = express.Router();
//Router.param('id', tourController.checkID);

Router.route('/top-5-cheap').get(
  tourController.aliasTopFive,
  tourController.getAllTours,
);
Router.route('/tour-stats').get(tourController.getTourStats)
Router.route('/monthly-plan/:year').get(tourController.getMonthlyPlan);

Router.route('/')
  .get(tourController.getAllTours)
  .post(tourController.createTour);
Router.route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour) 
  .delete(tourController.deleteTour);

module.exports = Router;
