const ActivityLog = require('../models/ActivityLog');
const { sendEmail } = require('./emailController');

exports.logActivity = async (user, action) => {
  const log = new ActivityLog({ user, action });
  await log.save();

  // Monitor suspicious activities (e.g., multiple failed login attempts)
  const suspiciousActions = ['failed login attempt'];
  if (suspiciousActions.includes(action)) {
    const user = await User.findById(user);
    const subject = 'Suspicious Activity Detected';
    const text = `Hello ${user.name},\n\nWe detected suspicious activity on your account. Please verify your recent activities.\n\nBest regards,\nCredit Repair Team`;
    await sendEmail(user.email, subject, text);
  }
};

exports.getActivityLogs = async (req, res) => {
  try {
    const logs = await ActivityLog.find({ user: req.user.id }).sort({ timestamp: -1 });
    res.json(logs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
