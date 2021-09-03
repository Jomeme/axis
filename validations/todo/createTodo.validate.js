const { body } = require('express-validator');

module.exports = () => {
  const now = new Date();
  const oneHourLater = now.setHours(now.getHours() + 1);
  return [
    body('name', 'Please provide a name for todo').exists().isLength({ min: 8, max: 15 }).withMessage('Todo must have a name between 8 and 15 characters long.'),
    body('date', "Invalid date provided").exists().isISO8601().isBefore(new Date(oneHourLater).toISOString()).withMessage('Date cannot be in the future.'),
    body('picture', 'Please provide a valid picture url').exists().notEmpty().isURL()
  ];
};
