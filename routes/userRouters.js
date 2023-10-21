const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const Router = express.Router();
//THE ROUTES

Router.post('/signup', authController.signUp);
Router.post('/login', authController.login);
Router.post('/forgetPassword', authController.forgetPassword);
Router.patch('/resetPassword/:token', authController.restPassword);
Router.patch('/updateMyPassword',authController.protect, authController.updatePassword)
Router.patch('/updateUserAccount',authController.protect, userController.updateMe)
Router.delete('/deleteUserAccount',authController.protect, userController.deleteMe)




Router.route('/')
  .get(userController.getAllUsers)
Router.route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = Router;
