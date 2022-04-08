const { createLogger, format, transports } = require('winston');
const config = require('../config');

const { combine, timestamp, printf } = format;

const devLogFormat = printf(
  // eslint-disable-next-line
  ({ level, message, timestamp, stack }) =>
    `${timestamp} ${level}: ${stack || message}`
);

// Logger config for dev environment
const configureDevLogger = () =>
  createLogger({
    level: 'debug',
    format: combine(
      format.colorize(),
      timestamp({ format: 'HH:MM:SS' }),
      format.errors({ stack: true }),
      devLogFormat
    ),
    transports: [new transports.Console()]
  });

// Logger config for production environment (Needs to change)
const configureProdLogger = () =>
  createLogger({
    level: 'debug',
    format: combine(
      format.colorize(),
      timestamp({ format: 'HH:MM:SS' }),
      format.errors({ stack: true }),
      devLogFormat
    ),
    transports: [new transports.Console()]
  });

let logger = null;
if (config.mode === 'dev') {
  logger = configureDevLogger();
} else {
  logger = configureProdLogger();
}

module.exports = logger;
