const { auth } = require("../config/firebase");
const User = require("../models/User");

const authenticate = async (req, res, next) => {
	try {
		const authHeader = req.headers.authorization;

		if (!authHeader || !authHeader.startsWith("Bearer ")) {
			return res.status(401).json({
				success: false,
				message: "Access denied. No token provided.",
			});
		}

		const token = authHeader.split(" ")[1];

		// Verify Firebase token
		const decodedToken = await auth.verifyIdToken(token);

		// Find user in our database
		const user = await User.findOne({ firebaseUid: decodedToken.uid });

		if (!user) {
			return res.status(401).json({
				success: false,
				message: "User not found. Please register first.",
			});
		}

		if (!user.isActive) {
			return res.status(401).json({
				success: false,
				message: "Account has been deactivated.",
			});
		}

		// Add user info to request
		req.user = {
			id: user._id,
			firebaseUid: user.firebaseUid,
			email: user.email,
			displayName: user.displayName,
		};

		next();
	} catch (error) {
		console.error("Authentication error:", error);

		if (error.code === "auth/id-token-expired") {
			return res.status(401).json({
				success: false,
				message: "Token expired. Please login again.",
				code: "TOKEN_EXPIRED",
			});
		}

		return res.status(401).json({
			success: false,
			message: "Invalid token.",
		});
	}
};

// Optional authentication (for routes that work with or without auth)
const optionalAuth = async (req, res, next) => {
	try {
		const authHeader = req.headers.authorization;

		if (!authHeader || !authHeader.startsWith("Bearer ")) {
			req.user = null;
			return next();
		}

		const token = authHeader.split(" ")[1];
		const decodedToken = await auth.verifyIdToken(token);
		const user = await User.findOne({ firebaseUid: decodedToken.uid });

		req.user =
			user ?
				{
					id: user._id,
					firebaseUid: user.firebaseUid,
					email: user.email,
					displayName: user.displayName,
				}
			:	null;

		next();
	} catch (error) {
		req.user = null;
		next();
	}
};

const verifyFirebaseToken = async (req, res, next) => {
	if (!req.user) {
		return res.status(401).json({
			success: false,
			message: "Unauthorized access. Please login.",
		});
	}

	next();
};

const getUser = async (req, res, next) => {
	if (!req.user) {
		return res.status(401).json({
			success: false,
			message: "Unauthorized access. Please login.",
		});
	}

	try {
		const user = await User.findById(req.user.id).select("-password -__v");
		if (!user) {
			return res.status(404).json({
				success: false,
				message: "User not found.",
			});
		}

		req.user = user;
		next();
	} catch (error) {
		console.error("Get user error:", error);
		return res.status(500).json({
			success: false,
			message: "Internal server error.",
		});
	}
};

module.exports = { authenticate, optionalAuth, verifyFirebaseToken, getUser };
