import app from "./app.js";
import connectDB from "./config/database.js";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
	try {
		// Connect to MongoDB
		await connectDB();

		// Start server
		const server = app.listen(PORT, () => {
			console.log(`
🚀 OutFitly Backend Server Running!
📍 Environment: ${process.env.NODE_ENV}
🌐 Port: ${PORT}
🕐 Started at: ${new Date().toISOString()}
      `);
		});

		// Graceful shutdown
		process.on("SIGTERM", () => {
			console.log("SIGTERM received, shutting down gracefully");
			server.close(() => {
				console.log("Process terminated");
			});
		});
	} catch (error) {
		console.error("Failed to start server:", error);
		process.exit(1);
	}
};

startServer();
