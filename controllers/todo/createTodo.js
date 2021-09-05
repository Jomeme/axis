const createATodo = require("../../handlers/createATodo");
const APIError = require("../../utils/APIError");

/**
 * 
 * @param {Request} req The request object.
 * @param {Response} res The response object.
 * @param {Function} next The callback function.
 */
 module.exports = async (req, res, next) => {
  try {
    const user = req.user;
    const todo = await createATodo({ ...req.body, createdBy: user.id });
    res.json({
      message: 'Todo created successfully',
      todo
    });
  } catch (error) {
    next(new APIError({ message: error.message, isPublic: true }));
  }
};
