const express = require('express');
const { getAnalytics } = require('../controllers/analyticsController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', authMiddleware(['user', 'admin']), getAnalytics);

module.exports = router;
