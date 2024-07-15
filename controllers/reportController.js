const ActivityLog = require('../models/ActivityLog');
const fs = require('fs');
const path = require('path');

exports.generateUserReport = async (userId) => {
  const logs = await ActivityLog.find({ user: userId }).sort({ timestamp: -1 });
  const reportData = logs.map(log => ({
    action: log.action,
    timestamp: log.timestamp,
  }));

  const reportPath = path.join(__dirname, '..', 'reports', `user_${userId}_report.json`);
  fs.writeFileSync(reportPath, JSON.stringify(reportData, null, 2));

  return reportPath;
};
