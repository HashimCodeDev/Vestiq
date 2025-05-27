const express = require("express");
const router = express.Router();
const {
	getUserProfile,
	updateUserProfile,
	deleteUserAccount,
} = require("../controllers/userController.js");

const { verifyFirebaseToken, getUser } = require("../middleware/auth");
const { validateProfileUpdate } = require("../middleware/validation");

/**
 * @route   GET /api/users/profile
 * @desc    Get user profile
 * @access  Private
 */
router.get("/profile", verifyFirebaseToken, getUser, getUserProfile);

/**
 * @route   PUT /api/users/profile
 * @desc    Update user profile
 * @access  Private
 */
router.put(
	"/profile",
	verifyFirebaseToken,
	getUser,
	validateProfileUpdate,
	updateUserProfile
);

/**
 * @route   DELETE /api/users/profile
 * @desc    Delete user account
 * @access  Private
 */
router.delete("/profile", verifyFirebaseToken, getUser, deleteUserAccount);

module.exports = router;
