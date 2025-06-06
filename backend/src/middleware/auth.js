// middleware/auth.js
import { auth } from "../config/firebase-admin.js";

const authenticateToken = async (req, res, next) => {
	try {
		const authHeader = req.headers.authorization;
		const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN

		if (!token) {
			return res.status(401).json({
				error: "Access token required",
				code: "TOKEN_REQUIRED",
			});
		}

		// Verify the ID token
		const decodedToken = await auth.verifyIdToken(token);

		// Add user info to request object
		req.user = {
			uid: decodedToken.uid,
			email: decodedToken.email,
			name: decodedToken.name,
			picture: decodedToken.picture,
			email_verified: decodedToken.email_verified,
			firebase: decodedToken,
		};

		next();
	} catch (error) {
		console.error("Token verification error:", error);

		if (error.code === "auth/id-token-expired") {
			return res.status(401).json({
				error: "Token expired",
				code: "TOKEN_EXPIRED",
			});
		}

		if (error.code === "auth/id-token-revoked") {
			return res.status(401).json({
				error: "Token revoked",
				code: "TOKEN_REVOKED",
			});
		}

		return res.status(401).json({
			error: "Invalid token",
			code: "INVALID_TOKEN",
		});
	}
};

// Optional middleware - doesn't fail if no token provided
const optionalAuth = async (req, res, next) => {
	try {
		const authHeader = req.headers.authorization;
		const token = authHeader && authHeader.split(" ")[1];

		if (token) {
			const decodedToken = await auth.verifyIdToken(token);
			req.user = {
				uid: decodedToken.uid,
				email: decodedToken.email,
				name: decodedToken.name,
				picture: decodedToken.picture,
				email_verified: decodedToken.email_verified,
				firebase: decodedToken,
			};
		}

		next();
	} catch (error) {
		// Continue without user info if token is invalid
		next();
	}
};

const getUser = (req, res, next) => {
	if (!req.user) {
		return res.status(401).json({
			error: "User not authenticated",
			code: "USER_NOT_AUTHENTICATED",
		});
	}
	next();
};

export { authenticateToken, optionalAuth, getUser };
