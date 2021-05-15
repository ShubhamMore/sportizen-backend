const { createLogger, transports, format } = require('winston');
const path = require('path');

const logger = createLogger({
  transports: [
    new transports.File({
      filename: path.join(__dirname, '../../log', 'logger.log'),
      level: 'error',
      format: format.combine(format.timestamp(), format.json()),
    }),
  ],
});

module.exports = logger;
