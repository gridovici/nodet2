const appRoot = require('app-root-path');

const { createLogger, format, transports } = require('winston');
const fs = require('fs');
const path = require('path');

// const env = process.env.NODE_ENV || 'development';
const logDir = `${appRoot}/logs`;
const filename = path.join(logDir, 'results.log');
const filenameError = path.join(logDir, 'error.log');

const options = {
  file: {
    name: 'info-file',
    //   // change level if in dev environment versus production
    //   level: env === 'development' ? 'debug' : 'info',
    level: 'info',
    filename,
    format: format.combine(
      format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss'
      }),
      format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
    ),
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false
  },
  fileError: {
    name: 'error-file',
    level: 'error',
    filename: filenameError,
    format: format.combine(
      format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss'
      }),
      format.printf(info => `Error: ${info}`)
    ),
    handleExceptions: true,
    json: true,
    maxsize: 5242880,
    maxFiles: 5,
    colorize: false
  },
  console: {
    level: 'debug',
    format: format.combine(
      format.colorize(),
      format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss'
      }),
      format.printf(
        info => `${info.timestamp} ${info.level}: ${info.message}`
      )
    ),
    handleExceptions: true,
    json: false,
    colorize: true
  }
};

// Create the log directory if it does not exist
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

class Logger {
  constructor() {
    this.logger = createLogger({
      transports: [
        new transports.File(options.fileError),
        new transports.File(options.file),
        new transports.Console(options.console)
      ],
      exitOnError: false // do not exit on handled exceptions
    });
    const self = this;
    this.logger.stream = {
      // eslint-disable-next-line no-unused-vars
      write(message, encoding) {
        self.logger.info(message);
      }
    };
  }

  getLogger() {
    return this.logger;
  }

  logInfo(message) {
    this.logger.info(message);
  }

  logError(error) {
    this.logger.error(error);
  }
}

module.exports = new Logger();
