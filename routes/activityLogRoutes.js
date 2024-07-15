const express = require('express');
const { getActivityLogs } = require('../controllers/activityLogController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', authMiddleware(['user', 'admin']), getActivityLogs);

module.exports = router;
