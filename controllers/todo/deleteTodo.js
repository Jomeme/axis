const Todo = require("../../database/models/todo.model");
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

    const todo = await Todo.findOne({
      where: {
        createdBy: user.id,
        id: todoId
      },
    });

    if (!todo) {
      throw new APIError({ message: 'No todo with Id found', isPublic: true });
    }

    await todo.destroy();

    res.json({
      message: 'Deleted successfully',
      deletedTodo: todo
    })
  } catch (error) {
    next(new APIError({ message: error.message, isPublic: true }));
  }
};
