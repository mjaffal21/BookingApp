const express = require('express');
const { CreateBooking, GetBookings } = require('../controllers/bookings');
const { Protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.route('/').post(Protect, CreateBooking);
router.route('/list').get(Protect, GetBookings);

module.exports = router;
