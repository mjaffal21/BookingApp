const mongoose = require('mongoose');

const BookingSchema = mongoose.Schema({
  place: { type: mongoose.Schema.ObjectId, required: true, ref: 'Place' },
  user: { type: mongoose.Schema.ObjectId, required: true, ref: 'User' },
  checkIn: { type: Date, required: true },
  checkOut: { type: Date, required: true },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  price: Number,
});

const BookingModel = mongoose.model('Booking', BookingSchema);

module.exports = BookingModel;
