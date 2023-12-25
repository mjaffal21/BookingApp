const asyncHandler = require('../middlewares/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');
const Place = require('../models/Place');

exports.CreatePlace = asyncHandler(async (req, res, next) => {
  const {
    title,
    address,
    addedPhotos,
    description,
    price,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
  } = req.body;

  const place = await Place.create({
    owner: req.user.id,
    title,
    address,
    photos: addedPhotos,
    description,
    price,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
  });
  if (place) {
    return res.status(201).json(place);
  }
  next(new ErrorResponse('Error in creating a place', 400));
});

exports.GetUserPlaces = asyncHandler(async (req, res, next) => {
  const places = await Place.find({ owner: req.user._id });
  res.status(200).json(places);
});

exports.GetUserPlaceById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const place = await Place.findById(id);
  if (place) {
    return res.status(200).json(place);
  }
  next(new ErrorResponse(`No Place with ${id} is found!!!`, 404));
});

exports.UpdatePlaceById = asyncHandler(async (req, res, next) => {
  const {
    id,
    title,
    address,
    addedPhotos,
    description,
    price,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
  } = req.body;

  const place = await Place.findById(id);
  if (req.user._id.toString() === place.owner.toString()) {
    if (place) {
      (place.title = title),
        (place.address = address),
        (place.photos = addedPhotos),
        (place.description = description),
        (place.price = price),
        (place.perks = perks),
        (place.extraInfo = extraInfo),
        (place.checkIn = checkIn),
        (place.checkOut = checkOut),
        (place.maxGuests = maxGuests);
      const updatePlace = await place.save();
      res.status(200).json(updatePlace);
    } else {
      next(new ErrorResponse('Place cannot be updated', 400));
    }
  } else {
    next(new ErrorResponse('Unauthorized to update this place', 401));
  }
});

exports.GetPlaces = asyncHandler(async (req, res, next) => {
  const places = await Place.find({});
  if (places) {
    return res.status(200).json(places);
  }
  next(new ErrorResponse('No places are found!', 404));
});

exports.GetSinglePlace = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const place = await Place.findOne({ id });
  if (place) {
    return res.status(200).json(place);
  }
  next(new ErrorResponse(`Resource not found!!!`, 404));
});
