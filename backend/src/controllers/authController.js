import { auth } from "../config/firebase-admin.js";
import User from "../models/User.js";
import logger from "../utils/logger.js";

/**
 * Verify a user by either creating a new user document if the user doesn't exist
 * or updating an existing user document with the latest profile information.
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<void>}
 */
const verifyUser = async (req, res) => {
	try {
		const { userId, email, displayName, photoURL } = req.body;

		const userData = {
			email,
			displayName: displayName || null,
			photoURL: photoURL || null,
			lastLogin: new Date(),
			updatedAt: new Date(),
		};

		let user = await User.findOne({ userId });

		if (!user) {
			user = await User.create({
				userId,
				...userData,
			});

			return res.status(200).json({
				message: "User verified successfully",
				user,
				isNewUser: true,
			});
		} else {
			await User.updateOne({ userId }, { $set: userData });
			const updatedUser = await User.findOne({ userId });

			return res.status(200).json({
				message: "User verified successfully",
				user: updatedUser,
				isNewUser: false,
			});
		}
	} catch (error) {
		logger.error("Error verifying user:", error);
		res.status(500).json({
			error: "Failed to verify user",
			details: error.message,
		});
	}
};

/**
 * Retrieve and respond with the user's profile based on the userId from the request object.
 *
 * @param {Object} req - Express request object, with userId in req.user.userId
 * @param {Object} res - Express response object
 * @returns {Promise<void>} - Sends a JSON response containing the user profile or an error message
 */

const getProfile = async (req, res) => {
	try {
		const user = await User.findOne({ userId: req.user.userId });
		res.json(user);
	} catch (error) {
		logger.error("Error fetching user profile:", error);
		res.status(500).json({
			error: "Failed to fetch user profile",
			details: error.message,
		});
	}
};

/**
 * Updates the user's profile with new display name and/or photo URL.
 *
 * @param {Object} req - Express request object, with user data in req.user
 * @param {Object} res - Express response object
 * @returns {Promise<void>} - Sends a JSON response containing a success message or an error message
 */
const updateProfile = async (req, res) => {
	try {
		const { displayName, photoURL } = req.body;
		await User.updateOne(
			{ firebaseUid: req.user.uid },
			{ $set: { displayName, photoURL, updatedAt: new Date() } }
		);
		res.json({ message: "Profile updated successfully" });
	} catch (error) {
		logger.error("Error updating user profile:", error);
		res.status(500).json({
			error: "Failed to update profile",
			details: error.message,
		});
	}
};

/**
 * Deletes the user account from the database and from Firebase Auth.
 *
 * @param {Object} req - Express request object, with user data in req.user
 * @param {Object} res - Express response object
 * @returns {Promise<void>} - Sends a JSON response containing a success message or an error message
 */
const deleteAccount = async (req, res) => {
	try {
		await auth.deleteUser(req.user.uid);
		await User.deleteOne({ firebaseUid: req.user.uid });
		res.json({ message: "Account deleted successfully" });
	} catch (error) {
		logger.error("Error deleting user account:", error);
		res.status(500).json({
			error: "Failed to delete account",
			details: error.message,
		});
	}
};

export { verifyUser, getProfile, updateProfile, deleteAccount };
