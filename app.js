const express = require('express');
const tourRouter = require('./routes/tourRouter');
const userRouter = require('./routes/userRouters');

const app = express();
// MIDDLEWARE
app.use(express.json());
// ROUTES HANDLERS
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
// THE SEVER STAR RUNNING
module.exports = app;
