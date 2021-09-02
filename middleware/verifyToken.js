const passport = require('passport');
const APIError = require('../utils/APIError');

module.exports = (req, res, next) => passport.authenticate('jwt', { session: false }, (err, user) => {
  if (err || !user) {
    throw new APIError({ message: 'Unauthorized', isPublic: true, status: 401 });
  }
  req.user = user;
  return next();
})(req, res, next);
