const { param, body } = require('express-validator');

module.exports = () => [
  param('todoId', "Todo Id must be an integer").exists().isNumeric(),
  body('name', 'Todo must have a name between 8 and 15 characters long.').optional().isLength({ min: 8, max: 15 }),
  body('date', "Invalid date provided").optional().isISO8601().isBefore(new Date().toISOString()).withMessage('Date cannot be in the future.'),
  body('picture', 'Please provide a valid picture url').optional().notEmpty().isURL()
];
