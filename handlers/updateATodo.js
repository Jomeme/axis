const { Todo } = require("../database/models/todo.model");

/**
 * 
 * @param {Todo} todo A todo model
 * @param {Object} data The update data
 * @returns {Number} Number of deleted items.
 */
module.exports = async (todo, data) => {
  return await todo.update(data);
};
