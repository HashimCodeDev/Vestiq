import express from "express";
import {
	getUserProfile,
	updateUserProfile,
	deleteUserAccount,
} from "../controllers/userController.js";

import { authenticateToken, getUser } from "../middleware/auth.js";
import { validateProfileUpdate } from "../middleware/validation.js";

const router = express.Router();

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

export default router;
