const express = require('express');
const {
  LoginUser,
  RegisterUser,
  GetUserProfile,
  LogOut,
} = require('../controllers/users');
const { Protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.route('/login').post(LoginUser);
router.route('/register').post(RegisterUser);
router.route('/profile').get(Protect, GetUserProfile);
router.route('/logout').post(LogOut)

module.exports = router;
