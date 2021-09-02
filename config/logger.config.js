const winston = require('winston');

const { format, transports, loggers } = winston;
const {
  combine, label, timestamp, printf, simple, colorize
} = format;

const categories = {
  default: 'DEFAULT',
  auth: 'AUTH',
  user: 'USER'
};

function createLoggerConfig (category) {
  const isProduction = process.env.NODE_ENV === 'production';
  return isProduction
    ? {
        level: 'info',
        transports: [
          new transports.Console()
        ],
        format: simple()
      }
    : {
        level: 'info',
        transports: [
          new transports.Console()
        ],
        format: combine(
          label({ label: category }),
          colorize(),
          timestamp(),
          printf((info) => `${info.timestamp} - ${info.label}:[${info.level}]: ${info.message}`)
        )
      };
}

loggers.add(categories.default, createLoggerConfig(categories.default));
loggers.add(categories.auth, createLoggerConfig(categories.auth));
loggers.add(categories.user, createLoggerConfig(categories.user));

const logger = loggers.get(categories.default);
const authLogger = loggers.get(categories.auth);
const userLogger = loggers.get(categories.user);

module.exports = {
  logger, authLogger, userLogger
};
