const { Todo } = require("../database/models/todo.model");

/**
 * 
 * @param {Todo} todo A todo model
 * @returns {Number} Number of deleted items.
 */
module.exports = async (todo) => {
  return await todo.destroy();
};
