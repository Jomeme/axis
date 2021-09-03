require('dotenv').config();

module.exports = {
  development: {
    url: process.env.DEV_DATABASE_URL,
    dialect: 'postgres',
    port: 5432
  },
  test: {
    url: process.env.TEST_DATABASE_URL,
    dialect: 'postgres',
    port: 5432,
  },
  production: {
    url: process.env.DATABASE_URL,
    dialect: 'postgres',
    port: 5432,
  }
}