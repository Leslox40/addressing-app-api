const mongoose = require('mongoose');

const { Schema } = mongoose;
const passportLocalMongoose = require('passport-local-mongoose');

const userModel = new Schema(
  {
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true }
  }
);

// Plugin for passport-local-mongoose
userModel.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userModel);
