const { Task } = require("../database/models/todo.model");

module.exports = async (data) => {
  return await Task.create(data);
};
