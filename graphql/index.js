const todoResolver = require("./todoResolver");
const passport = require('passport');
const APIError = require("../utils/APIError");

const rootResolver = {
  todos: todoResolver
};


const context = async (req) => {
  return new Promise((resolve, reject) => {
    const user = passport.authenticate('jwt', { session: false }, (err, user) => {
      if (err || !user) {
        reject(new APIError({ message: 'Unauthorized', isPublic: true, status: 401 }));
      }
      resolve(user);
    })(req);
  });
};

module.exports = {
  rootResolver,
  context
}