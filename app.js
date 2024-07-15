// app.js

const express = require('express');
const csrf = require('csurf');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const logger = require('./logger'); // Import the logger
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Connect to the database
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    logger.info('Connected to MongoDB');
  } catch (error) {
    logger.error(`MongoDB connection error: ${error}`);
    process.exit(1);
  }
};
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(csrf({ cookie: true }));

// Routes
app.use('/api', require('./routes/csrfRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/activity-logs', require('./routes/activityLogRoutes'));
// Add other routes here

// Basic route
app.get('/', (req, res) => {
  res.send('Welcome to the Credit Repair App');
  logger.info('Welcome route accessed');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => logger.info(`Server running on port ${PORT}`));
