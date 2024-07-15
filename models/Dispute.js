const mongoose = require('mongoose');

const DisputeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  item: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: 'pending',
  },
});

module.exports = mongoose.model('Dispute', DisputeSchema);
