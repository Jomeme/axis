const { param } = require('express-validator');

module.exports = () => [
  param('todoId', "Todo Id must be an integer").exists().isNumeric(),
];
