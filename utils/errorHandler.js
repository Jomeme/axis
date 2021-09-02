const { logger } = require('../config/logger.config');
const APIError = require('../utils/APIError');

const handler = (err, req, res, next) => {

  if (process.env.NODE_ENV === 'production') {
    logger.error(err);
  } else {
    console.error(err);
  }

  res.status(err.status).json({
    message: err.isPublic ? err.message : 'An error occurred. Please try again.',
    status: 'error',
    data: {}
  });
};

const converter = (err, req, res, next) => {
  let convertedError = err;
  if (!(err instanceof APIError)) {
    convertedError = new APIError({
      message: err.message,
      status: err.status,
      stack: err.stack
    });
  }
  return handler(convertedError, req, res);
};

const notFound = (req, res, next) => {
  const err = new APIError({
    message: 'Unauthorized',
    status: 401, // Unauthorized
    isPublic: true
  });
  return handler(err, req, res);
};

module.exports = { handler, converter, notFound };
