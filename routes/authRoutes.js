// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/register', [
  check('name', 'Name is required').not().isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
], authController.register);

router.post('/login', authController.login);

module.exports = router;
// controllers/authController.js

exports.register = async (req, res) => {
    // Registration logic
  };
  
  exports.login = async (req, res) => {
    // Login logic
  };
  