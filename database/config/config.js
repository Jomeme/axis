require('dotenv').config();

module.exports = {
  development: {
    url: process.env.DEV_DATABASE_URL,
    dialect: 'postgres',
    port: 5434
  },
  test: {
    url: process.env.TEST_DATABASE_URL,
    dialect: 'postgres',
    port: 5433,
  },
  production: {
    url: process.env.DATABASE_URL,
    dialect: 'postgres',
    port: 5432,
  }
}