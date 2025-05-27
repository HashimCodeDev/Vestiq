const rateLimit = require("express-rate-limit");

// General API rate limiting
const apiLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per windowMs
	message: {
		success: false,
		message: "Too many requests, please try again later.",
	},
	standardHeaders: true,
	legacyHeaders: false,
});

// Strict rate limiting for outfit generation
const outfitGenerationLimiter = rateLimit({
	windowMs: 60 * 60 * 1000, // 1 hour
	max: 10, // Limit each IP to 10 outfit generations per hour
	message: {
		success: false,
		message: "Outfit generation limit reached. Please try again in an hour.",
	},
});

// Authentication endpoints rate limiting
const authLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 5, // Limit each IP to 5 auth requests per windowMs
	message: {
		success: false,
		message: "Too many authentication attempts, please try again later.",
	},
});

module.exports = {
	apiLimiter,
	outfitGenerationLimiter,
	authLimiter,
};
