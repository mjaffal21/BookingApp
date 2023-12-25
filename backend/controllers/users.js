const asyncHandler = require('../middlewares/asyncHandler');
const bcrypt = require('bcryptjs');
const ErrorResponse = require('../utils/errorResponse');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.RegisterUser = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return next(new ErrorResponse('These fields are required!', 400));
  }
  const userDoc = await User.create({
    name,
    email,
    password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
  });
  if (userDoc) {
    let token = jwt.sign(
      { id: userDoc._id, name: userDoc.name, email: userDoc.email },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
    res.status(200).json({
      token,
    });
  } else {
    next(new ErrorResponse('User cannot be registered', 400));
  }
});

exports.LoginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorResponse('These fields are required!', 400));
  }
  const userDoc = await User.findOne({ email });
  const matchPassword = bcrypt.compareSync(password, userDoc.password);

  if (userDoc && matchPassword) {
    let token = jwt.sign(
      { id: userDoc._id, email: userDoc.email },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
    res.status(200).json({
      _id: userDoc._id,
      name: userDoc.name,
      email: userDoc.email,
      token,
    });
  } else {
    next(new ErrorResponse('Invalid Credentials!'));
  }
});

exports.GetUserProfile = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    next(new ErrorResponse('User not found', 404));
  }
});

exports.LogOut = asyncHandler(async (req, res, next) => {
  res.cookie('token', '', {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: 'Logged out successfully' });
});
