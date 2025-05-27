const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
require("dotenv").config();

// Import routes
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const outfitRoutes = require("./routes/outfitsRoutes");
//const recommendationRoutes = require("./routes/recommendations");
//const regionalRoutes = require("./routes/regional");

// Import middleware
const errorHandler = require("./middleware/errorHandler");
//const notFound = require("./middleware/notFound");

const app = express();

// Trust proxy for accurate IP addresses
app.set("trust proxy", 1);

// Security middleware
app.use(
	helmet({
		crossOriginResourcePolicy: { policy: "cross-origin" },
	})
);

// CORS configuration for Indian domains
const corsOptions = {
	origin: [
		"http://localhost:3000",
		"https://outfitly.vercel.app",
		"https://outfitly.in",
		"https://www.outfitly.in",
	],
	credentials: true,
	optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Rate limiting
const limiter = rateLimit({
	windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
	max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
	message: {
		error: "Too many requests from this IP, please try again later.",
		retryAfter: "15 minutes",
	},
	standardHeaders: true,
	legacyHeaders: false,
});
app.use("/api/", limiter);

// Logging
if (process.env.NODE_ENV === "development") {
	app.use(morgan("dev"));
} else {
	app.use(morgan("combined"));
}

// Body parsing middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Static files
app.use("/uploads", express.static("uploads"));

// Health check route
app.get("/health", (req, res) => {
	res.status(200).json({
		status: "OK",
		timestamp: new Date().toISOString(),
		environment: process.env.NODE_ENV,
		version: "1.0.0",
	});
});

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/outfits", outfitRoutes);
//app.use("/api/recommendations", recommendationRoutes);
//app.use("/api/regional", regionalRoutes);

// Error handling middleware
//app.use(notFound);
//app.use(errorHandler);

module.exports = app;
