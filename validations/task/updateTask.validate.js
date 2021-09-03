const { param, body } = require('express-validator');

module.exports = () => [
  param('todoId', "Todo Id must be an integer").exists().isNumeric(),
  param('taskId', "Task Id must be an integer").exists().isNumeric(),
  body('title', 'Please provide a title for todo sub-task').optional().isString().notEmpty()
];
