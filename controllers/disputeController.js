const Dispute = require('../models/Dispute');
const { sendEmail, sendDisputeFollowUpEmail } = require('./emailController');

exports.followUpDisputes = async () => {
  const disputes = await Dispute.find({ status: 'pending' });

  for (const dispute of disputes) {
    const user = await User.findById(dispute.user);
    await sendDisputeFollowUpEmail(user, dispute);
  }
};
