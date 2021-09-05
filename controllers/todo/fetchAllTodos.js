const { Task, Todo } = require("../../database/models/todo.model");
const getAllTodo = require("../../handlers/getAllTodo");
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

    const todos = await getAllTodo(user.id);

    res.json({
      message: 'Todos fetched successfully',
      todos
    });
  } catch (error) {
    next(new APIError({ message: error.message, isPublic: true }));
  }
};
