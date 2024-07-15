const express = require('express');
const { check } = require('express-validator');
const { contactSupport } = require('../controllers/supportController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post(
  '/contact',
  [
    authMiddleware(['user', 'admin']),
    check('email', 'Please include a valid email').isEmail(),
    check('subject', 'Subject is required').not().isEmpty(),
    check('message', 'Message is required').not().isEmpty(),
  ],
  contactSupport
);

module.exports = router;
