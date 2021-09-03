const { body } = require('express-validator');

module.exports = () => [
  body('date', "Invalid date provided").exists().isISO8601().isBefore(new Date().toISOString()).withMessage('Date cannot be in the future.'),
];
