const asyncHandler = require('../middlewares/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');
const Booking = require('../models/Booking');

exports.CreateBooking = asyncHandler(async (req, res, next) => {
  const { place, checkIn, checkOut, numberOfGuests, name, phone, price } =
    req.body;

  const booking = await Booking.create({
    place,
    checkIn,
    checkOut,
    numberOfGuests,
    name,
    phone,
    price,
    user: req.user._id,
  });

  if (booking) {
    return res.status(201).json(booking);
  }
  next(new ErrorResponse('Booking failed to be placed!!', 400));
});

exports.GetBookings = asyncHandler(async (req, res, next) => {
  const bookings = await Booking.find({ user: req.user._id }).populate('place');
  if (bookings) {
    return res.status(200).json(bookings);
  }
  next(new ErrorResponse('No bookings are found!!', 404));
});
