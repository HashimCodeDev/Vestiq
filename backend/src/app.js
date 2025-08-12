import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";
dotenv.config();

// Import routes
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import outfitRoutes from "./routes/outfitsRoutes.js";
import wardrobeItemRoutes from "./routes/wardrobeItemRoutes.js";

// Import middleware
import errorHandler from "./middleware/errorHandler.js";
//import notFound from "./middleware/notFound.js";

const app = express();

// Trust proxy for accurate IP addresses
app.set("trust proxy", 1);

// Security middleware
app.use(
	helmet({
		crossOriginResourcePolicy: { policy: "cross-origin" },
	})
);

// CORS configuration for domains
const corsOptions = {
	
	origin: process.env.CLIENT_URL|| "http://localhost:3000",
	credentials: true,
	optionsSuccessStatus: 200,
};
//app.use(cors(corsOptions));
app.use(cors());

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
app.use("/api/user", userRoutes);
app.use("/api/outfits", outfitRoutes);
app.use("/api/wardrobe", wardrobeItemRoutes);
//app.use("/api/recommendations", recommendationRoutes);
//app.use("/api/regional", regionalRoutes);

// Error handling middleware
//app.use(notFound);
//app.use(errorHandler);

export default app;
