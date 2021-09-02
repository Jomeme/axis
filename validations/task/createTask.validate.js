const { body } = require('express-validator');

module.exports = () => [
  body('title', 'Please provide a task title').exists().isString().notEmpty(),
  body('description', 'Please provide a task description').exists().isString().notEmpty(),
  body('due_date', 'Please provide a task due date').exists().isISO8601(),
  body('notification_time', 'Please provide a task notification time').exists().isISO8601()
];
