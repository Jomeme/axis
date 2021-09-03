const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/db.config");

class Todo extends Model {}

Todo.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Please provide a name for the todo'
      },
      len: {
        args: [8, 15],
        msg: 'Todo name must have character length between 8 and 15'
      }
    }
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
      isDate: {
        msg: 'Please provide a valid date.'
      },
      notNull: {
        msg: 'Please provide a date for the todo'
      }
    }
  },
  picture: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Please provide a picture URL.'
      },
      notEmpty: {
        msg: 'Please provide a picture URL.'
      },
      isUrl: {
        msg: 'Please provide a valid picture URL.'
      }
    }
  },
  createdBy: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'No user found.'
      }
    }
  }
}, {
  sequelize,
  modelName: 'Todo',
  tableName: 'Todos'
});

class Task extends Model {}

Task.init({
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, {
  sequelize,
  modelName: 'Task',
  tableName: 'Tasks'
});

Todo.Task = Todo.hasMany(Task, {
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
  foreignKey: 'todoId',
  as: 'subTasks'
});

Task.Todo = Task.belongsTo(Todo, {
  foreignKey: {
    name: 'todoId',
    allowNull: false
  }
});

module.exports = { Todo, Task };
