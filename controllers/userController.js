const User = require('./../models/UserModel');
const catchAsync = require('./../utils/catchAsync');

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();
  // Send responses
  res.status(200).json({
    status: 'success',
    result: users.length,
    data: {
      users,
    },
  });
});

exports.createUser = (req, res) => {
  res.status(200).json({
    status: 'success',
    massage: 'userCreated',
  });
};

exports.updateUser = (req, res) => {
  res.status(200).json({
    status: 'success',
    massage: 'userCreated',
  });
};
exports.deleteUser = (req, res) => {
  res.status(200).json({
    status: 'success',
    massage: 'userCreated',
  });
};
exports.getUser = (req, res) => {
  res.status(200).json({
    status: 'success',
    massage: 'userCreated',
  });
};
