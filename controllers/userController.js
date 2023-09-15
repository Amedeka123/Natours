const fs = require('fs');
const path = require('path');

const filePathUsers = path.join(
  __dirname,
  '..',
  'dev-data',
  'data',
  'users.json'
);
const users = JSON.parse(fs.readFileSync(filePathUsers, 'utf-8'));

exports.getAllUsers = (req, res) => {
  res.status(200).json({
    status: 'success',
    result: users.length,
    data: {
      users,
    },
  });
};

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
