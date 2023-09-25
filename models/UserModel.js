const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'name is require'],
    unique: true,
  },
  email: {
    type: String,
    required: [true, 'email is required'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'please provide a valid email'],
  },
  photo: String,
  password: {
    type: String,
    required: [true, 'confirm password is required'],
    minlength: 8,
  },
  confirmPassword: {
    type: String,
    required: [true, 'confirm password is required'],
    validate: {
      //This only works on CREATE OR SAVE
      validator: function (el) {
        return el === this.password;
      },
      message: 'Password are not the same',
    },
  },
});

userSchema.pre('save', async function (next) {
  // Only run this function if the password was actually modified
  if (!this.isModified('password')) return next();
  // Hash the password with cost 12
  this.password = await bcrypt.hash(this.password, 12);
  // Delete passwordConfirm field
  this.confirmPassword = undefined;
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
