const User = require("../models/User");
const logger = require("../utils/logger");

const register = async (req, res) => {
	try {
		const { email, displayName, firebaseUid } = req.body;

		// Check if user already exists
		const existingUser = await User.findOne({
			$or: [{ email }, { firebaseUid }],
		});

		if (existingUser) {
			return res.status(400).json({
				success: false,
				message: "User already exists",
			});
		}

		// Create new user
		const user = new User({
			email,
			displayName,
			firebaseUid,
			registrationDate: new Date(),
		});

		await user.save();

		res.status(201).json({
			success: true,
			message: "User registered successfully",
			data: {
				id: user._id,
				email: user.email,
				displayName: user.displayName,
			},
		});
	} catch (error) {
		logger.error("Registration error:", error);
		res.status(500).json({
			success: false,
			message: "Registration failed",
		});
	}
};

const getProfile = async (req, res) => {
	try {
		res.json({
			success: true,
			data: {
				id: req.user._id,
				email: req.user.email,
				displayName: req.user.displayName,
				preferences: req.user.preferences,
				avatar: req.user.avatar,
				registrationDate: req.user.registrationDate,
			},
		});
	} catch (error) {
		logger.error("Get profile error:", error);
		res.status(500).json({
			success: false,
			message: "Failed to get profile",
		});
	}
};

const updateProfile = async (req, res) => {
	try {
		const updates = req.body;
		const user = await User.findByIdAndUpdate(
			req.user._id,
			{ $set: updates },
			{ new: true, runValidators: true }
		);

		res.json({
			success: true,
			message: "Profile updated successfully",
			data: user,
		});
	} catch (error) {
		logger.error("Update profile error:", error);
		res.status(500).json({
			success: false,
			message: "Failed to update profile",
		});
	}
};

module.exports = {
	register,
	getProfile,
	updateProfile,
};
