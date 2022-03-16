const mongoose = require('mongoose');

const { Schema } = mongoose;

const clientModel = new Schema(
  {
    name: { type: String },
    email: { type: String },
    number: { type: String },
    address: { type: String },
  }
);

module.exports = mongoose.model('client', clientModel);
