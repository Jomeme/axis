const { body } = require('express-validator');
const User = require('../../database/models/user.model');

module.exports = () => [
  body('username', 'Please provide a valid user name').exists().isString().notEmpty()
    .bail()
    .custom(async (value) => {
      const doc = await User.findOne({ where: { username: value }});
      if (doc) {
        return Promise.reject(new Error('A user with this username already exists.'));
      }
      return true;
    }),
  body('password', 'Please provide a valid password').exists().isString().notEmpty()
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters.'),
];
