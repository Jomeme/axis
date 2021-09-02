const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");
const Todo = require("./todo.model");

class Task extends Model {

}

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

Task.associations = (model) => {
  Task.belongsTo(model.Todo, {
    foreignKey: {
      name: 'todoId',
      allowNull: false
    }
  });
};

module.exports = Task;