const jwt = require('jsonwebtoken');

/**
 * Register a user
 * @param {Request} req The request object
 * @param {Response} res The response object
 */
module.exports = async (req, res, next) => {
  try {
    const { user } = req;
    const body = { id: user.id, username: user.username };
    const token = jwt.sign({ user: body }, process.env.JWT_SECRET);

    const userJson = user.toJSON();
    delete userJson.password;

    res.json({
      status: 'success',
      data: {
        token,
        user: userJson
      },
      message: 'Registration successful'
    });
  } catch (error) {
    next(error);
  }
};
