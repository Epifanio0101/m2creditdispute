const express = require('express');
const { check } = require('express-validator');
const { registerUser, loginUser, confirmEmail, forgotPassword, resetPassword, generate2FASecret, verify2FA, updateUserProfile } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');
const logActivity = require('../middleware/logActivity');
const router = express.Router();

router.post(
  '/register',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password must be 6 or more characters').isLength({ min: 6 }),
  ],
  logActivity,
  registerUser
);

router.post(
  '/login',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  logActivity,
  loginUser
);

router.get('/confirm/:confirmationCode', logActivity, confirmEmail);

router.post('/forgot-password', logActivity, forgotPassword);
router.post('/reset/:resetToken', logActivity, resetPassword);

router.post('/2fa/generate', authMiddleware(['user']), logActivity, generate2FASecret);
router.post('/2fa/verify', authMiddleware(['user']), logActivity, verify2FA);

router.put('/profile', authMiddleware(['user']), logActivity, updateUserProfile);

module.exports = router;
