const mongoose = require('mongoose');

const { Schema } = mongoose;

const clientModel = new Schema(
  {
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String },
    username: { type: String },
    imageUrl: { type: String },
    clientId: { type: String },
    region: { type: String },
    city: { type: String },
    street: { type: String },
    lng: { type: String },
    lat: { type: String },
    pluscodes: { type: String },
    description: { type: String }
  }
);

module.exports = mongoose.model('client', clientModel);
