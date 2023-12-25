const mongoose = require('mongoose');

const PlaceSchema = mongoose.Schema({
  owner: { type: mongoose.Schema.ObjectId, ref: 'User' },
  title: { type: String, required: true },
  address: { type: String, required: true },
  photos: { type: [String], required: true },
  description: { type: String, required: true },
  perks: [String],
  extraInfo: { type: String },
  checkIn: { type: Number, required: true },
  checkOut: { type: Number, required: true },
  maxGuests: { type: Number, required: true },
  price: { type: Number, required: true },
});

const PlaceModel = mongoose.model('Place', PlaceSchema);

module.exports = PlaceModel;
