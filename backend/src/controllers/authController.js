import { auth } from "../config/firebase-admin.js";
import User from "../models/User.js";
import logger from "../utils/logger.js";

const verifyUser = async (req, res) => {
	try {
		const { uid, email, displayName, photoURL } = req.body;

		const userData = {
			email,
			displayName: displayName || null,
			photoURL: photoURL || null,
			lastLogin: new Date(),
			updatedAt: new Date(),
		};

		let user = await User.findOne({ firebaseUid: uid });

		if (!user) {
			user = await User.create({
				firebaseUid: uid,
				...userData,
			});

			return res.status(200).json({
				message: "User verified successfully",
				user,
				isNewUser: true,
			});
		} else {
			await User.updateOne({ firebaseUid: uid }, { $set: userData });
			const updatedUser = await User.findOne({ firebaseUid: uid });

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

const getProfile = async (req, res) => {
	try {
		const user = await User.findOne({ firebaseUid: req.user.uid });
		res.json(user);
	} catch (error) {
		logger.error("Error fetching user profile:", error);
		res.status(500).json({
			error: "Failed to fetch user profile",
			details: error.message,
		});
	}
};

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

export {
	verifyUser,
	getProfile,
	updateProfile,
	deleteAccount,
};
