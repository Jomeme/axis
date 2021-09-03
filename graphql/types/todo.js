const { Todo, Task } = require("../../database/models/todo.model");
const APIError = require("../../utils/APIError");

class TodoQuery {
  constructor(id, user) {
    this.id = id;
    this.user = user;
  }

  async allTodos() {
    try {
      const todos = await Todo.findAll({
        where: {
          createdBy: this.user.id
        },
        include: {
          model: Task,
          as: 'subTasks'
        }
      });

      return todos;
    } catch (error) {
      throw new APIError({ message: error.message, isPublic: true })
    }
  }

  async getTodo({ id }) {
    const todo = await Todo.findOne({
      where: {
        createdBy: this.user.id,
        id
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
  }

  async getTodoName({ id }) {
    const todo = await Todo.findOne({
      where: {
        createdBy: this.user.id,
        id
      },
      include: {
        model: Task,
        as: 'subTasks'
      }
    });

    if (!todo) {
      throw new APIError({ message: 'No todo with Id found', isPublic: true, status: 404 });
    }
    
    return todo.name;
  }

  async getTodoDate({ id }) {
    const todo = await Todo.findOne({
      where: {
        createdBy: this.user.id,
        id
      },
      include: {
        model: Task,
        as: 'subTasks'
      }
    });

    if (!todo) {
      throw new APIError({ message: 'No todo with Id found', isPublic: true, status: 404 });
    }
    
    return todo.date;
  }

  async getTodoPicture({ id }) {
    const todo = await Todo.findOne({
      where: {
        createdBy: this.user.id,
        id
      },
      include: {
        model: Task,
        as: 'subTasks'
      }
    });

    if (!todo) {
      throw new APIError({ message: 'No todo with Id found', isPublic: true, status: 404 });
    }
    
    return todo.picture;
  }

  async getTodoSubTasks({ id }) {
    const todo = await Todo.findOne({
      where: {
        createdBy: this.user.id,
        id
      },
      include: {
        model: Task,
        as: 'subTasks'
      }
    });

    if (!todo) {
      throw new APIError({ message: 'No todo with Id found', isPublic: true, status: 404 });
    }
    
    return todo.subTasks;
  }
}

module.exports = TodoQuery;