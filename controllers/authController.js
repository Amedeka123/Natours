const {promisify} = require('util')
const jwt = require('jsonwebtoken');
const User = require('./../models/UserModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.signUp = catchAsync(async (req, res, next) => {
  const newUser = await User.create(req.body);
  // creating of JWT token
  const token = signToken(newUser._id);
  res.status(201).json({
    status: 'success',
    token,
    data: {
      user: newUser,
    },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  // check if email and password exist
  if (!email || !password) {
    return next(new AppError('Please provide email and password!', 400));
  }
  // check if user exist and password is correct
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }
  // if everything ok, send token to client
  const token = signToken(user._id);
  res.status(200).json({
    status: 'success',
    token,
  });
});

exports.protect = catchAsync( async(req,res,next)=>{
  // Getting token and check of it's there
  let token;
  if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
    token = req.headers.authorization.split(' ')[1]
  }
  if(!token){
    return next(new AppError('You are not logged in! Please log in to get access',401))
  }
  //Verification token
   const decoded =  await promisify(jwt.verify)(token, process.env.JWT_SECRET)

  // Check if user still exists
const freshUser = await User.findById(decoded.id)
if(!freshUser){
  return next( new AppError("The user belonging to this token does not exist",401))
}

  // Check if user change password after the token was issued
  const isPasswordChange = freshUser.changePasswordAfter(decoded.iat)
   if(isPasswordChange){
     return next( new AppError("Password has been change recently, Please login again",401))
   }
  // Grant access to protected route
  req.user = freshUser
  next()
})

exports.restrictTo = (...roles) =>{
  return (req,res,next) => {
    if(!roles.includes(req.user.role)){
      return next(new AppError('Please you not have the pression to perform this action',403))
    }
    next()
  }
}

exports.forgetPassword = catchAsync( async (req,res,next) => { 
  // Get user based on POSTED email
  const user = await User.findOne({email:req.body.email})
  // check that the user exist with that email
  if(!user){
    return next(new AppError('User does not exit', 404))
  }

  // Generate the random reset
  const resetToken = user.createPasswordResetToken();
  await user.save({validateBeforeSave:false})
})


exports.restPassword = (req,res,next) => { } 

