const mongoose = require("mongoose");
const winston = require("winston");

// Logger setup
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
	try {
		const mongoURI =
			process.env.NODE_ENV === "production" ?
				process.env.MONGODB_URI_PROD
			:	process.env.MONGODB_URI;

		const options = {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			maxPoolSize: 20,
			serverSelectionTimeoutMS: 20000,
			socketTimeoutMS: 45000,
			connectTimeoutMS: 10000,
			autoReconnect: true,
		};

		await mongoose.connect(mongoURI, options);
		logger.info(`MongoDB Connected: ${mongoose.connection.host}`);
	} catch (error) {
		logger.error(`Initial DB connection failed: ${error.message}`);
		process.exit(1); // Exit with failure
	}

	// Additional connection event handling
	mongoose.connection.on("error", (err) => {
		logger.error(`MongoDB error: ${err}`);
	});

	mongoose.connection.on("disconnected", () => {
		logger.warn("MongoDB disconnected. Trying to reconnect...");
	});

	mongoose.connection.on("reconnected", () => {
		logger.info("MongoDB reconnected successfully");
	});

	mongoose.connection.on("connected", () => {
		logger.info("MongoDB connected");
	});
};

module.exports = connectDB;
