import winston, { Logform } from 'winston';


// Define log format with trace context
const logFormat = winston.format.printf(({ level, message, timestamp, ...metadata }: Logform.TransformableInfo) => {
  return `${timestamp} [${level}] ${message} ${Object.keys(metadata).length ? JSON.stringify(metadata) : ''}`;
});

// Create logger
const logger = winston.createLogger({
  level:  process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.metadata({ fillExcept: [
      'message', 'level', 'timestamp'
    ] }),
    logFormat
  ),
  transports: [new winston.transports.Console(),]
});

export default logger; 