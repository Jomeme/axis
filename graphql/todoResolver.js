const TodoQuery = require("./types/todo");

module.exports = async ({id}, context) => {

  const { user } = context();
  return new TodoQuery(id);
};
