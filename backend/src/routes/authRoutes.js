const express = require("express");
const router = express.Router();
const {
	register,
	getProfile,
	updateProfile,
} = require("../controllers/authController");
const { verifyFirebaseToken, getUser } = require("../middleware/auth");
const {
	validateRegistration,
	validateProfileUpdate,
} = require("../middleware/validation");
const { authLimiter } = require("../middleware/rateLimiter");

// @route   POST /api/auth/register
// @desc    Register new user
// @access  Public
router.post("/register", authLimiter, validateRegistration, register);

// @route   GET /api/auth/profile
// @desc    Get user profile
// @access  Private
router.get("/profile", verifyFirebaseToken, getUser, getProfile);

// @route   PUT /api/auth/profile
// @desc    Update user profile
// @access  Private
router.put(
	"/profile",
	verifyFirebaseToken,
	getUser,
	validateProfileUpdate,
	updateProfile
);

module.exports = router;
