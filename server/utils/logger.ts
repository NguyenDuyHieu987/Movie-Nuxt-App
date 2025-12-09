import winston from 'winston';
import path from 'path';
import fs from 'fs';

const logDir = 'logs';

// 🔹 1. Tạo folder nếu chưa có
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

// 🔹 2. Tạo file rỗng nếu chưa có
const ensureFile = (filePath: string) => {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, '');
  }
};

const errorLogPath = path.join(logDir, 'error.log');
const requestLogPath = path.join(logDir, 'requests.log');

ensureFile(errorLogPath);
ensureFile(requestLogPath);

// 🔹 3. Khởi tạo Winston logger
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.printf(
      (info) =>
        `${info.timestamp} [${info.level.toUpperCase()}] ${info.message}`
    )
  ),
  transports: [
    new winston.transports.File({
      filename: errorLogPath,
      level: 'error'
    }),
    new winston.transports.File({
      filename: requestLogPath,
      level: 'info'
    })
  ]
});

// 🔹 4. Log ra console trong development
if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple()
    })
  );
}

export default logger;
