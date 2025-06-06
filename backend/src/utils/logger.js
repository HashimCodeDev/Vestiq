import winston from "winston";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Define log format
const logFormat = winston.format.combine(
	winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
	winston.format.errors({ stack: true }),
	winston.format.json()
);

// Create logger instance
const logger = winston.createLogger({
	level: process.env.LOG_LEVEL || "info",
	format: logFormat,
	defaultMeta: { service: "outfitly-api" },
	transports: [
		// Write all logs to console
		new winston.transports.Console({
			format: winston.format.combine(
				winston.format.colorize(),
				winston.format.simple()
			),
		}),

		// Write error logs to file
		new winston.transports.File({
			filename: path.join(__dirname, "../../logs/error.log"),
			level: "error",
		}),

		// Write all logs to file
		new winston.transports.File({
			filename: path.join(__dirname, "../../logs/combined.log"),
		}),
	],
});

// If we're not in production, log to console with colors
if (process.env.NODE_ENV !== "production") {
	logger.add(
		new winston.transports.Console({
			format: winston.format.combine(
				winston.format.colorize(),
				winston.format.simple()
			),
		})
	);
}

export default logger;
