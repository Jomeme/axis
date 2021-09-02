const { body } = require('express-validator');

module.exports = () => [
  body('task_id', 'Please provide a valid task id.').exists().isString().notEmpty().isMongoId(),
  body('title', 'Please provide a task title').optional().isString().notEmpty(),
  body('description', 'Please provide a task description').optional().isString().notEmpty(),
  body('due_date', 'Please provide a task due date').optional().isISO8601(),
  body('notification_time', 'Please provide a task notification time').optional().isISO8601(),
  body('is_completed', 'Is completed can either be true or false.').optional().isBoolean()
];
