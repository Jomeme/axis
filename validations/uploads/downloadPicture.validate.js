const { param } = require('express-validator');

module.exports = () => [
  param('userId', 'Invalid user Id in request path').exists().notEmpty(),
  param('filename', 'Invalid file name in request path').exists().notEmpty(),
];
