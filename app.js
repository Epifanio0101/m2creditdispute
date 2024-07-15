const express = require('express');
const csrf = require('csurf');
const cookieParser = require('cookie-parser');
const csrfProtection = csrf({ cookie: true });
const connectDB = require('./config/db');
const winston = require('winston');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(csrfProtection);

// Routes
app.use('/api', require('./routes/csrfRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/activity-logs', require('./routes/activityLogRoutes'));
// Add other routes here

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => winston.info(`Server running on port ${PORT}`));
