const crypto = require('crypto')
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'name is require'],
  },
  email: {
    type: String,
    required: [true, 'email is required'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'please provide a valid email'],
  },
  photo: String,
  role:{
    type:String,
    emun:['user','guide','lead-guide','admin'],
    default:'user'
  },
  password: {
    type: String,
    required: [true, 'confirm password is required'],
    minlength: 8,
    select: false,
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
  changePasswordAt: Date,
  passwordResetToken:String,
  passwordResetExpires:Date,
  active:{
    type:Boolean,
    default:true,
    select:false
  }
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

userSchema.pre('save',function(next){
  if(!this.isModified('password')|| this.isNew) return next()
    this.changePasswordAt = Date.now() - 1000
    next() 
})

userSchema.methods.correctPassword = async function (
  candidatePasswass,
  userPassword,
) { 
  return await bcrypt.compare(candidatePasswass, userPassword);
};
userSchema.pre(/^find/,function(next){
  this.find({active:{$ne:false}})
  next()
})
userSchema.methods.changePasswordAfter =  function(JWTTimestamp){
  if(this.changePasswordAt){
    const changeTimestamp = parseInt(this.changePasswordAt.getTime()/1000,10)
    return JWTTimestamp < changeTimestamp
  }
 return false
}

userSchema.methods.createPasswordResetToken = function(){
  const resetToken = crypto.randomBytes(32).toString('hex');
  this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  this.passwordResetExpires= Date.now() + 10 * 60 *1000;
  return resetToken
}
const User = mongoose.model('User', userSchema);

module.exports = User;
