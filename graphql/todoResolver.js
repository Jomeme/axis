const TodoQuery = require("./types/todo");

module.exports = async ({id}, context) => {

  const user = await context();

  return new TodoQuery(id, user);
};
