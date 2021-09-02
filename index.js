const dotenv = require('dotenv');
dotenv.config();

const http = require('http');
const app = require('./app');
const { logger } = require('./config/logger.config');
const sequelize = require('./database/config/db.config');

const PORT = process.env.PORT || 8085;

const server = http.createServer(app);

server.listen(PORT, async () => {
  logger.info(`Listening on port ${PORT}`);
  try {
    await sequelize.sync();
    logger.info('Database created.')
  } catch (error) {
    logger.error(error);
  }
});

module.exports = server;