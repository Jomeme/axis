const { validationResult } = require('express-validator');
const { logger } = require('../config/logger.config');
const APIError = require('../utils/APIError');

module.exports.validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const message = errors.array()[0].msg;
    throw new APIError({ status: 400, message, isPublic: true });
  }
  return next();
};
