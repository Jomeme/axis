const { Todo, Task } = require("../../database/models/todo.model");
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
    const { todoId, taskId } = req.params;
    
    const todo = await getATodo(user.id, todoId);

    const task = (await todo.getSubTasks({
      where: {
        todoId: todo.id,
        id: taskId
      }
    }))[0];

    if (!task) {
      throw new APIError({ message: 'No task with Id found', isPublic: true, status: 404 });
    }

    await task.destroy();

    return res.json({
      message: 'Task updated successfully',
      deletedTask: task
    });
  } catch (error) {
    next(error);
  }
};
