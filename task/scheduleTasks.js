const cron = require('node-cron');
const { generateUserReport } = require('../controllers/reportController');
const { followUpDisputes } = require('../controllers/disputeController');
const User = require('../models/User');

cron.schedule('0 0 1 * *', async () => {
  const users = await User.find();
  for (const user of users) {
    await generateUserReport(user._id);
  }
});

cron.schedule('0 0 * * 0', async () => {
  await followUpDisputes();
});
