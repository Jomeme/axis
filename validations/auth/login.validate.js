const { body } = require('express-validator');

module.exports = () => [
  body('username', 'Please provide a valid username').exists().isString().notEmpty(),
  body('password', 'Please provide a password').exists().isString().notEmpty()
];
