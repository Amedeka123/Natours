const express = require('express');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const tourRouter = require('./routes/tourRouter');
const userRouter = require('./routes/userRouters');

const app = express();
// MIDDLEWARE
app.use(express.json());
// ROUTES HANDLERS
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
4;
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

// THE SEVER STAR RUNNING
module.exports = app;
