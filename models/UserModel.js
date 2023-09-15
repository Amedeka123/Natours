const mongoose = require('mongoose')

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
  },
  role: {
    type: String,
    required: [true, 'role is required'],
    unique: true,
  },
  active: Boolean,
  photo: String,
  password: String,
});


const User = mongoose.model('User',userSchema)

module.exports = User