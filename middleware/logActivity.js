const { logActivity } = require('../controllers/activityLogController');

module.exports = async (req, res, next) => {
  await logActivity(req.user.id, `${req.method} ${req.originalUrl}`);
  next();
};
