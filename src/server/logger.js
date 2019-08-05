const appRoot = require('app-root-path');

const { createLogger, format, transports } = require('winston');
const fs = require('fs');
const path = require('path');

const env = process.env.NODE_ENV || 'development';
// const logDir = 'log';
const logDir = `${appRoot}/logs`;
const filename = path.join(logDir, 'results.log');

const options = {
  file: {
    level: 'info',
    // filename: `${logDir}/app.log`,
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
  console: {
    level: 'debug',
    format: format.combine(
      format.colorize(),
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

// const logger = createLogger({
//   // change level if in dev environment versus production
//   level: env === 'development' ? 'debug' : 'info',
//   format: format.combine(
//     format.timestamp({
//       format: 'YYYY-MM-DD HH:mm:ss'
//     }),
//     format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
//   ),
//   transports: [
//     new transports.Console({
//       level: 'info',
//       format: format.combine(
//         format.colorize(),
//         format.printf(
//           info => `${info.timestamp} ${info.level}: ${info.message}`
//         )
//       )
//     }),
//     new transports.File({ filename })
//   ]
// });

class Logger {
  constructor() {
    this.logger = createLogger({
      transports: [
        new transports.File(options.file),
        new transports.Console(options.console)
      ],
      exitOnError: false // do not exit on handled exceptions
    });
    const self = this;
    this.logger.stream = {
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
