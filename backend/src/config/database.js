import mongoose from "mongoose";
import winston from "winston";

// Setup winston logger
const logger = winston.createLogger({
	level: "info",
	format: winston.format.combine(
		winston.format.colorize(),
		winston.format.timestamp(),
		winston.format.printf(
			({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`
		)
	),
	transports: [new winston.transports.Console()],
});

const connectDB = async () => {
	const mongoURI =
		process.env.NODE_ENV === "production" ?
			process.env.MONGODB_URI_PROD
		:	process.env.MONGODB_URI;

	try {
		await mongoose.connect(mongoURI, {
			// Only include options that are actually supported in v7+
			maxPoolSize: 20,
			serverSelectionTimeoutMS: 5000,
			socketTimeoutMS: 45000,
			connectTimeoutMS: 10000,
		});

		logger.info(`MongoDB connected: ${mongoose.connection.host}`);
	} catch (error) {
		logger.error(`MongoDB initial connection error: ${error.message}`);
		process.exit(1);
	}

	// Connection events
	mongoose.connection.on("error", (err) => {
		logger.error(`MongoDB error: ${err}`);
	});

	mongoose.connection.on("disconnected", () => {
		logger.warn("MongoDB disconnected. Attempting reconnection...");
	});

	mongoose.connection.on("reconnected", () => {
		logger.info("MongoDB reconnected");
	});
};

export default connectDB;
