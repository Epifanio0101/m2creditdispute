const mongoose = require('mongoose');
const winston = require('winston');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    winston.info('MongoDB Connected...');
  } catch (err) {
    winston.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
