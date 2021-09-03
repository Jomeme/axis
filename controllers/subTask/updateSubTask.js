const { Todo, Task } = require("../../database/models/todo.model");
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
    const { todoId, taskId } = req.params;

    const todo = await Todo.findOne({
      where: {
        createdBy: user.id,
        id: todoId
      },
    });

    if (!todo) {
      throw new APIError({ message: 'No todo with Id found', isPublic: true, status: 404 });
    }

    const task = await Task.findOne({
      where: {
        todoId: todo.id,
        id: taskId
      }
    });

    if (!task) {
      throw new APIError({ message: 'No task with Id found', isPublic: true, status: 404 });
    }

    const update = await task.update({ ...req.body });

    return res.json({
      message: 'Task updated successfully',
      updatedTask: update
    });

  } catch (error) {
    next(error);
  }
};
