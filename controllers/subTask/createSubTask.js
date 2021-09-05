const { Task, Todo } = require("../../database/models/todo.model");
const createASubTask = require("../../handlers/createASubTask");
const getATodo = require("../../handlers/getATodo");
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
    const { todoId } = req.params;

    const todo = await getATodo(user.id, todoId);

    const task = await createASubTask({ ...req.body, todoId: todo.id });
    
    res.json({
      message: 'Sub-task created successfully',
      task
    });
  } catch (error) {
    next(error);
  }
};
