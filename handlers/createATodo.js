const { Todo } = require("../database/models/todo.model");

module.exports = async (data) => {
  return await Todo.create(data);
};
