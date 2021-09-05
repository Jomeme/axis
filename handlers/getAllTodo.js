const { Todo, Task } = require("../database/models/todo.model");

module.exports = async (userId) => {
  return await Todo.findAll({
    where: {
      createdBy: userId
    },
    include: {
      model: Task,
      as: 'subTasks'
    }
  });
};
