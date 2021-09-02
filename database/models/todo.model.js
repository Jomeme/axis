const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/db.config");
const Task = require("./subtask.model");

class Todo extends Model {

}

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
        msg: 'Unable to get picture URL.'
      }
    }
  },
  createdBy: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'No user associated with todo.'
      }
    }
  }
}, {
  sequelize,
  modelName: 'Todo',
  tableName: 'Todos'
});

Todo.associations = (model) => {
  Todo.hasMany(model.Task, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  });
}

module.exports = Todo;