const { Todo, Task } = require("../database/models/todo.model");
const APIError = require("../utils/APIError");

/**
 * 
 * @param {String} userId The user Id
 * @param {String} todoId The todo Id.
 * @returns {Todo} A todo item.
 */
module.exports = async (userId, todoId) => {
  const todo = await Todo.findOne({
    where: {
      createdBy: userId,
      id: todoId
    },
    include: {
      model: Task,
      as: 'subTasks'
    }
  });

  if (!todo) {
    throw new APIError({ message: 'No todo with Id found', isPublic: true, status: 404 });
  }

  return todo;
};
