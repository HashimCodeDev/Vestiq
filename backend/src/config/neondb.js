import { Sequelize } from 'sequelize';
import winston from 'winston';
import dotenv from 'dotenv';
dotenv.config();


// Setup winston logger
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp(),
    winston.format.printf(
      ({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`
    )
  ),
  transports: [new winston.transports.Console()],
});

const sequelize = new Sequelize(
  process.env.DATABASE_URL,
  {
    dialect: 'postgres',
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
    logging: (msg) => logger.debug(msg),
    pool: {
      max: 20,
      min: 2,
      acquire: 30000,
      idle: 10000,
    },
    retry: {
      max: 3,
      delay: 1000,
    },
    define: {
      timestamps: true,
      underscored: true,
    },
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    logger.info(`PostgreSQL connected: ${sequelize.config.host}`);
  } catch (error) {
    logger.error(`PostgreSQL initial connection error: ${error.message}`);
    process.exit(1);
  }

 

  // Sync models (optional - use migrations in production)
  try {
    await sequelize.sync({ alter: false });
    logger.info('Database schema synchronized');
  } catch (error) {
    logger.error(`Database sync error: ${error.message}`);
  }
};

export { sequelize, connectDB };
export default connectDB;