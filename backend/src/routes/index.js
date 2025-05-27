const express = require("express");
const router = express.Router();

// Health check endpoint
router.get("/health", (req, res) => {
	res.json({
		success: true,
		message: "OutFitly API is running",
		timestamp: new Date().toISOString(),
		version: "1.0.0",
	});
});

// API status endpoint
router.get("/status", (req, res) => {
	res.json({
		success: true,
		data: {
			server: "online",
			database: "connected",
			ai_service: "available",
			uptime: process.uptime(),
		},
	});
});

module.exports = router;
