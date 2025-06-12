import app from "./app.js";
import connectDB from "./config/database.js";

const PORT = process.env.PORT || 5000;
let server;

const startServer = async () => {
	try {
		// Connect to MongoDB
		await connectDB();

		// Start Express server
		server = app.listen(PORT, () => {
			console.log(`
🚀 OutFitly Backend Server Running!
📍 Environment: ${process.env.NODE_ENV || "development"}
🌐 Port: ${PORT}
🕐 Started at: ${new Date().toISOString()}
      `);
		});
	} catch (error) {
		console.error("❌ Failed to start server:", error);
		process.exit(1);
	}
};

const gracefulShutdown = (signal, error) => {
	console.log(`\n📴 Received ${signal}. Initiating graceful shutdown...`);
	if (error) {
		console.error("🔥 Reason:", error);
	}

	if (server) {
		server.close(() => {
			console.log("✅ Server closed. Exiting process.");
			process.exit(0);
		});
	} else {
		process.exit(0);
	}
};

// Handle termination signals
process.on("SIGINT", () => gracefulShutdown("SIGINT")); // Ctrl+C
process.on("SIGTERM", () => gracefulShutdown("SIGTERM")); // kill or system stop
process.on("uncaughtException", (err) =>
	gracefulShutdown("uncaughtException", err)
);
process.on("unhandledRejection", (err) =>
	gracefulShutdown("unhandledRejection", err)
);

// Start the server
startServer();
