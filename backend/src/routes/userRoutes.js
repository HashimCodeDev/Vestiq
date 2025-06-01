const express = require("express");
const router = express.Router();
const {
	getUserProfile,
	updateUserProfile,
	deleteUserAccount,
} = require("../controllers/userController.js");

const { authenticateToken, getUser } = require("../middleware/auth");
const { validateProfileUpdate } = require("../middleware/validation");

/**
 * @route   GET /api/users/profile
 * @desc    Get user profile
 * @access  Private
 */
router.get("/profile", authenticateToken, getUser, getUserProfile);

/**
 * @route   PUT /api/users/profile
 * @desc    Update user profile
 * @access  Private
 */
router.put(
	"/profile",
	authenticateToken,
	getUser,
	validateProfileUpdate,
	updateUserProfile
);

/**
 * @route   DELETE /api/users/profile
 * @desc    Delete user account
 * @access  Private
 */
router.delete("/profile", authenticateToken, getUser, deleteUserAccount);

module.exports = router;
