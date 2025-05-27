const mongoose = require("mongoose");

const connectDB = async () => {
	try {
		const mongoURI =
			process.env.NODE_ENV === "production" ?
				process.env.MONGODB_URI_PROD
			:	process.env.MONGODB_URI;

		const options = {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			maxPoolSize: 10,
			serverSelectionTimeoutMS: 5000,
			socketTimeoutMS: 45000,
		};

		const conn = await mongoose.connect(mongoURI, options);
		console.log(`MongoDB Connected: ${conn.connection.host}`);

		// Handle connection events
		mongoose.connection.on("error", (err) => {
			console.error("MongoDB connection error:", err);
		});

		mongoose.connection.on("disconnected", () => {
			console.log("MongoDB disconnected");
		});
	} catch (error) {
		console.error("Database connection failed:", error.message);
		process.exit(1);
	}
};

module.exports = connectDB;
