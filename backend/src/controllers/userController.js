import User from "../models/User.js";
import logger from "../utils/logger.js";

const getUserProfile = async (req, res) => {
	try {
		const result = await User.findOne({ userId: req.user.userId });
		const user = {
			userName: result.displayName,
			email: result.email,
			profilePicture: result.profilePicture,
			preferences: result.preferences,
		};
		res.json({
			success: true,
			user: user,
		});
	} catch (error) {
		logger.error("Get user profile error:", error);
		res.status(500).json({
			success: false,
			message: "Failed to get user profile",
		});
	}
};

const getUserName = async (req, res) => {
	try {
		const user = await User.findOne({ userId: req.user.userId }).select(
			"displayName"
		);
		if (!user) {
			return res.status(404).json({
				success: false,
				message: "User not found",
			});
		}

		const userName = user.displayName || "User";

		res.json({
			success: true,
			userName: userName,
		});
	} catch {
		logger.error("Get user name error:", error);
		res.status(500).json({
			success: false,
			message: "Failed to get user name",
		});
	}
};

const updateUserProfile = async (req, res) => {
	try {
		const { displayName, email, preferences } = req.body;

		const updatedUser = await User.findByIdAndUpdate(
			req.user._id,
			{ displayName, email, preferences },
			{ new: true, runValidators: true }
		);

		res.json({
			success: true,
			data: updatedUser,
		});
	} catch (error) {
		logger.error("Update user profile error:", error);
		res.status(500).json({
			success: false,
			message: "Failed to update user profile",
		});
	}
};

const deleteUserAccount = async (req, res) => {
	try {
		await User.findByIdAndDelete(req.user._id);

		res.json({
			success: true,
			message: "User account deleted successfully",
		});
	} catch (error) {
		logger.error("Delete user account error:", error);
		res.status(500).json({
			success: false,
			message: "Failed to delete user account",
		});
	}
};

export { getUserProfile, getUserName, updateUserProfile, deleteUserAccount };
