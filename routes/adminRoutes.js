const express = require('express');
const { getUsers, getUserDisputes } = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/users', authMiddleware(['admin']), getUsers);
router.get('/users/:userId/disputes', authMiddleware(['admin']), getUserDisputes);

module.exports = router;
