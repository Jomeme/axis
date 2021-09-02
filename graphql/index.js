const todoResolver = require("./todoResolver");
const passport = require('passport');
const APIError = require("../utils/APIError");

const rootResolver = {
  todo: todoResolver
};


const context = (req) => passport.authenticate('jwt', { session: false }, (err, user) => {
  if (err || !user) {
    throw new APIError({ message: 'Unauthorized', isPublic: true, status: 401 });
  }
  req.user = user;
  return user;
})(req);

module.exports = {
  rootResolver,
  context
}