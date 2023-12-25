const express = require('express');
const { Protect } = require('../middlewares/authMiddleware');
const {
  CreatePlace,
  GetUserPlaces,
  GetUserPlaceById,
  UpdatePlaceById,
  GetPlaces,
  GetSinglePlace,
} = require('../controllers/places');

const router = express.Router();

router.route('/').post(Protect, CreatePlace);
router.route('/user-places').get(Protect, GetUserPlaces);
router.route('/list').get(GetPlaces);
router
  .route('/:id')
  .get(Protect, GetUserPlaceById)
  .put(Protect, UpdatePlaceById)
  .get(GetSinglePlace);

module.exports = router;
