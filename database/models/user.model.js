const { Model, DataTypes } = require("sequelize");
const sequelize = require('../config/db.config');
const bcrypt = require('bcrypt');

class User extends Model {

  async isPasswordValid(password) {
    return await bcrypt.compare(password, this.password);
  }
}

User.init({
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, { 
  sequelize, 
  modelName: 'User', 
  tableName: 'Users' 
});

User.beforeCreate(function (instance, options) {
  if (!instance.changed('password')) return;
  return new Promise((resolve, reject) => {
    bcrypt.hash(instance.get('password'), 10, (err, hash) => {
      if (err) reject(err);
      resolve(hash);
    });
  }).then((hash) => {
    instance.password = hash;
  })
});

module.exports = User;