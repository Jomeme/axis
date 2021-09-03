const { Task, Todo } = require("../../database/models/todo.model");
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

    const todos = await Todo.findAll({
      where: {
        createdBy: user.id
      },
      include: {
        model: Task,
        as: 'subTasks'
      }
    });

    res.json({
      message: 'Todos fetched successfully',
      todos
    });
  } catch (error) {
    next(new APIError({ message: error.message, isPublic: true }));
  }
};
