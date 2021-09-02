const { body } = require('express-validator');

module.exports = () => [
  body('task_id', 'Please provide a valid task id.').exists().isString().notEmpty().isMongoId(),
];
