const { Todo, Task } = require("../../database/models/todo.model");
const getAllTodo = require("../../handlers/getAllTodo");
const getATodo = require("../../handlers/getATodo");
const APIError = require("../../utils/APIError");

class TodoQuery {
  constructor(id, user) {
    this.id = id;
    this.user = user;
  }

  async allTodos() {
    try {
      const todos = await getAllTodo(this.user.id);

      return todos;
    } catch (error) {
      throw new APIError({ message: error.message, isPublic: true })
    }
  }

  async getTodo({ id }) {
    const todo = await getATodo(this.user.id, id);

    return todo;
  }

  async getTodoName({ id }) {
    const todo = await getATodo(this.user.id, id);
    return todo.name;
  }

  async getTodoDate({ id }) {
    const todo = await getATodo(this.user.id, id);
    
    return todo.date;
  }

  async getTodoPicture({ id }) {
    const todo = await getATodo(this.user.id, id);
    
    return todo.picture;
  }

  async getTodoSubTasks({ id }) {
    const todo = await getATodo(this.user.id, id);
    
    return todo.subTasks;
  }
}

module.exports = TodoQuery;