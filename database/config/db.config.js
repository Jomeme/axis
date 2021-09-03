const { Sequelize } = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require('./config');

const sequelize = new Sequelize(config[env].url);

// const dropAllTables = async () => {
// };

module.exports = sequelize