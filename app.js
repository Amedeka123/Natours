const express = require('express');
const  helmet = require('helmet');
const rateLimit = require('express-rate-limit')
const mongoSanitize = require('express-mongo-sanitize')
const xss = require('xss-clean')
const morgan = require('morgan');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const tourRouter = require('./routes/tourRouter');
const userRouter = require('./routes/userRouters');


// 1) GLOBAL MIDDLEWARE
const app = express();
// security HTTP headers
app.use(helmet())
// development logging
if(process.env.NODE_ENV = 'development'){
  app.use(morgan('dev'))
}
//Limit requests from same IP
const limiter = rateLimit({
  max:100,
  windowMs:60*60*1000,
  message:'Too many requests from this IP, Please try again in an hour'
})
app.use('/api',limiter)
//Body parser, reading data from body into req.body
app.use(express.json({limit:'10kb'}));

//Data sanitization against NoSQL query injection
app.use(mongoSanitize())

//Data sanitization against XXS
app.use(xss())

// Prevent parameter pollution
app.use(hpp({
  whitelist:[
    'duration',
    'ratingsAverage',
    'ratingsQuantity',
    'maxGroupSize',
    'difficulty',
    'price'
  ]
}))
// serving static files
//app.use(express.static`${__dirname}/public`)
// test middlewarenp
app.use((req,res,next)=>{
  req.requestTime = new Date().toDateString()
  next()
})
// ROUTES HANDLERS
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

// THE SEVER STAR RUNNING
module.exports = app;
