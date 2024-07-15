const winston = require('winston');

const errorHandler = (err, req, res, next) => {
  winston.error(err.stack);
  res.status(500).json({
    success: false,
    error: err.message || 'Server Error',
  });
};

module.exports = errorHandler;
